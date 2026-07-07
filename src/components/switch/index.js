import ZkSwitch from './src/switch.vue';
import './style.css';

ZkSwitch.install = (Vue) => {
  Vue.component(ZkSwitch.name, ZkSwitch);
};

export default ZkSwitch;
