<template>
  <div class="schedule-schedule card">
    <img :alt="Icon_alt" :src="Icon_src" class="schedule-icon" />
    <span class="schedule-text">{{ text }}</span>
    <span class="schedule-text1">{{ text1 }}</span>
    <div>Placeholder for widget timer</div>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  props: {
    text: {
      type: String,
      default: 'Schedule',
    },
    Icon_src: {
      type: String,
      default: '/playground_assets/pastedimage-fii6m-200h.png',
    },
    Icon_alt: {
      type: String,
      default: 'pastedImage',
    },
    text1: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
  },
}
</script>

<style scoped>
.schedule-schedule {
  position: relative;
}
.schedule-icon {
  width: 32px;
  height: 30px;
  margin-bottom: 24px;
}
.schedule-text {
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  margin-bottom: 16px;
}
.schedule-text1 {
  line-height: 24px;
}
@media(max-width: 767px) {
  .schedule-schedule {
    margin-right: 0px;
    margin-bottom: var(--dl-space-space-twounits);
  }
}
</style>
