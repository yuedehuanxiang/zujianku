<template>
  <button
    class="zk-switch"
    :class="switchClass"
    :style="switchStyle"
    type="button"
    role="switch"
    :aria-checked="checked ? 'true' : 'false'"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="zk-switch__loading" aria-hidden="true"></span>
    <span class="zk-switch__node"></span>
  </button>
</template>

<script>
export default {
  name: 'ZkSwitch',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    loading: Boolean,
    size: {
      type: [Number, String],
      default: 30
    }
  },
  computed: {
    checked() {
      return this.value === this.activeValue;
    },
    switchClass() {
      return {
        'zk-switch--on': this.checked,
        'zk-switch--disabled': this.disabled,
        'zk-switch--loading': this.loading
      };
    },
    switchStyle() {
      const size = typeof this.size === 'number' ? `${this.size}px` : this.size;
      const color = this.checked ? this.activeColor : this.inactiveColor;

      return {
        fontSize: size,
        backgroundColor: color || undefined
      };
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) return;

      const nextValue = this.checked ? this.inactiveValue : this.activeValue;
      this.$emit('input', nextValue);
      this.$emit('change', nextValue);
      this.$emit('click', event);
    }
  }
};
</script>
