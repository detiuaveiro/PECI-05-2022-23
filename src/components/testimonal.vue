<template>
  <div class="testimonal-testimonal testimonal">
    <div class="testimonal-author">
      <div class="testimonal-avatar">
        <img :alt="Avatar_alt" :src="Avatar_src" class="testimonal-image" />
      </div>
      <div class="testimonal-user">
        <span class="testimonal-name">{{ Name }}</span>
        <span class="testimonal-divider">—</span>
        <span class="testimonal-from">{{ From }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Testimonal',
  props: {
    From: {
      type: String,
      default: 'Vista Social',
    },
    Avatar_alt: {
      type: String,
      default: 'image',
    },
    Avatar_src: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDV8fGdpcmx8ZW58MHx8fHwxNjY0ODA5MjE1&ixlib=rb-1.2.1&w=200',
    },
    Name: {
      type: String,
      default: 'Andy Smith',
    },
  },
}
</script>

<style scoped>
.testimonal-testimonal {
  position: relative;
  padding-top: var(--dl-space-space-threeunits);
}
.testimonal-author {
  gap: var(--dl-space-space-unit);
  display: flex;
  margin-top: 0px;
  align-items: center;
  flex-direction: row;
}
.testimonal-avatar {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.testimonal-image {
  width: 70px;
  height: 70px;
  display: flex;
  object-fit: cover;
  border-radius: 50%;
}
.testimonal-user {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.testimonal-name {
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
}
.testimonal-divider {
  margin-left: var(--dl-space-space-halfunit);
  margin-right: var(--dl-space-space-halfunit);
}
.testimonal-from {
  color: rgb(0, 0, 0);
}
@media(max-width: 767px) {
  .testimonal-image {
    width: 28px;
    height: 28px;
  }
  .testimonal-name {
    font-size: 14px;
  }
  .testimonal-from {
    font-size: 14px;
  }
}
</style>
