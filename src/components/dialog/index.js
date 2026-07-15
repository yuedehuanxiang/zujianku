import Vue from 'vue';
import ZkDialog from './src/dialog.vue';
import './style.css';

const initialDefaults = {
  title: '',
  message: '',
  width: 320,
  messageAlign: 'center',
  showCancelButton: false,
  showConfirmButton: true,
  cancelButtonText: '取消',
  confirmButtonText: '确认',
  cancelButtonColor: '',
  confirmButtonColor: '#1989fa',
  overlay: true,
  closeOnClickOverlay: false,
  closeOnPressEscape: true,
  lockScroll: true,
  beforeClose: null
};

let defaults = { ...initialDefaults };
const instances = new Set();

const resolveContainer = (getContainer) => {
  if (typeof document === 'undefined') return null;
  if (typeof getContainer === 'function') return getContainer();
  if (typeof getContainer === 'string') return document.querySelector(getContainer);
  if (getContainer && getContainer.nodeType === 1) return getContainer;
  return document.body;
};

const createDialog = (options = {}) => {
  if (typeof document === 'undefined') {
    return Promise.reject(new Error('[ZkDialog] 函数调用仅支持浏览器环境'));
  }

  const normalizedOptions = typeof options === 'string' ? { message: options } : options;
  const config = {
    ...defaults,
    ...normalizedOptions,
    value: true
  };
  const container = resolveContainer(config.getContainer);
  if (!container) {
    return Promise.reject(new Error('[ZkDialog] 未找到挂载容器'));
  }

  let settled = false;
  let resolvePromise;
  let rejectPromise;

  const vm = new Vue({
    data() {
      return { config };
    },
    render(h) {
      return h(ZkDialog, {
        props: this.config,
        on: {
          input: (value) => {
            this.config.value = value;
          },
          action: (action) => {
            if (settled) return;
            settled = true;
            if (action === 'confirm') resolvePromise(action);
            else rejectPromise(action);
          },
          closed: () => {
            instances.delete(controller);
            vm.$destroy();
            if (vm.$el && vm.$el.parentNode) vm.$el.parentNode.removeChild(vm.$el);
          }
        }
      });
    }
  });

  const promise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  const controller = {
    vm,
    promise,
    close(action = 'close') {
      if (!vm.config.value) return;
      if (!settled) {
        settled = true;
        rejectPromise(action);
      }
      vm.config.value = false;
    }
  };

  vm.$mount();
  container.appendChild(vm.$el);
  instances.add(controller);
  return promise;
};

export const Dialog = (options) => createDialog(options);

Dialog.alert = (options) =>
  createDialog({
    ...(typeof options === 'string' ? { message: options } : options),
    showCancelButton: false
  });

Dialog.confirm = (options) =>
  createDialog({
    ...(typeof options === 'string' ? { message: options } : options),
    showCancelButton: true
  });

Dialog.close = () => {
  Array.from(instances).forEach((instance) => instance.close());
};

Dialog.setDefaultOptions = (options = {}) => {
  defaults = { ...defaults, ...options };
};

Dialog.resetDefaultOptions = () => {
  defaults = { ...initialDefaults };
};

ZkDialog.install = (VueConstructor) => {
  VueConstructor.component(ZkDialog.name, ZkDialog);
  VueConstructor.prototype.$dialog = Dialog;
};

export default ZkDialog;
