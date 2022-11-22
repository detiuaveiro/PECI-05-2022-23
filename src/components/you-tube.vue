<template>
  <div class="you-tube-you-tube">
    <img
      :alt="pastedImage_alt"
      :src="pastedImage_src"
      class="you-tube-pasted-image"
    />
  </div>
</template>

<script>
export default {
  name: 'YouTube',
  props: {
    pastedImage_src: {
      type: String,
      default: '/playground_assets/pastedimage-smjb.svg',
    },
    pastedImage_alt: {
      type: String,
      default: 'pastedImage',
    },
  },
}
</script>

<style scoped>
.you-tube-you-tube {
  width: 240px;
  height: 120px;
  display: flex;
  align-items: center;
  border-radius: 200px;
  justify-content: center;
  background-color: var(--dl-color-gray-white);
}
.you-tube-pasted-image {
  width: 120px;
}
@media(max-width: 479px) {
  .you-tube-you-tube {
    width: 120px;
    height: 60px;
    align-items: center;
  }
  .you-tube-pasted-image {
    width: 80px;
  }
}
</style>
