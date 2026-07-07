import ZkButton from './components/button';
import ZkSwitch from './components/switch';

const components = [ZkButton, ZkSwitch];

const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;
  components.forEach((component) => {
    Vue.use(component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { ZkButton, ZkSwitch };

export default {
  install,
  version: '0.1.0'
};
