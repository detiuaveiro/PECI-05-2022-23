<template>
  <n-carousel
    class="carousel"
    autoplay="true"
    :show-dots="false"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    >
  </n-carousel>
</template>

<script>
  import { defineComponent } from 'vue'
  import { NCarousel } from 'naive-ui'

  export default defineComponent({
    components: {
      NCarousel
    }
  })
</script>


<style scoped>
    .carousel{
        width: 100vh;
        padding: 0%;
        margin-top: 0%;
    }
    .carousel-img {
        width: 100%;
        height: 75vh;
        object-fit: cover;
    }
</style>