<template>
  <div class="carousel"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"  
  >
    <div class="inner">
        <CarDot
          :itemLen="itemLen"
          :currentIndex="currentIndex"
          :hasDot="hasDot"
          :dotBgColor="dotBgColor"
          @dotClick="dotClick"
         
        />
        <CarDirector
          dir="prev"
          @dirClick="dirClick"
        />
        <CarDirector
          dir="next"
          @dirClick="dirClick"
        />
        <slot></slot>
    </div>
  </div>
</template>

<script>
import CarDot from './Dot.vue'
import CarDirector from './Director.vue'
import {
  reactive,
  toRefs,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance
} from 'vue'
export default {
  components:{
    CarDot,
    CarDirector
  },
  name:'Carousel',
  props:{
    // 是否自动播放
    autoplay:{
      type:Boolean,
      default:true
    },
    // 多长时间播放
    duration:{
      type:Number,
      default:0
    },
    // 从第几张显示
    initial:{
      type:Number,
      default:0
    },
    // 轮播图下方的小圆点
    hasDot:{
      type:Boolean,
      default:true
    },
    // 左右切换的定时器
    hasDirector:{
      type:Boolean,
      default:true
    },
    // 默认传递的背景色
    dotBgColor:String
  },
  setup(props){
    // 获取当前组件实例
    const instance = getCurrentInstance()
    const state = reactive({
      currentIndex:props.initial, // 从第几张显示的图片索引
      itemLen:0
    })
    /**
     * 1- 创建定时器函数
     * 2- 抽离判断逻辑函数
     */
    let t = null;
    const autoPlay=()=>{
      if(props.autoplay){
        t=setInterval(()=>{
          // 需要处理的业务逻辑
          setIndex('next')
        },props.duration)
      }
    }
    // 抽取具体的业务逻辑
    const setIndex =(pre)=>{
      switch(pre){
        // 点击的是下一张
        case 'next':
          state.currentIndex +=1
          if(state.currentIndex === state.itemLen){
            state.currentIndex =0
          }
          break
        case 'prev':
          if(state.currentIndex === -1){
            state.currentIndex = state.itemLen-1
          }
          break
        default:
          break
      }
    }
    const dotClick =(index)=>{
      state.currentIndex=index
    }
    const dirClick =(dir)=>{
      setIndex(dir)
    }
    // 鼠标移入暂定
    const mouseEnter =()=>{
      _cleanIntervalFn()
    }
    // 鼠标离开播放
    const mouseLeave= ()=>{
      autoPlay()
    }
    // 公共函数-> 清除定时器
    function _cleanIntervalFn(){
      clearInterval(t)
      t=null
    }
    onMounted(()=>{
      // 获取到保存图片数组的长度
      state.itemLen = instance.slots.default()[0].children.length
      autoPlay()
    })
    onBeforeUnmount(()=>{
      _cleanIntervalFn()
    })
    return {
      ...toRefs(state),
    dotClick,
    dirClick,
    mouseEnter,
    mouseLeave
    }
  }
}
</script>

<style lang="scss" scoped>
  .carousel{
    height: 100%;
    height: 100%;
    .inner{
      position: relative;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
  }
</style>