<template>
  <div class="switch-demo">
    <section class="demo-section">
      <h2>基础用法</h2>
      <div class="demo-row">
        <zk-switch v-model="checked" />
        <span>{{ checked ? '已开启' : '已关闭' }}</span>
      </div>
    </section>

    <section class="demo-section">
      <h2>禁用状态</h2>
      <div class="demo-row">
        <zk-switch v-model="checkedDisabled" disabled />
        <zk-switch :value="false" disabled />
      </div>
    </section>

    <section class="demo-section">
      <h2>加载状态</h2>
      <div class="demo-row">
        <zk-switch v-model="checkedLoading" loading />
        <zk-switch :value="false" loading />
      </div>
    </section>

    <section class="demo-section">
      <h2>自定义颜色</h2>
      <div class="demo-row">
        <zk-switch
          v-model="checkedColor"
          active-color="#1989fa"
          inactive-color="#3a3d46"
        />
        <zk-switch
          v-model="checkedWarning"
          active-color="#ff976a"
          inactive-color="#3a3d46"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>自定义大小</h2>
      <div class="demo-row demo-row--sizes">
        <zk-switch v-model="checkedSmall" size="24px" />
        <zk-switch v-model="checkedLarge" size="36px" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SwitchDemo',
  data() {
    return {
      checked: true,
      checkedDisabled: true,
      checkedLoading: true,
      checkedColor: true,
      checkedWarning: true,
      checkedSmall: true,
      checkedLarge: true
    };
  }
};
</script>

<style scoped>
.switch-demo {
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
  margin-top: 32px;
}

.demo-section h2 {
  margin: 0 0 18px;
  color: #8c8c8c;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 42px;
}

.demo-row span {
  color: #c9ccd2;
  font-size: 15px;
}

.demo-row--sizes {
  gap: 24px;
}
</style>
