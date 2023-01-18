import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Solid 系列
import {
  faHouse,
  faAngleUp
} from '@fortawesome/pro-solid-svg-icons'
// Regular 系列
import {
  faHouse as farHouse,
  faArrowRightFromBracket as farArrowRightFromBracket
} from '@fortawesome/pro-regular-svg-icons'
// Brands 系列
import {
  faApple
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

// 引入 Solid 系列
library.add(faHouse, faAngleUp)

// 引入 Regular 系列
library.add(farHouse, farArrowRightFromBracket)

// 引入 Brands 系列
library.add(faApple)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('fa', FontAwesomeIcon)
})
