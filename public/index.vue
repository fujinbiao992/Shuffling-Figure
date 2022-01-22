<template>
  <div class="carousel">
    <div class="inner">
      <h1>Carousel</h1>
    <slot></slot>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance
} from 'vue'
export default {
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
    }
  },
  setup(props){
    const instance = getCurrentInstance()

    const state = reactive({
      currentIndex:props.initial,
      itemLen: 0
    })
    /**
     * 1- 设置定时器,抽离功能函数
     * 
     * 2- 获取props实例操作,拿到图片的索引
     * 
     * 3- 根据当前点击的索引,和图片索引进行对比
     */
    let t =null;
    const autoPlay = ()=>{
     if(props.autoplay){
        t=setInterval(()=>{
        setIndex('next')
      },props.duration)
     }
    };
    // 定时器中,要去执行谁,进行滚动
    const setIndex =(dir)=>{
      switch(dir){
        // 下一张
        case 'next':
          state.currentIndex +=1
          if(state.currentIndex=== state.itemLen){
            state.currentIndex = 0
          }
          break;
        // 上一张
        case "prev":
          state.currentIndex -=1;
          if(state.currentIndex === -1){
            state.currentIndex = state.itemLen -1;
          }
          break;
          default:
            break
      }
    };
    // 实例都加载完以后,调用autoPlay
    onMounted(()=>{
      state.itemLen=instance.slots.default()[0].children.length
      autoPlay()
    })
    // 实例销毁之前,清楚当前的定时器
    onBeforeUnmount(()=>{
      clearInterval(t)
    })
    return {
      ...toRefs(state)
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
    }
  }
</style>