import buttonMarkdown from './markdown/button.md?raw';
import switchMarkdown from './markdown/switch.md?raw';
import ButtonDemo from './demos/ButtonDemo.vue';
import SwitchDemo from './demos/SwitchDemo.vue';

export const sidebarGroups = [
  {
    title: '',
    items: [
      { label: '从 v3 升级到 v4' },
      { label: '贡献指南' },
      { label: '设计资源' },
      { label: '国际化' }
    ]
  },
  {
    title: '基础组件',
    items: [
      {
        key: 'button',
        label: 'Button 按钮',
        title: 'Button 按钮',
        previewTitle: 'Button',
        markdown: buttonMarkdown,
        demo: ButtonDemo
      },
      { label: 'Cell 单元格' },
      { label: 'ConfigProvider 全局配置' },
      { label: 'Icon 图标' },
      { label: 'Image 图片' },
      { label: 'Layout 布局' },
      { label: 'Popup 弹出层' },
      { label: 'Space 间距' },
      { label: 'Style 内置样式' },
      { label: 'Toast 轻提示' }
    ]
  },
  {
    title: '表单组件',
    items: [
      { label: 'Calendar 日历' },
      { label: 'Cascader 级联选择' },
      { label: 'Checkbox 复选框' },
      { label: 'DatePicker 日期选择' },
      { label: 'Field 输入框' },
      {
        key: 'switch',
        label: 'Switch 开关',
        title: 'Switch 开关',
        previewTitle: 'Switch',
        markdown: switchMarkdown,
        demo: SwitchDemo
      }
    ]
  }
];

export const docsComponents = sidebarGroups
  .flatMap((group) => group.items)
  .filter((item) => item.key);

export const getDocComponent = (key) =>
  docsComponents.find((component) => component.key === key) || docsComponents[0];
