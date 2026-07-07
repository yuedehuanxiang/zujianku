<template>
  <div class="phone-frame">
    <div class="phone-header">
      <ChevronLeftIcon class="phone-header__back" size="24" aria-hidden="true" />
      <strong>{{ title }}</strong>
    </div>
    <div class="phone-screen">
      <component :is="demo" />
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons';

export default {
  name: 'PhonePreview',
  components: {
    ChevronLeftIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    demo: {
      type: [Object, Function],
      required: true
    }
  }
};
</script>
