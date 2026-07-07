import ZkButton from './src/button.vue';
import './style.css';

ZkButton.install = (Vue) => {
  Vue.component(ZkButton.name, ZkButton);
};

export default ZkButton;
