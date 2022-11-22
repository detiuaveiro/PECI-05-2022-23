<template>
  <div class="card-card" v-bind:class="rootClassName">
    <span class="card-text">{{ text }}</span>
    <span class="card-text01">
      <span>Unlimited sandbox testing and</span>
      <br class="card-text03" />
      <br />
      <span>production access for up to 25</span>
      <br class="card-text06" />
      <br />
      <span>connected businesses for life.</span>
    </span>
    <div class="card-get-started">
      <span class="card-text09">{{ text2 }}</span>
    </div>
    <span class="card-text10">{{ text1 }}</span>
    <div class="card-bullet-points">
      <div class="card-point">
        <svg viewBox="0 0 877.7142857142857 1024" class="card-icon">
          <path
            d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"
          ></path>
        </svg>
        <span class="card-text11">{{ text3 }}</span>
      </div>
      <div class="card-point1">
        <svg viewBox="0 0 877.7142857142857 1024" class="card-icon2">
          <path
            d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"
          ></path>
        </svg>
        <span class="card-text12">{{ text4 }}</span>
      </div>
      <div class="card-point2">
        <svg viewBox="0 0 877.7142857142857 1024" class="card-icon4">
          <path
            d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"
          ></path>
        </svg>
        <span class="card-text13">{{ text5 }}</span>
      </div>
      <div class="card-point3">
        <svg viewBox="0 0 877.7142857142857 1024" class="card-icon6">
          <path
            d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"
          ></path>
        </svg>
        <span class="card-text14">{{ text6 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    text1: {
      type: String,
      default: "What's included",
    },
    text3: {
      type: String,
      default: 'Sed ut pespiciatis unde omnis',
    },
    text5: {
      type: String,
      default: 'Sed ut pespiciatis unde omnis',
    },
    text: {
      type: String,
      default: 'Pay as you go',
    },
    text6: {
      type: String,
      default: 'Sed ut pespiciatis unde omnis',
    },
    text2: {
      type: String,
      default: 'Start for free',
    },
    rootClassName: String,
    text4: {
      type: String,
      default: 'Sed ut pespiciatis unde omnis',
    },
  },
}
</script>

<style scoped>
.card-card {
  flex: 1;
  height: 100%;
  display: flex;
  position: relative;
  align-items: flex-start;
  padding-top: var(--dl-space-space-fiveunits);
  padding-left: 40px;
  border-radius: 50px;
  padding-right: 40px;
  flex-direction: column;
  padding-bottom: var(--dl-space-space-fiveunits);
  justify-content: flex-start;
  background-color: #ffffff;
}
.card-text {
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 23px;
}
.card-text01 {
  color: rgb(0, 0, 0);
  line-height: 24px;
  margin-bottom: 67px;
}
.card-text03 {
  color: #000000;
}
.card-text06 {
  color: #000000;
}
.card-get-started {
  color: white;
  cursor: pointer;
  display: flex;
  transition: 0.3s;
  align-items: center;
  padding-top: 18px;
  padding-left: 32px;
  border-radius: 56px;
  margin-bottom: 40px;
  padding-right: 32px;
  flex-direction: column;
  padding-bottom: 18px;
  background-color: #000000;
}
.card-get-started:hover {
  color: black;
  background-color: #ffffff;
}
.card-text09 {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
}
.card-text10 {
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 23px;
}
.card-bullet-points {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.card-point {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  flex-direction: row;
}
.card-icon {
  fill: #5228F5;
  width: 8px;
  height: 8px;
}
.card-text11 {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-left: 8px;
}
.card-point1 {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  flex-direction: row;
}
.card-icon2 {
  fill: #5228F5;
  width: 8px;
  height: 8px;
}
.card-text12 {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-left: 8px;
}
.card-point2 {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  flex-direction: row;
}
.card-icon4 {
  fill: #5228F5;
  width: 8px;
  height: 8px;
}
.card-text13 {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-left: 8px;
}
.card-point3 {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  flex-direction: row;
}
.card-icon6 {
  fill: #5228F5;
  width: 8px;
  height: 8px;
}
.card-text14 {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-left: 8px;
}
@media(max-width: 991px) {
  .card-card {
    width: 100%;
    align-items: flex-start;
  }
}
</style>
