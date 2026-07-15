<template>
  <div ref="root" class="dialog-demo">
    <section class="demo-section">
      <h2>组件调用</h2>
      <zk-button type="primary" block @click="componentVisible = true">
        打开组件弹窗
      </zk-button>
    </section>

    <section class="demo-section">
      <h2>函数调用</h2>
      <div class="demo-actions">
        <zk-button block @click="showAlert">消息提示</zk-button>
        <zk-button type="primary" block @click="showConfirm">确认消息</zk-button>
      </div>
    </section>

    <p v-if="result" class="demo-result" role="status">{{ result }}</p>

    <zk-dialog
      v-model="componentVisible"
      title="开启消息通知"
      message="开启后，你将及时收到订单状态和服务进度提醒。"
      show-cancel-button
      @confirm="showResult('已开启消息通知')"
      @cancel="showResult('已取消操作')"
    />
  </div>
</template>

<script>
export default {
  name: 'DialogDemo',
  data() {
    return {
      componentVisible: false,
      result: ''
    };
  },
  beforeDestroy() {
    this.$dialog.close();
    window.clearTimeout(this.resultTimer);
  },
  methods: {
    getContainer() {
      return this.$refs.root;
    },
    showAlert() {
      this.$dialog
        .alert({
          title: '提示',
          message: '你的设置已经保存。',
          getContainer: this.getContainer
        })
        .then(() => this.showResult('已查看提示'));
    },
    showConfirm() {
      this.$dialog
        .confirm({
          title: '删除记录',
          message: '删除后无法恢复，是否继续？',
          confirmButtonText: '删除',
          confirmButtonColor: '#ee0a24',
          getContainer: this.getContainer
        })
        .then(() => this.showResult('记录已删除'))
        .catch((action) => {
          if (action !== 'close') this.showResult('已取消删除');
        });
    },
    showResult(message) {
      this.result = message;
      window.clearTimeout(this.resultTimer);
      this.resultTimer = window.setTimeout(() => {
        this.result = '';
      }, 1800);
    }
  }
};
</script>

<style scoped>
.dialog-demo {
  min-height: 100%;
  padding: 22px 20px 34px;
  color: #e6e6e6;
  background: #000000;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  transform: translateZ(0);
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

.demo-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.demo-result {
  margin: 28px 0 0;
  padding: 11px 14px;
  border: 1px solid rgba(25, 137, 250, 0.28);
  border-radius: 4px;
  color: #d9ecff;
  background: rgba(25, 137, 250, 0.16);
  font-size: 14px;
  line-height: 1.45;
}
</style>
