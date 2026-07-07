<template>
  <div class="docs-shell">
    <aside class="docs-sidebar" aria-label="组件列表">
      <div
        v-for="group in sidebarGroups"
        :key="group.title || 'guide'"
        class="docs-sidebar__group"
      >
        <h2 v-if="group.title">{{ group.title }}</h2>
        <nav>
          <component
            :is="item.key ? 'router-link' : 'span'"
            v-for="item in group.items"
            :key="item.label"
            class="docs-sidebar__item"
            :class="{ 'is-disabled': !item.key }"
            :to="item.key ? `/${item.key}` : undefined"
          >
            {{ item.label }}
          </component>
        </nav>
      </div>
    </aside>

    <main class="docs-content" :aria-label="current.title">
      <MarkdownRenderer :source="current.markdown" />
    </main>

    <aside class="docs-preview" aria-label="手机端预览效果">
      <PhonePreview :title="current.previewTitle" :demo="current.demo" />
    </aside>
  </div>
</template>

<script>
import { getDocComponent, sidebarGroups } from '../docs.config';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';
import PhonePreview from '../components/PhonePreview.vue';

export default {
  name: 'ComponentPage',
  components: {
    MarkdownRenderer,
    PhonePreview
  },
  props: {
    componentName: {
      type: String,
      default: 'button'
    }
  },
  data() {
    return {
      sidebarGroups
    };
  },
  computed: {
    current() {
      return getDocComponent(this.componentName);
    }
  }
};
</script>
