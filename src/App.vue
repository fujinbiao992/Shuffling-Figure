<template>
  <div id='app'>
    <div class="container">
      <carousel
        :autoplay="true" 
        :duration="3000"
        :initial="2"
        :hasDot="true"
        :hasDirector="true"
      >
        <car-item
          v-for="(item,index) of CatData"
          :key="index"
        >
        <img :src="require(`./assets/images/${item.img_name}`)" />
        </car-item>
    </carousel>
    </div>
  </div>
</template>

<script>

import CatData from './data/carousel'
export default {
  name: 'App',
  setup(){
    return{
      CatData
    }
  }
  
}
</script>

<style lang="scss" scoped>
  .container{
    width: 520px;
    height: 280px;
    margin: 150px auto;
  }
</style>
