<template>
  <article class="markdown-body">
    <h1>{{ parsed.title }}</h1>

    <template v-for="section in parsed.sections">
      <section v-if="section.type === 'card'" :key="section.id" class="doc-card">
        <h2>{{ section.title }}</h2>
        <div v-html="render(section.content)"></div>
      </section>

      <section v-else :key="section.id" class="doc-demo-block">
        <h2 class="doc-demo-block__title">{{ section.title }}</h2>
        <section
          v-for="child in section.children"
          :key="child.id"
          class="doc-card doc-card--demo"
        >
          <h3>{{ child.title }}</h3>
          <div v-html="render(child.content)"></div>
        </section>
      </section>
    </template>
  </article>
</template>

<script>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/common';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(code, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
      } catch (error) {
        return '';
      }
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`;
  }
});

const splitByHeading = (source, level) => {
  const heading = '#'.repeat(level);
  const sections = [];
  let current = null;

  source.split('\n').forEach((line) => {
    if (line.startsWith(`${heading} `)) {
      if (current) sections.push(current);
      current = {
        title: line.replace(`${heading} `, '').trim(),
        content: []
      };
      return;
    }

    if (current) current.content.push(line);
  });

  if (current) sections.push(current);
  return sections;
};

export default {
  name: 'MarkdownRenderer',
  props: {
    source: {
      type: String,
      required: true
    }
  },
  computed: {
    parsed() {
      const trimmed = this.source.trim();
      const firstLine = trimmed.split('\n')[0] || '';
      const title = firstLine.startsWith('# ') ? firstLine.replace('# ', '').trim() : '';
      const body = firstLine.startsWith('# ') ? trimmed.split('\n').slice(1).join('\n') : trimmed;

      const sections = splitByHeading(body, 2).map((section, index) => {
        if (section.title === '代码演示') {
          const children = splitByHeading(section.content.join('\n'), 3).map((child, childIndex) => ({
            id: `demo-${childIndex}-${child.title}`,
            title: child.title,
            content: child.content.join('\n')
          }));

          return {
            id: `section-${index}-${section.title}`,
            type: 'demo',
            title: section.title,
            children
          };
        }

        return {
          id: `section-${index}-${section.title}`,
          type: 'card',
          title: section.title,
          content: section.content.join('\n')
        };
      });

      return {
        title,
        sections
      };
    }
  },
  methods: {
    render(content) {
      return md.render(content);
    }
  }
};
</script>
