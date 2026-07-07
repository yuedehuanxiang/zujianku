<template>
  <div class="button-demo">
    <section class="demo-section">
      <h2>按钮类型</h2>
      <div class="demo-grid">
        <zk-button type="primary" @click="markClicked('主要按钮')">主要按钮</zk-button>
        <zk-button type="success" @click="markClicked('成功按钮')">成功按钮</zk-button>
        <zk-button>默认按钮</zk-button>
        <zk-button type="danger">危险按钮</zk-button>
        <zk-button type="warning">警告按钮</zk-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>朴素按钮</h2>
      <div class="demo-grid demo-grid--two">
        <zk-button type="primary" plain>朴素按钮</zk-button>
        <zk-button type="success" plain>朴素按钮</zk-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>细边框</h2>
      <div class="demo-grid demo-grid--two">
        <zk-button type="primary" plain hairline>细边框按钮</zk-button>
        <zk-button type="success" plain hairline>细边框按钮</zk-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>禁用状态</h2>
      <div class="demo-grid demo-grid--two">
        <zk-button type="primary" disabled>禁用状态</zk-button>
        <zk-button type="success" disabled>禁用状态</zk-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>加载状态</h2>
      <div class="demo-grid demo-grid--loading">
        <zk-button type="primary" loading aria-label="加载中"></zk-button>
        <zk-button type="primary" loading></zk-button>
        <zk-button type="success" loading loading-text="加载中..."></zk-button>
      </div>
    </section>

    <p v-if="clickedLabel" class="demo-feedback">{{ clickedLabel }} 已点击</p>
  </div>
</template>

<script>
export default {
  name: 'ButtonDemo',
  data() {
    return {
      clickedLabel: ''
    };
  },
  methods: {
    markClicked(label) {
      this.clickedLabel = label;
      window.clearTimeout(this.feedbackTimer);
      this.feedbackTimer = window.setTimeout(() => {
        this.clickedLabel = '';
      }, 1600);
    }
  },
  beforeDestroy() {
    window.clearTimeout(this.feedbackTimer);
  }
};
</script>

<style scoped>
.button-demo {
  min-height: 100%;
  padding: 22px 20px 34px;
  color: #e6e6e6;
  background: #000000;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.demo-section + .demo-section {
  margin-top: 30px;
}

.demo-section h2 {
  margin: 0 0 18px;
  color: #8c8c8c;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px 20px;
  align-items: center;
}

.demo-grid--two {
  grid-template-columns: repeat(2, 110px);
}

.demo-grid--loading {
  grid-template-columns: 54px 64px 138px;
  gap: 20px;
}

.demo-grid :deep(.zk-button) {
  min-width: 92px;
  height: 55px;
  padding: 0 16px;
  font-size: 16px;
}

.demo-grid--two :deep(.zk-button) {
  min-width: 110px;
}

.demo-grid--loading :deep(.zk-button) {
  min-width: 0;
  height: 54px;
}

.demo-feedback {
  position: sticky;
  bottom: 0;
  margin: 26px 0 0;
  padding: 10px 12px;
  border-radius: 4px;
  color: #ffffff;
  background: rgba(25, 137, 250, 0.22);
  font-size: 14px;
}
</style>
