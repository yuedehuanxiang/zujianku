# Button 按钮

## 介绍

按钮用于触发一个操作，如提交表单、发起请求或打开下一步流程。

## 引入

通过以下方式来全局注册组件，更多注册方式后续会在组件注册文档中补充。

```js
import Vue from 'vue';
import ZkUI, { ZkButton } from 'zujianku';
import 'zujianku/dist/style.css';

Vue.use(ZkUI);
// 或
Vue.use(ZkButton);
```

## 代码演示

### 按钮类型

通过 `type` 属性设置按钮类型，支持 `primary`、`success`、`default`、`danger`、`warning`。

```vue
<zk-button type="primary">主要按钮</zk-button>
<zk-button type="success">成功按钮</zk-button>
<zk-button>默认按钮</zk-button>
<zk-button type="danger">危险按钮</zk-button>
<zk-button type="warning">警告按钮</zk-button>
```

### 朴素按钮

设置 `plain` 属性后，按钮会以透明背景和描边样式展示。

```vue
<zk-button type="primary" plain>朴素按钮</zk-button>
<zk-button type="success" plain>朴素按钮</zk-button>
```

### 细边框

设置 `hairline` 属性后，按钮会展示更轻的描边效果，通常与 `plain` 搭配使用。

```vue
<zk-button type="primary" plain hairline>细边框按钮</zk-button>
<zk-button type="success" plain hairline>细边框按钮</zk-button>
```

### 禁用状态

设置 `disabled` 属性后，按钮不可点击，也不会触发 `click` 事件。

```vue
<zk-button type="primary" disabled>禁用状态</zk-button>
<zk-button type="success" disabled>禁用状态</zk-button>
```

### 加载状态

设置 `loading` 属性后，按钮进入加载状态。可通过 `loading-text` 展示加载文案。

```vue
<zk-button type="primary" loading />
<zk-button type="success" loading loading-text="加载中..." />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型，可选值为 `primary`、`success`、`danger`、`warning` | string | `default` |
| plain | 是否为朴素按钮 | boolean | `false` |
| hairline | 是否使用细边框 | boolean | `false` |
| disabled | 是否禁用按钮 | boolean | `false` |
| loading | 是否显示加载状态 | boolean | `false` |
| loadingText | 加载状态提示文案 | string | `''` |
| block | 是否为块级元素 | boolean | `false` |
| round | 是否为圆角按钮 | boolean | `false` |
| size | 按钮尺寸，可选值为 `large`、`normal`、`small`、`mini` | string | `normal` |
| nativeType | 原生 button 标签的 type 属性 | string | `button` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮，禁用或加载状态下不会触发 | `event: MouseEvent` |
