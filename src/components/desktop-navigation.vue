<template>
  <div class="desktop-navigation-desktop-navigation">
    <nav class="desktop-navigation-centered">
      <div class="desktop-navigation-left">
        <div class="desktop-navigation-links">
          <h1 class="desktop-navigation-text">{{ heading }}</h1>
          <span class="desktop-navigation-text1 Link">{{ text }}</span>
          <span class="desktop-navigation-text2 Link">{{ text1 }}</span>
          <span class="desktop-navigation-text3 Link">{{ text2 }}</span>
        </div>
      </div>
      <div class="desktop-navigation-right">
        <div id="open-mobile-menu" class="desktop-navigation-burger-menu">
          <img
            :alt="Mobile_Menu_Button_alt"
            :src="Mobile_Menu_Button_src"
            class="desktop-navigation-mobile-menu-button"
          />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'DesktopNavigation',
  props: {
    text2: {
      type: String,
      default: 'Prices',
    },
    text: {
      type: String,
      default: 'Solutions',
    },
    Mobile_Menu_Button_alt: {
      type: String,
      default: 'pastedImage',
    },
    text1: {
      type: String,
      default: 'How it works',
    },
    heading: {
      type: String,
      default: 'Heading',
    },
    Mobile_Menu_Button_src: {
      type: String,
      default: '/playground_assets/pastedimage-yxbd.svg',
    },
  },
}
</script>

<style scoped>
.desktop-navigation-desktop-navigation {
  width: 100%;
  display: flex;
  position: relative;
  margin-top: var(--dl-space-space-oneandhalfunits);
  align-items: center;
  flex-direction: column;
}
.desktop-navigation-centered {
  width: 100%;
  display: flex;
  max-width: 1200px;
  box-sizing: initial;
  align-items: center;
  padding-left: var(--dl-space-space-oneandhalfunits);
  border-radius: 50px;
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: row;
  justify-content: space-between;
  background-color: #ffffff;
}
.desktop-navigation-left {
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 38px;
  flex-direction: row;
  padding-bottom: 38px;
}
.desktop-navigation-links {
  display: flex;
  align-items: center;
  margin-left: 33px;
  flex-direction: row;
}
.desktop-navigation-text {
  color: #7cc444;
  font-size: 2.3rem;
  margin-right: var(--dl-space-space-fourunits);
}
.desktop-navigation-text1 {
  color: var(--dl-color-gray-500);
  font-size: 20px;
}
.desktop-navigation-text2 {
  color: var(--dl-color-gray-500);
  font-size: 20px;
}
.desktop-navigation-text3 {
  color: var(--dl-color-gray-500);
  font-size: 20px;
}
.desktop-navigation-right {
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: var(--dl-space-space-oneandhalfunits);
  flex-direction: row;
  padding-bottom: var(--dl-space-space-oneandhalfunits);
}
.desktop-navigation-burger-menu {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.desktop-navigation-mobile-menu-button {
  width: 40px;
  height: 40px;
  display: none;
}
@media(max-width: 991px) {
  .desktop-navigation-desktop-navigation {
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }
  .desktop-navigation-centered {
    height: 60px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .desktop-navigation-left {
    margin-left: var(--dl-space-space-halfunit);
  }
  .desktop-navigation-links {
    display: none;
  }
  .desktop-navigation-mobile-menu-button {
    display: flex;
  }
}
@media(max-width: 767px) {
  .desktop-navigation-desktop-navigation {
    padding-left: 0px;
    padding-right: 0px;
  }
  .desktop-navigation-centered {
    padding-left: 0px;
    padding-right: 0px;
  }
  .desktop-navigation-left {
    margin-left: var(--dl-space-space-unit);
  }
  .desktop-navigation-right {
    margin-right: var(--dl-space-space-unit);
  }
}
</style>
