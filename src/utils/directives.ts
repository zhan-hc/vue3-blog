import { App } from 'vue'

export default (app: App<Element>) => {
    //自定义组件
    app.directive('scrollHide', (el: HTMLElement, binding) => {
        window.addEventListener('scroll', () => {
          const top =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop; //兼容不同的浏览器
          const width =
          document.documentElement.clientWidth ||
          document.body.clientWidth;
          const limitHeight = width > 700 ? 590 : 350
          if (top > limitHeight) {
            el.style.display = 'none'
          } else {
            el.style.display = 'block'
          }
        })
    });
}
