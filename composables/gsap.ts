import gsap from 'gsap'

export default {
  useFadeUp: () => {
    gsap.utils.toArray('.fadeUp').forEach((fadeItem: any, fadeIdx: number) => {
      gsap.fromTo(fadeItem, {
        opacity: 0,
        y: '40px'
      }, {
        opacity: 1,
        y: '0px',
        duration: 0.3,
        delay: `${0.3 + (fadeIdx * 0.12)}`
      })
    })
  },
  useBackTop: () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power4' })
  }
}
