import ComponentPage from './pages/ComponentPage.vue';

export const createRouter = (VueRouter) =>
  new VueRouter({
    mode: 'hash',
    routes: [
      {
        path: '/',
        redirect: '/button'
      },
      {
        path: '/:componentName',
        name: 'component',
        component: ComponentPage,
        props: true
      }
    ],
    scrollBehavior() {
      return { x: 0, y: 0 };
    }
  });
