# ZK UI Vue2 移动端组件库

这是一个基于 `Vue 2.7 + Vite` 的移动端组件库 MVP。项目包含两部分：

- 组件库源码：真正给业务项目引用的组件。
- 文档演示站：左侧组件菜单、中间 Markdown 文档、右侧手机端预览。

## 常用命令

```bash
npm install
npm run dev
npm run build:docs
npm run build:lib
```

- `npm run dev`：启动文档演示站。
- `npm run build:docs`：构建文档站，输出到 `docs-dist/`。
- `npm run build:lib`：构建组件库，输出到 `dist/`。

## 关键目录说明

```text
src/
  index.js
  components/
    button/
    dialog/
    switch/
  docs/
    App.vue
    main.js
    router.js
    docs.config.js
    styles.css
    components/
    demos/
    markdown/
    pages/
```

### `src/index.js`

组件库总入口。

这里决定两件事：

- `Vue.use(ZkUI)` 会全量注册哪些组件。
- 外部是否可以通过 `import { ZkButton, ZkDialog, ZkSwitch } from 'zujianku'` 按需使用组件。
- Dialog 等命令式组件是否可以通过 `import { Dialog } from 'zujianku'` 函数调用。

新增组件时，必须在这里引入、加入 `components` 数组，并导出。

### `src/components/`

组件源码目录。每个组件单独一个文件夹，例如：

```text
src/components/button/
  index.js
  src/button.vue
  style.css

src/components/switch/
  index.js
  src/switch.vue
  style.css
```

每个组件目录的职责：

- `src/xxx.vue`：组件主体逻辑和模板。
- `style.css`：组件自己的样式。
- `index.js`：组件按需注册入口，给组件挂载 `install` 方法。

### `src/docs/`

文档演示站目录，对应页面上的三栏布局。

- `main.js`：文档站入口，初始化 Vue、路由和组件库。
- `App.vue`：顶部栏和文档站根组件。
- `router.js`：路由配置，目前使用 `/:componentName`，所以新增组件一般不需要改路由。
- `docs.config.js`：文档站组件注册表，左侧菜单、中间 Markdown、右侧 demo 都在这里关联。
- `styles.css`：文档站整体样式，包括三栏布局、暗色主题、手机预览位置。
- `pages/ComponentPage.vue`：三栏页面主体，负责渲染左侧菜单、中间文档、右侧预览。

### `src/docs/markdown/`

中间文档区的 Markdown 文件目录。

例如：

```text
src/docs/markdown/button.md
src/docs/markdown/switch.md
```

Markdown 文件用于写组件说明、代码演示、API 表格等内容。

### `src/docs/demos/`

右侧手机预览 demo 目录。

例如：

```text
src/docs/demos/ButtonDemo.vue
src/docs/demos/SwitchDemo.vue
```

这里写真实 Vue2 示例代码。中间 Markdown 只负责展示说明，右侧 demo 才负责运行组件。

### `src/docs/components/`

文档站内部组件目录。

- `MarkdownRenderer.vue`：把 `.md` 文档渲染成页面内容。
- `PhonePreview.vue`：右侧手机预览容器。

### 配置文件

- `vite.config.js`：文档站开发和构建配置。
- `vite.lib.config.js`：组件库打包配置。
- `package.json`：依赖、命令、组件库入口信息。

## 新增一个组件的文件流程

下面以新增 `Cell 单元格` 组件为例。假设组件名叫 `ZkCell`，路由 key 叫 `cell`。

### 1. 新增组件源码目录

新建：

```text
src/components/cell/
  index.js
  src/cell.vue
  style.css
```

`src/components/cell/index.js` 示例：

```js
import ZkCell from './src/cell.vue';
import './style.css';

ZkCell.install = (Vue) => {
  Vue.component(ZkCell.name, ZkCell);
};

export default ZkCell;
```

`src/components/cell/src/cell.vue` 里组件名要使用大驼峰：

```js
export default {
  name: 'ZkCell'
};
```

### 2. 修改组件库总入口

修改 `src/index.js`。

```js
import ZkButton from './components/button';
import ZkSwitch from './components/switch';
import ZkCell from './components/cell';

const components = [ZkButton, ZkSwitch, ZkCell];

export { ZkButton, ZkSwitch, ZkCell };
```

这样组件才能被全量注册和按需导出。

### 3. 新增 Markdown 文档

新建：

```text
src/docs/markdown/cell.md
```

推荐结构：

````md
# Cell 单元格

## 介绍

单元格用于展示列表项、设置项或信息入口。

## 引入

```js
import Vue from 'vue';
import { ZkCell } from 'zujianku';
import 'zujianku/dist/style.css';

Vue.use(ZkCell);
```

## 代码演示

### 基础用法

```vue
<zk-cell title="单元格" value="内容" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 左侧标题 | string | `''` |
````

注意：

- 一级标题 `# xxx` 会成为页面大标题。
- 二级标题 `## 介绍`、`## 引入` 会渲染成普通文档卡片。
- `## 代码演示` 下面的三级标题 `### 基础用法` 会渲染成演示卡片。

### 4. 新增右侧手机预览 demo

新建：

```text
src/docs/demos/CellDemo.vue
```

示例：

```vue
<template>
  <div class="cell-demo">
    <section class="demo-section">
      <h2>基础用法</h2>
      <zk-cell title="单元格" value="内容" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'CellDemo'
};
</script>
```

### 5. 修改文档注册表

修改 `src/docs/docs.config.js`。

先引入 Markdown 和 demo：

```js
import cellMarkdown from './markdown/cell.md?raw';
import CellDemo from './demos/CellDemo.vue';
```

然后把组件加到左侧菜单中：

```js
{
  key: 'cell',
  label: 'Cell 单元格',
  title: 'Cell 单元格',
  previewTitle: 'Cell',
  markdown: cellMarkdown,
  demo: CellDemo
}
```

只要这里配置了 `key`，左侧菜单就会变成可点击链接。访问路径是：

```text
http://127.0.0.1:5173/#/cell
```

### 6. 验证

新增组件后运行：

```bash
npm run build:docs
npm run build:lib
```

然后在浏览器检查：

- 左侧菜单是否出现新组件。
- 点击菜单后 URL 是否切换到 `#/组件key`。
- 中间 Markdown 文档是否显示正常。
- 右侧手机预览 demo 是否显示正常。
- 组件是否能通过 `Vue.use(ZkUI)` 和 `Vue.use(ZkXxx)` 注册使用。

## 新增组件速查清单

新增一个组件通常要改 5 个位置：

```text
1. src/components/组件名/
2. src/index.js
3. src/docs/markdown/组件名.md
4. src/docs/demos/组件名Demo.vue
5. src/docs/docs.config.js
```

如果只是占位菜单，没有 `key`，左侧菜单不会跳转；如果要能跳转，必须在 `docs.config.js` 中配置 `key`、`markdown` 和 `demo`。
