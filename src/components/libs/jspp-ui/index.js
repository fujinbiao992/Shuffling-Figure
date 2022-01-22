//  把组件注册成全局可以使用的插件
import Carousel from "../jspp-ui/Carousel"
import CarItem from "../jspp-ui/Carousel/Item"
const JsppUI = {}

JsppUI.install = function (Vue) {
  Vue.component(Carousel.name, Carousel)
  Vue.component(CarItem.name, CarItem)
}

export default JsppUI