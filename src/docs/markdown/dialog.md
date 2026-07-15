# Dialog 弹出框

## 介绍

弹出框用于承载重要提示、操作确认或需要用户明确回应的内容。支持组件调用和函数调用两种方式。

## 引入

全量注册后可以同时使用组件和 `this.$dialog`。按需引入时，`ZkDialog` 用于注册组件，`Dialog` 用于函数调用。

```js
import Vue from 'vue';
import ZkUI, { Dialog, ZkDialog } from 'zujianku';
import 'zujianku/dist/style.css';

Vue.use(ZkUI);
// 或
Vue.use(ZkDialog);

Dialog.alert({ message: '提示内容' });
```

## 代码演示

### 组件调用

通过 `v-model` 控制显示状态。确认与取消操作分别触发 `confirm` 和 `cancel` 事件。

```vue
<template>
  <div>
    <zk-button type="primary" @click="visible = true">打开弹窗</zk-button>
    <zk-dialog
      v-model="visible"
      title="开启消息通知"
      message="开启后，你将及时收到订单状态提醒。"
      show-cancel-button
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
export default {
  data: () => ({ visible: false }),
  methods: {
    handleConfirm() {
      // 处理确认操作
    }
  }
};
</script>
```

### 函数调用

`Dialog.alert` 和 `Dialog.confirm` 均返回 Promise。点击确认时 Promise resolve；点击取消、遮罩或按下 Esc 时 Promise reject，并返回对应动作名称。

```js
import { Dialog } from 'zujianku';

Dialog.alert({
  title: '提示',
  message: '你的设置已经保存。'
});

Dialog.confirm({
  title: '删除记录',
  message: '删除后无法恢复，是否继续？'
})
  .then(() => {
    // 用户确认
  })
  .catch((action) => {
    // action: cancel、overlay 或 escape
  });
```

在组件实例中，也可以通过全量注册或 `Vue.use(ZkDialog)` 注入的 `$dialog` 调用。

```js
this.$dialog.confirm({
  title: '确认提交',
  message: '请确认填写的信息无误。'
});
```

### 异步关闭

通过 `beforeClose` 在弹窗关闭前执行校验或异步任务。返回 `false` 或 rejected Promise 会阻止关闭。

```js
Dialog.confirm({
  title: '提交订单',
  message: '确认提交当前订单？',
  beforeClose(action) {
    if (action !== 'confirm') return true;
    return submitOrder().then(() => true);
  }
});
```

也支持回调形式：`beforeClose(action, done)`，调用 `done(false)` 可阻止关闭。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 是否显示弹出框，支持 `v-model` | boolean | `false` |
| title | 标题 | string | `''` |
| message | 内容 | string | `''` |
| width | 弹出框宽度 | number \| string | `320` |
| messageAlign | 内容对齐，可选 `left`、`center`、`right` | string | `center` |
| showCancelButton | 是否显示取消按钮 | boolean | `false` |
| showConfirmButton | 是否显示确认按钮 | boolean | `true` |
| cancelButtonText | 取消按钮文案 | string | `取消` |
| confirmButtonText | 确认按钮文案 | string | `确认` |
| cancelButtonColor | 取消按钮颜色 | string | `''` |
| confirmButtonColor | 确认按钮颜色 | string | `#1989fa` |
| overlay | 是否显示遮罩 | boolean | `true` |
| closeOnClickOverlay | 点击遮罩是否关闭 | boolean | `false` |
| closeOnPressEscape | 按下 Esc 是否关闭 | boolean | `true` |
| lockScroll | 显示时是否锁定页面滚动 | boolean | `true` |
| beforeClose | 关闭前回调，返回 `false` 可阻止关闭 | function | `null` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容 |
| title | 自定义标题 |
| footer | 自定义底部操作区 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 显示状态改变时触发 | `value: boolean` |
| confirm | 点击确认并通过关闭守卫时触发 | - |
| cancel | 点击取消并通过关闭守卫时触发 | - |
| click-overlay | 点击遮罩时触发 | - |
| open | 弹出框打开时触发 | - |
| opened | 打开动画结束时触发 | - |
| close | 弹出框关闭时触发 | - |
| closed | 关闭动画结束时触发 | - |

### 方法

| 方法名 | 说明 | 返回值 |
| --- | --- | --- |
| Dialog(options) | 打开弹出框 | Promise |
| Dialog.alert(options) | 打开提示弹出框 | Promise |
| Dialog.confirm(options) | 打开确认弹出框 | Promise |
| Dialog.close() | 关闭所有函数调用创建的弹出框 | void |
| Dialog.setDefaultOptions(options) | 修改函数调用的默认配置 | void |
| Dialog.resetDefaultOptions() | 重置函数调用的默认配置 | void |
