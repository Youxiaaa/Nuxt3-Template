export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy', {
    mounted (el, bind) {
      const watcher = new IntersectionObserver(onEnterView)

      watcher.observe(el)

      async function onEnterView (img: any, observer: any) {
        for (let i = 0; i < img.length; i += 1) {
          if (img[i].isIntersecting) {
            const target = img[i].target
            target.setAttribute('src', '/images/error/loading.gif')

            let exist = await imageIsExist(bind.value);

            if (exist) {
              target.setAttribute('src', bind.value);
            } else {
              target.setAttribute('src', '/images/error/error-img.gif');
            }
            observer.unobserve(target)
          }
        }
      }

      // 檢查圖片是否存在
      async function imageIsExist(url: string) {
        return await new Promise((resolve) => {
          let img = new Image() as any
          img.onload = function() {
            if (this.complete == true) {
              resolve(true);
              img = null;
            }
          }
          img.onerror = function () {
            resolve(false);
            img = null;
          }
          img.src = url;
        })
      }
    },
    getSSRProps (binding, vnode) {
      return {}
    }
  })
})
