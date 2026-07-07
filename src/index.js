import ZkButton from './components/button';

const components = [ZkButton];

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

export { ZkButton };

export default {
  install,
  version: '0.1.0'
};
