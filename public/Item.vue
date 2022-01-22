<template>
  <div class="car-item" v-if="selfIndex === currentIndex">
    <slot></slot>
  </div>
</template>

<script>
import {
  getCurrentInstance,
  reactive,
  toRefs,
  watch
  } from 'vue'
export default {
  name:'CarItem',
  setup(){
    // 获取当前组件的实例对象
    const instance = getCurrentInstance()
    const state = reactive({
      selfIndex:instance.vnode.key,
      currentIndex:instance.parent.ctx.currentIndex
    })
    // watch监听currentIndex的变化
    watch(()=>{
      return instance.parent.ctx.currentIndex
    },(value)=>{
      state.currentIndex=value
    })
    return{
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.car-item{
  position: absolute;
  left: 0;
  top:0;
  width: 100%;
  height: 100%;
}
img{
  width: 100%;
}
</style>