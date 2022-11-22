<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar></Navbar>
  <n-grid cols="1" responsive="screen">
    <n-grid-item>
      <div id="home">
        
      </div>
    </n-grid-item>
    <n-grid-item>
      <div id="about">
        1
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script>
import { defineComponent } from 'vue'
import { NGrid, NGridItem} from 'naive-ui'  

export default defineComponent({
  components: {
    NGrid,
    NGridItem
  }
})
</script>

<style scoped>
  #home{
    min-height: 100vh;
    background-color: #F5F5F5;
  }
  #about{
    min-height: 100vh;
    background-color: red;
  }
</style>
