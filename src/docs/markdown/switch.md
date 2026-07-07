# Switch 开关

## 介绍

开关用于在打开和关闭状态之间进行切换，常用于设置项、权限开关和状态启停。

## 引入

通过以下方式来全局注册组件，或只注册 Switch 组件。

```js
import Vue from 'vue';
import ZkUI, { ZkSwitch } from 'zujianku';
import 'zujianku/dist/style.css';

Vue.use(ZkUI);
// 或
Vue.use(ZkSwitch);
```

## 代码演示

### 基础用法

通过 `v-model` 绑定开关状态，默认 `true` 表示开启，`false` 表示关闭。

```vue
<template>
  <zk-switch v-model="checked" />
</template>

<script>
export default {
  data() {
    return {
      checked: true
    };
  }
};
</script>
```

### 禁用状态

设置 `disabled` 属性后，开关不可点击，也不会触发状态变化。

```vue
<zk-switch v-model="checked" disabled />
```

### 加载状态

设置 `loading` 属性后，开关会显示加载状态，并阻止用户切换。

```vue
<zk-switch v-model="checked" loading />
```

### 自定义颜色

通过 `active-color` 和 `inactive-color` 可以分别设置开启和关闭时的背景色。

```vue
<zk-switch
  v-model="checked"
  active-color="#1989fa"
  inactive-color="#3a3d46"
/>
```

### 自定义大小

通过 `size` 属性设置开关尺寸，支持数字和带单位的字符串。

```vue
<zk-switch v-model="checked" size="24px" />
<zk-switch v-model="checked" :size="36" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前开关绑定值 | boolean \| string \| number | `false` |
| activeValue | 开启时的值 | boolean \| string \| number | `true` |
| inactiveValue | 关闭时的值 | boolean \| string \| number | `false` |
| activeColor | 开启时的背景色 | string | `''` |
| inactiveColor | 关闭时的背景色 | string | `''` |
| disabled | 是否禁用开关 | boolean | `false` |
| loading | 是否为加载状态 | boolean | `false` |
| size | 开关尺寸 | number \| string | `30` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 开关状态切换时触发，配合 `v-model` 使用 | `value` |
| change | 开关状态切换时触发 | `value` |
| click | 点击开关时触发，禁用或加载状态下不会触发 | `event: MouseEvent` |
