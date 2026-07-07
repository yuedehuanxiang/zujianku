<template>
  <div id="docs-app">
    <header class="docs-topbar">
      <div class="docs-brand">
        <span class="docs-brand__mark"></span>
        <span>ZK UI</span>
      </div>
      <nav class="docs-topbar__nav" aria-label="文档导航">
        <a href="#/button">组件</a>
        <a href="#/button">主题</a>
        <a href="#/button">资源</a>
      </nav>
    </header>
    <router-view />
  </div>
</template>
