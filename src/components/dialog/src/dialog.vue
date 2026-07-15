<template>
  <transition
    name="zk-dialog-fade"
    @after-enter="$emit('opened')"
    @after-leave="$emit('closed')"
  >
    <div
      v-if="value"
      class="zk-dialog-wrapper"
      :class="{ 'zk-dialog-wrapper--transparent': !overlay }"
      @click.self="handleOverlayClick"
    >
      <div
        ref="dialog"
        class="zk-dialog"
        :style="dialogStyle"
        role="dialog"
        aria-modal="true"
        :aria-label="title ? undefined : '对话框'"
        :aria-labelledby="title ? titleId : undefined"
        :aria-describedby="hasMessage ? messageId : undefined"
        tabindex="-1"
        @click.stop
      >
        <header v-if="title || $slots.title" :id="titleId" class="zk-dialog__header">
          <slot name="title">{{ title }}</slot>
        </header>

        <div
          v-if="hasMessage"
          :id="messageId"
          class="zk-dialog__content"
          :class="`zk-dialog__content--${messageAlign}`"
        >
          <slot>{{ message }}</slot>
        </div>

        <footer v-if="$slots.footer" class="zk-dialog__footer">
          <slot name="footer" />
        </footer>
        <footer v-else class="zk-dialog__footer" :class="{ 'is-loading': pending }">
          <button
            v-if="showCancelButton"
            ref="cancelButton"
            class="zk-dialog__button zk-dialog__button--cancel"
            type="button"
            :style="cancelButtonStyle"
            :disabled="pending"
            @click="handleAction('cancel')"
          >
            {{ cancelButtonText }}
          </button>
          <button
            v-if="showConfirmButton"
            ref="confirmButton"
            class="zk-dialog__button zk-dialog__button--confirm"
            type="button"
            :style="confirmButtonStyle"
            :disabled="pending"
            @click="handleAction('confirm')"
          >
            <span v-if="pendingAction === 'confirm'" class="zk-dialog__loading" aria-hidden="true" />
            {{ confirmButtonText }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
let dialogSeed = 0;
let lockCount = 0;
let previousBodyOverflow = '';

const lockBodyScroll = () => {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;
};

const unlockBodyScroll = () => {
  if (typeof document === 'undefined' || lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) {
    document.body.style.overflow = previousBodyOverflow;
  }
};

export default {
  name: 'ZkDialog',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: Boolean,
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 320
    },
    messageAlign: {
      type: String,
      default: 'center',
      validator: (value) => ['left', 'center', 'right'].includes(value)
    },
    showCancelButton: Boolean,
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonColor: {
      type: String,
      default: ''
    },
    confirmButtonColor: {
      type: String,
      default: '#1989fa'
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: Boolean,
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    beforeClose: {
      type: Function,
      default: null
    }
  },
  data() {
    const id = ++dialogSeed;
    return {
      titleId: `zk-dialog-title-${id}`,
      messageId: `zk-dialog-message-${id}`,
      pendingAction: '',
      previousActiveElement: null,
      scrollLocked: false
    };
  },
  computed: {
    hasMessage() {
      return Boolean(this.message || this.$slots.default);
    },
    pending() {
      return Boolean(this.pendingAction);
    },
    dialogStyle() {
      const width = typeof this.width === 'number' ? `${this.width}px` : this.width;
      return { width };
    },
    cancelButtonStyle() {
      return this.cancelButtonColor ? { color: this.cancelButtonColor } : undefined;
    },
    confirmButtonStyle() {
      return this.confirmButtonColor ? { color: this.confirmButtonColor } : undefined;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value, oldValue) {
        if (value) {
          this.openDialog();
        } else if (oldValue) {
          this.closeDialog();
        }
      }
    }
  },
  beforeDestroy() {
    this.removeGlobalEffects(false);
  },
  methods: {
    openDialog() {
      if (typeof document !== 'undefined') {
        this.previousActiveElement = document.activeElement;
        document.addEventListener('keydown', this.handleKeydown);
      }
      if (this.lockScroll && !this.scrollLocked) {
        lockBodyScroll();
        this.scrollLocked = true;
      }
      this.$emit('open');
      this.$nextTick(() => {
        const target = this.$refs.confirmButton || this.$refs.cancelButton || this.$refs.dialog;
        if (target) target.focus();
      });
    },
    closeDialog() {
      this.pendingAction = '';
      this.removeGlobalEffects(true);
      this.$emit('close');
    },
    removeGlobalEffects(restoreFocus) {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', this.handleKeydown);
      }
      if (this.scrollLocked) {
        unlockBodyScroll();
        this.scrollLocked = false;
      }
      if (
        restoreFocus &&
        this.previousActiveElement &&
        typeof this.previousActiveElement.focus === 'function'
      ) {
        this.previousActiveElement.focus();
      }
      this.previousActiveElement = null;
    },
    handleOverlayClick() {
      this.$emit('click-overlay');
      if (this.closeOnClickOverlay) this.handleAction('overlay');
    },
    handleKeydown(event) {
      if (!this.value) return;
      if (event.key === 'Escape' && this.closeOnPressEscape && !this.pending) {
        event.preventDefault();
        this.handleAction('escape');
        return;
      }
      if (event.key !== 'Tab') return;

      const dialog = this.$refs.dialog;
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    handleAction(action) {
      if (this.pending) return;
      if (!this.beforeClose) {
        this.commitAction(action);
        return;
      }

      let settled = false;
      const done = (allowed = true) => {
        if (settled) return;
        settled = true;
        this.pendingAction = '';
        if (allowed !== false && this.value) this.commitAction(action);
      };

      this.pendingAction = action;
      try {
        const result = this.beforeClose(action, done);
        if (result && typeof result.then === 'function') {
          result.then(done).catch(() => done(false));
        } else if (this.beforeClose.length < 2) {
          done(result !== false);
        }
      } catch (error) {
        done(false);
        this.$emit('error', error);
      }
    },
    commitAction(action) {
      if (action === 'confirm') this.$emit('confirm');
      if (action === 'cancel') this.$emit('cancel');
      this.$emit('action', action);
      this.$emit('input', false);
    }
  }
};
</script>
