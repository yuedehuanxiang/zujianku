<template>
  <button
    class="zk-button"
    :class="buttonClass"
    :type="nativeType"
    :disabled="disabled"
    :aria-busy="loading ? 'true' : 'false'"
    @click="handleClick"
  >
    <span v-if="loading" class="zk-button__loading" aria-hidden="true"></span>
    <span class="zk-button__content">
      <slot>{{ loadingText }}</slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ZkButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    plain: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loading: Boolean,
    loadingText: {
      type: String,
      default: ''
    },
    block: Boolean,
    round: Boolean,
    size: {
      type: String,
      default: 'normal'
    },
    nativeType: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    buttonClass() {
      return [
        `zk-button--${this.type}`,
        `zk-button--${this.size}`,
        {
          'zk-button--plain': this.plain,
          'zk-button--hairline': this.hairline,
          'zk-button--disabled': this.disabled,
          'zk-button--loading': this.loading,
          'zk-button--block': this.block,
          'zk-button--round': this.round
        }
      ];
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) return;
      this.$emit('click', event);
    }
  }
};
</script>
