export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy', {
    mounted (el, bind) {
      const watcher = new IntersectionObserver(onEnterView)

      watcher.observe(el)

      async function onEnterView (img: any, observer: any) {
        if (img[0].isIntersecting) {
          const target = img[0].target
          const targetParent = target.parentNode
          const loadingDiv = document.createElement('div')

          target.classList.add('hidden')
          loadingDiv.classList.add('loading__img')
          targetParent.appendChild(loadingDiv)
          targetParent.insertBefore(loadingDiv, target)

          const exist = await imageIsExist(bind.value)

          if (exist) {
            target.setAttribute('src', bind.value)
            target.classList.remove('hidden')
            loadingDiv.classList.add('hidden')
          } else {
            target.setAttribute('src', '/images/error/error-img.gif')
            target.classList.remove('hidden')
            loadingDiv.classList.add('hidden')
          }
          observer.unobserve(target)
        }
      }

      // 檢查圖片是否存在
      async function imageIsExist (url: string) {
        return await new Promise((resolve) => {
          let img = new Image() as any
          img.src = url
          img.onload = function () {
            if (this.complete === true) {
              resolve(true)
              img = null
            }
          }
          img.onerror = function () {
            resolve(false)
            img = null
          }
        })
      }
    },
    beforeUnmount () {
      // 取消圖片請求
      window.stop()
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getSSRProps (binding, vnode) {
      return {}
    }
  })
})
