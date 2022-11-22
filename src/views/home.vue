<template>
  <div class="home-container">
    <section class="home-hero">
      <div class="home-menu">
        <div id="mobile-menu" class="home-mobile-navigation">
          <img
            alt="pastedImage"
            src="/playground_assets/pastedimage-no9b-1500h.png"
            class="home-logo"
          />
          <div class="home-links">
            <span class="Link">Solutions</span>
            <span class="Link">How it works</span>
            <span class="Link">Prices</span>
          </div>
          <div id="close-mobile-menu" class="home-close-mobile-menu">
            <svg viewBox="0 0 804.5714285714286 1024" class="home-icon">
              <path
                d="M741.714 755.429c0 14.286-5.714 28.571-16 38.857l-77.714 77.714c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-168-168-168 168c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-77.714-77.714c-10.286-10.286-16-24.571-16-38.857s5.714-28.571 16-38.857l168-168-168-168c-10.286-10.286-16-24.571-16-38.857s5.714-28.571 16-38.857l77.714-77.714c10.286-10.286 24.571-16 38.857-16s28.571 5.714 38.857 16l168 168 168-168c10.286-10.286 24.571-16 38.857-16s28.571 5.714 38.857 16l77.714 77.714c10.286 10.286 16 24.571 16 38.857s-5.714 28.571-16 38.857l-168 168 168 168c10.286 10.286 16 24.571 16 38.857z"
              ></path>
            </svg>
          </div>
        </div>
        <desktop-navigation text2="Docs" heading="P4Mon"></desktop-navigation>
        <div>
          <DangerousHTML
            html="<script>
  /*
  Mobile menu - Code Embed
  */
  
  // Mobile menu
  const mobileMenu = document.querySelector('#mobile-menu')
  
  // Buttons
  const closeButton = document.querySelector('#close-mobile-menu')
  const openButton = document.querySelector('#open-mobile-menu')
  
  // On openButton click, set the mobileMenu position left to -100vw
  openButton.addEventListener('click', function() {
      mobileMenu.style.transform = 'translateX(0%)'
  })
  
  // On closeButton click, set the mobileMenu position to 0vw
  closeButton.addEventListener('click', function() {
      mobileMenu.style.transform = 'translateX(100%)'
  })
  </script>"
          ></DangerousHTML>
        </div>
      </div>
      <header class="home-header">
        <h1 class="home-text03">SDN Monitoring System</h1>
        <p class="home-text04">
          Monitor and manage your SDN from one place,  in any place, easily.
        </p>
        <div class="home-get-started">
          <span class="home-text05">Get started</span>
        </div>
      </header>
      <div class="home-dashboard-preview">
        <div class="home-outline">
          <img
            alt="pastedImage"
            src="/playground_assets/pastedimage-cdo-1000h.png"
            loading="lazy"
            class="home-image"
          />
        </div>
      </div>
    </section>
    <section class="home-features">
      <div class="home-title">
        <span class="home-text06">Be aware of your network all the time</span>
        <span class="home-text07">
          We provide an opportunity to know what is happening in your network
          devices.
        </span>
      </div>
      <div class="home-cards">
        <div class="home-container1">
          <div class="card">
            <img
              alt="pastedImage"
              src="/playground_assets/pastedimage-fii6m-200h.png"
              class="home-icon2"
            />
            <span class="home-text08">Monitor network devices</span>
            <span class="home-text09">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </span>
          </div>
          <div class="home-publish card">
            <img
              alt="pastedImage"
              src="/playground_assets/pastedimage-mimg-200h.png"
              class="home-icon3"
            />
            <span class="home-text10">Manage topology</span>
            <span class="home-text11">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedr
            </span>
          </div>
        </div>
        <div class="home-container2">
          <div class="card home-analyze">
            <img
              alt="pastedImage"
              src="/playground_assets/pastedimage-l6p-200h.png"
              class="home-icon4"
            />
            <span class="home-text12">Reactive network</span>
            <span class="home-text13">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </span>
          </div>
          <div class="card">
            <img
              alt="pastedImage"
              src="/playground_assets/pastedimage-vyi5-200h.png"
              class="home-icon5"
            />
            <span class="home-text14">Get leads</span>
            <span class="home-text15">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </span>
          </div>
        </div>
      </div>
    </section>
    <section class="home-quote-container">
      <div class="home-quote">
        <span class="home-message">
          “Scale your content, grew lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.”
        </span>
        <div class="home-author">
          <img
            alt="image"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDV8fGdpcmx8ZW58MHx8fHwxNjY0ODA5MjE1&amp;ixlib=rb-1.2.1&amp;w=200"
            class="home-avatar"
          />
          <span class="home-quote1">
            <span class="home-text16">—  Peter McPau</span>
            <span>, Founder and CEO, Active</span>
          </span>
        </div>
      </div>
    </section>
    <section class="home-banners">
      <div class="home-banner-advanced-analytics">
        <div class="home-centered-container">
          <div class="home-image-container">
            <img
              alt="pastedImage"
              src="/playground_assets/test.svg"
              class="home-cards-image"
            />
          </div>
          <div class="home-right">
            <span class="sub-title">
              Reporting Metrics
              <span v-html="rawdh1f"></span>
            </span>
            <h2 class="home-text19 title">
              Advanced analytics, easy to understand.
            </h2>
            <div class="home-category">
              <span class="home-text20">Power reports</span>
              <span class="home-text21">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. vv
              </span>
              <span class="home-text22">Example -&gt;</span>
            </div>
            <div class="home-category1">
              <span class="home-text23">Power reports</span>
              <span class="home-text24">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. vv
              </span>
              <span class="home-text25">Example -&gt;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="home-banner">
        <div class="home-container3">
          <div class="home-left">
            <span class="home-text26">Improve Scheduling</span>
            <h2 class="home-text27 title">
              Powerful scheduler that saves you time
            </h2>
            <span class="home-text28">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. vv
            </span>
            <div class="home-get-started1 template-button">
              <span class="home-text29">Get started</span>
            </div>
          </div>
          <div class="home-image-container1">
            <img
              alt="pastedImage"
              src="/playground_assets/83d913a38a75e38d7cef4fea757ed7ed-1200w.png"
              class="home-cards-image1"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="home-integrations">
      <div class="home-centered-container1">
        <div class="home-heading">
          <span class="sub-title">Integrations</span>
          <span class="title">Integrated with the tools you know and love</span>
          <span class="home-text32">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. vv
          </span>
        </div>
        <div class="home-pills-container">
          <div class="home-pills">
            <div class="home-container4">
              <you-tube></you-tube>
              <you-tube
                pastedImage_src="/playground_assets/group%201012-200h.png"
              ></you-tube>
              <you-tube
                pastedImage_src="/playground_assets/layer1-200h.png"
              ></you-tube>
              <you-tube
                pastedImage_src="/playground_assets/group-200h.png"
              ></you-tube>
            </div>
            <div class="home-container5">
              <you-tube
                pastedImage_src="/playground_assets/pinterest%20logo-200h.png"
              ></you-tube>
              <you-tube
                pastedImage_src="/playground_assets/group%201014-200h.png"
              ></you-tube>
              <you-tube
                pastedImage_src="/playground_assets/group%201015-200h.png"
              ></you-tube>
              <you-tube
                pastedImage_src="/playground_assets/group%201017-200h.png"
              ></you-tube>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="home-how-it-works">
      <div class="home-centered-container2">
        <div class="home-heading1">
          <span class="home-text33">How it works</span>
          <span class="home-text34 title">
            Being social and getting leads has never been easier
          </span>
        </div>
        <div class="home-category2">
          <div class="home-headng">
            <span class="home-text35">
              1 — Sign up
              <span v-html="rawez3o"></span>
            </span>
            <span class="home-text36">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. vv
            </span>
            <div class="home-get-started2 template-button">
              <span class="home-text37">Get started</span>
            </div>
          </div>
          <div class="home-container6">
            <img
              alt="pastedImage"
              src="/playground_assets/pastedimage-k5xi.svg"
              class="home-pasted-image"
            />
          </div>
        </div>
        <div class="home-row">
          <div class="home-category3">
            <div class="home-headng1">
              <span class="home-text38">2 — Act</span>
              <span class="home-text39">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. vv
              </span>
            </div>
            <img
              alt="pastedImage"
              src="/playground_assets/pastedimage-ibg-1200w.png"
              class="home-pasted-image1"
            />
          </div>
          <div class="home-category4">
            <div class="home-headng2">
              <span class="home-text40">2 — Act</span>
              <span class="home-text41">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. vv
              </span>
            </div>
            <img
              alt="pastedImage"
              src="/playground_assets/pastedimage-3c4o-1200w.png"
              class="home-pasted-image2"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="home-testimonals">
      <div class="home-left1">
        <span class="home-text42">Team</span>
        <span class="home-text43 title">
          <span class="home-text44">
            P4Mon
            <span v-html="rawi8yz"></span>
          </span>
          <br />
          <span>begun as a college project</span>
          <br />
        </span>
      </div>
      <div class="home-right1">
        <div class="home-column">
          <app-testimonal
            Quote='"Pellentesque sodales libero nulla, ac imperdiet ante tincidunt vel. Fusce auctor augue sed massa finibus, et dictum sem mollis. In luctus.”'
            Avatar_src="/playground_assets/image552912-e3yq-200h.png"
          ></app-testimonal>
          <app-testimonal
            From="Social Club"
            name="Jessica Smith"
            Quote="“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.  Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.”"
            Avatar_src="/playground_assets/image312912-mvsg-200h.png"
          ></app-testimonal>
          <app-testimonal
            From="BeMe"
            name="Logan Boy"
            Quote="“Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo..”"
            Avatar_src="/playground_assets/image502912-6wy-200h.png"
          ></app-testimonal>
          <app-testimonal
            From="Hello W."
            name="Laraine Summers"
            Quote="“Rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.”"
            Avatar_src="/playground_assets/image202912-zekh-200h.png"
          ></app-testimonal>
        </div>
        <div class="home-column1">
          <app-testimonal
            From="Handsly"
            name="William McPau"
            Quote='"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”'
            Avatar_src="/playground_assets/image572912-0d3-200h.png"
          ></app-testimonal>
          <app-testimonal
            From="Share"
            name="Mariah Mae"
            Quote="“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.”"
            Avatar_src="/playground_assets/image632913-swij-200h.png"
          ></app-testimonal>
          <app-testimonal
            From="Gather"
            name="John Finati"
            Quote='"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”'
            Avatar_src="/playground_assets/image102913-x4z8-200h.png"
          ></app-testimonal>
          <app-testimonal
            From="Zigo"
            name="Mary Pau"
            Quote='"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ”'
            Avatar_src="/playground_assets/image562913-ycff-200h.png"
          ></app-testimonal>
        </div>
      </div>
      <span class="home-text48">
        <span>Show more</span>
        <br />
      </span>
    </section>
    <footer class="home-footer">
      <div class="home-top">
        <div class="home-contact">
          <span class="home-text51">Contact</span>
          <a href="mailto:use@active-app.com?subject=Support" class="home-link">
            use@active-app.com
          </a>
        </div>
        <div class="home-right2">
          <div class="home-category5">
            <span class="home-text52">Solutions</span>
            <div class="home-links1">
              <span class="home-text53">Responsive Web Design</span>
              <span class="home-text54">Responsive Prototypesv</span>
              <span class="home-text55">Design to Code</span>
              <span class="home-text56">Static Website Builder</span>
              <span class="home-text57">Static Website Generator</span>
            </div>
          </div>
          <div class="home-category6">
            <span class="home-text58">Company</span>
            <div class="home-links2">
              <span class="home-text59">About</span>
              <span class="home-text60">Team</span>
              <span class="home-text61">News</span>
              <span class="home-text62">Partners</span>
              <span class="home-text63">Careers</span>
              <span class="home-text64">Press &amp; Media</span>
            </div>
          </div>
          <div class="home-category7">
            <span class="home-text65">Solutions</span>
            <div class="home-links3">
              <span class="home-text66">Twitter</span>
              <span class="home-text67">Linkedin</span>
              <span class="home-text68">Crunchbase</span>
              <span class="home-text69">Instagram</span>
              <span class="home-text70">Facebook</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import DangerousHTML from 'dangerous-html/vue'

import DesktopNavigation from '../components/desktop-navigation'
import YouTube from '../components/you-tube'
import AppTestimonal from '../components/testimonal'

export default {
  name: 'Home',
  components: {
    DesktopNavigation,
    DangerousHTML,
    YouTube,
    AppTestimonal,
  },

  data() {
    return {
      rawdh1f: ' ',
      rawez3o: ' ',
      rawi8yz: ' ',
    }
  },

  metaInfo: {
    title: 'Active Online Software Page',
    meta: [
      {
        property: 'og:title',
        content: 'Active Online Software Page',
      },
    ],
  },
}
</script>

<style scoped>
.home-container {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  overflow-x: hidden;
  flex-direction: column;
}
.home-hero {
  width: 100%;
  height: 1000px;
  display: flex;
  align-items: center;
  padding-top: var(--dl-space-space-oneandhalfunits);
  padding-left: var(--dl-space-space-sevenunits);
  padding-right: var(--dl-space-space-sevenunits);
  flex-direction: column;
  background-color: var(--dl-color-template-blue-bg);
}
.home-menu {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.home-mobile-navigation {
  top: 0px;
  flex: 0 0 auto;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 150;
  position: fixed;
  transform: translateX(100%);
  transition: transform 0.3s;
  align-items: flex-start;
  padding-top: var(--dl-space-space-twounits);
  padding-left: var(--dl-space-space-oneandhalfunits);
  padding-right: var(--dl-space-space-oneandhalfunits);
  flex-direction: column;
  background-color: var(--dl-color-gray-white);
}
.home-logo {
  width: 64px;
}
.home-links {
  gap: var(--dl-space-space-twounits);
  display: flex;
  margin-top: var(--dl-space-space-twounits);
  align-items: flex-start;
  flex-direction: column;
}
.home-close-mobile-menu {
  top: var(--dl-space-space-oneandhalfunits);
  right: var(--dl-space-space-oneandhalfunits);
  width: var(--dl-size-size-small);
  height: var(--dl-size-size-small);
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.home-icon {
  width: 24px;
  height: 24px;
  display: flex;
}
.home-header {
  display: flex;
  margin-top: 140px;
  align-items: center;
  flex-direction: column;
}
.home-text03 {
  color: rgb(255, 255, 255);
  font-size: 72px;
  font-style: normal;
  text-align: center;
  font-weight: 700;
  line-height: 80px;
}
.home-text04 {
  color: rgb(238, 233, 254);
  font-size: 20px;
  max-width: 600px;
  margin-top: 16px;
  text-align: center;
  line-height: 30px;
}
.home-get-started {
  color: white;
  cursor: pointer;
  display: flex;
  margin-top: 40px;
  transition: 0.3s;
  align-items: center;
  padding-top: var(--dl-space-space-unit);
  padding-left: var(--dl-space-space-twounits);
  border-radius: 56px;
  padding-right: var(--dl-space-space-twounits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-unit);
  background-color: #000000;
}
.home-get-started:hover {
  color: black;
  background-color: #ffffff;
}
.home-text05 {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
}
.home-dashboard-preview {
  top: 650px;
  display: flex;
  position: absolute;
  align-items: center;
  border-color: #633df6;
  border-width: 30px;
  border-radius: 100px;
  flex-direction: column;
  background-color: var(--dl-color-template-blue-bg);
}
.home-outline {
  display: flex;
  align-items: center;
  border-color: #7350f7;
  border-width: 20px;
  border-radius: 70px;
  flex-direction: column;
  background-color: #7350f7;
}
.home-image {
  width: 900px;
  z-index: 10;
  user-select: none;
}
.home-features {
  width: 100%;
  display: flex;
  z-index: 1;
  align-items: center;
  padding-top: 400px;
  padding-left: var(--dl-space-space-sevenunits);
  padding-right: var(--dl-space-space-sevenunits);
  flex-direction: column;
  background-color: EFF0F2;
}
.home-title {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.home-text06 {
  font-size: 56px;
  font-style: normal;
  text-align: center;
  font-weight: 700;
  line-height: 72px;
}
.home-text07 {
  font-size: 20px;
  margin-top: 16px;
  text-align: center;
  line-height: 30px;
}
.home-cards {
  width: 100%;
  display: flex;
  max-width: 1200px;
  margin-top: 80px;
  align-items: center;
  flex-direction: column;
}
.home-container1 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: var(--dl-space-space-twounits);
  flex-direction: row;
}
.home-icon2 {
  width: 32px;
  height: 30px;
  margin-bottom: var(--dl-space-space-oneandhalfunits);
}
.home-text08 {
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  margin-bottom: var(--dl-space-space-unit);
}
.home-text09 {
  line-height: 24px;
}
.home-publish {
  height: initial;
}
.home-icon3 {
  width: 30px;
  height: 30px;
  margin-bottom: var(--dl-space-space-oneandhalfunits);
}
.home-text10 {
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  margin-bottom: var(--dl-space-space-unit);
}
.home-text11 {
  line-height: 24px;
}
.home-container2 {
  gap: var(--dl-space-space-twounits);
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: var(--dl-space-space-sixunits);
  flex-direction: row;
}
.home-icon4 {
  width: 35px;
  height: 30px;
  margin-bottom: var(--dl-space-space-oneandhalfunits);
}
.home-text12 {
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  margin-bottom: 16px;
}
.home-text13 {
  line-height: 24px;
}
.home-icon5 {
  width: 30px;
  height: 30px;
  margin-bottom: var(--dl-space-space-oneandhalfunits);
}
.home-text14 {
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  margin-bottom: var(--dl-space-space-unit);
}
.home-text15 {
  line-height: 24px;
}
.home-quote-container {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 160px;
  padding-left: var(--dl-space-space-sevenunits);
  padding-right: var(--dl-space-space-sevenunits);
  flex-direction: column;
  padding-bottom: 160px;
  justify-content: center;
  background-color: #000000;
}
.home-quote {
  width: 100%;
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  justify-content: center;
}
.home-message {
  color: rgb(255, 255, 255);
  font-size: 40px;
  max-width: 800px;
  line-height: 52px;
}
.home-author {
  width: 800px;
  display: flex;
  margin-top: var(--dl-space-space-oneandhalfunits);
  align-items: center;
  flex-direction: row;
}
.home-avatar {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
}
.home-quote1 {
  color: rgb(151, 126, 249);
  width: 100%;
  max-width: 800px;
  margin-left: var(--dl-space-space-unit);
}
.home-text16 {
  font-style: normal;
  font-weight: 600;
}
.home-banners {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.home-banner-advanced-analytics {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: var(--dl-space-space-sixunits);
  padding-left: var(--dl-space-space-sevenunits);
  padding-right: var(--dl-space-space-sevenunits);
  flex-direction: row;
  padding-bottom: var(--dl-space-space-sixunits);
  justify-content: center;
  background-color: #EFF0F2;
}
.home-centered-container {
  width: 100%;
  display: flex;
  max-width: 1200px;
  align-items: center;
  justify-content: center;
}
.home-image-container {
  flex: 1;
  display: flex;
}
.home-cards-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.home-right {
  flex: 1;
  display: flex;
  margin-left: var(--dl-space-space-fourunits);
  flex-direction: column;
}
.home-text19 {
  text-align: left;
}
.home-category {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--dl-space-space-twounits);
  flex-direction: column;
}
.home-text20 {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: var(--dl-space-space-halfunit);
}
.home-text21 {
  color: rgb(0, 0, 0);
  line-height: 24px;
  margin-bottom: var(--dl-space-space-oneandhalfunits);
}
.home-text22 {
  color: #5228F5;
  cursor: pointer;
  font-style: normal;
  transition: 0.3s;
  font-weight: 600;
}
.home-text22:hover {
  color: #000000;
}
.home-category1 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-text23 {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: var(--dl-space-space-halfunit);
}
.home-text24 {
  color: rgb(0, 0, 0);
  line-height: 24px;
  margin-bottom: var(--dl-space-space-oneandhalfunits);
}
.home-text25 {
  color: #5228F5;
  cursor: pointer;
  font-style: normal;
  transition: 0.3s;
  font-weight: 600;
}
.home-text25:hover {
  color: #000000;
}
.home-banner {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: var(--dl-space-space-sixunits);
  padding-left: var(--dl-space-space-sevenunits);
  padding-right: var(--dl-space-space-sevenunits);
  flex-direction: row;
  padding-bottom: var(--dl-space-space-sixunits);
  justify-content: center;
}
.home-container3 {
  width: 100%;
  display: flex;
  max-width: 1200px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
.home-left {
  flex: 1;
  display: flex;
  align-items: flex-start;
  margin-right: var(--dl-space-space-fourunits);
  flex-direction: column;
}
.home-text26 {
  color: rgb(82, 40, 245);
  font-style: normal;
  font-weight: 600;
  margin-bottom: 24px;
}
.home-text27 {
  text-align: left;
}
.home-text28 {
  color: rgb(0, 0, 0);
  line-height: 24px;
  margin-bottom: var(--dl-space-space-threeunits);
}
.home-get-started1 {
  transition: 0.3s;
  margin-bottom: 0;
}
.home-get-started1:hover {
  color: var(--dl-color-gray-white);
  background-color: var(--dl-color-template-blue-bg);
}
.home-text29 {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
}
.home-image-container1 {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
.home-cards-image1 {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.home-integrations {
  width: 100%;
  display: flex;
  padding: var(--dl-space-space-sevenunits);
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #EFF0F2;
}
.home-centered-container1 {
  width: 100%;
  display: flex;
  max-width: 1200px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.home-heading {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.home-text32 {
  color: rgb(0, 0, 0);
  text-align: center;
  margin-bottom: var(--dl-space-space-fiveunits);
}
.home-pills-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.home-pills {
  width: 100%;
  display: flex;
  grid-gap: var(--dl-space-space-twounits);
  flex-wrap: wrap;
  margin-bottom: var(--dl-space-space-threeunits);
  flex-direction: row;
  justify-content: center;
}
.home-container4 {
  gap: var(--dl-space-space-twounits);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
.home-container5 {
  gap: var(--dl-space-space-twounits);
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--dl-space-space-fiveunits);
  flex-direction: row;
  justify-content: center;
}
.home-how-it-works {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: var(--dl-space-space-sixunits);
  padding-left: var(--dl-space-space-sevenunits);
  padding-right: var(--dl-space-space-sevenunits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-sixunits);
  background-color: #211062;
}
.home-centered-container2 {
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 1200px;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;
}
.home-heading1 {
  display: flex;
  align-items: center;
  margin-bottom: var(--dl-space-space-fiveunits);
  flex-direction: column;
}
.home-text33 {
  color: rgb(220, 212, 253);
  font-style: normal;
  font-weight: 600;
  margin-bottom: 24px;
}
.home-text34 {
  color: var(--dl-color-gray-white);
}
.home-category2 {
  color: white;
  width: 100%;
  display: flex;
  overflow: hidden;
  padding-left: var(--dl-space-space-fourunits);
  border-radius: 50px;
  margin-bottom: var(--dl-space-space-threeunits);
  flex-direction: row;
  background-color: var(--dl-color-template-blue-bg);
}
.home-headng {
  flex: 1;
  display: flex;
  align-items: flex-start;
  padding-top: var(--dl-space-space-threeunits);
  margin-right: var(--dl-space-space-fourunits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-threeunits);
  justify-content: center;
}
.home-text35 {
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 16px;
}
.home-text36 {
  color: #EEE9FE;
  line-height: 24px;
  margin-bottom: 40px;
}
.home-get-started2 {
  margin-bottom: 0px;
}
.home-get-started2:hover {
  color: black;
  background-color: #ffffff;
}
.home-text37 {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
}
.home-container6 {
  flex: 1;
  height: 100%;
  display: flex;
  align-self: flex-end;
  flex-direction: row;
}
.home-pasted-image {
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.home-row {
  display: flex;
  grid-gap: var(--dl-space-space-threeunits);
  align-items: center;
  flex-direction: row;
}
.home-category3 {
  flex: 1;
  color: white;
  height: 555px;
  display: flex;
  overflow: hidden;
  align-items: flex-end;
  border-radius: 50px;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
}
.home-headng1 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-top: var(--dl-space-space-fourunits);
  padding-left: var(--dl-space-space-fourunits);
  padding-right: var(--dl-space-space-fourunits);
  flex-direction: column;
  padding-bottom: 0px;
}
.home-text38 {
  color: rgb(0, 0, 0);
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 16px;
}
.home-text39 {
  color: #1E1E1E;
  line-height: 24px;
}
.home-pasted-image1 {
  width: 100%;
}
.home-category4 {
  flex: 1;
  color: white;
  height: 555px;
  display: flex;
  overflow: hidden;
  align-items: flex-end;
  border-radius: 50px;
  flex-direction: column;
  justify-content: space-between;
  background-color: #000000;
}
.home-headng2 {
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-top: var(--dl-space-space-fourunits);
  padding-left: var(--dl-space-space-fourunits);
  padding-right: var(--dl-space-space-fourunits);
  flex-direction: column;
  padding-bottom: 0px;
}
.home-text40 {
  color: #ffffff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 16px;
}
.home-text41 {
  color: rgb(238, 233, 254);
  line-height: 24px;
}
.home-pasted-image2 {
  width: 100%;
  object-fit: contain;
}
.home-testimonals {
  width: 100%;
  display: flex;
  padding-top: var(--dl-space-space-sixunits);
  padding-left: var(--dl-space-space-sevenunits);
  padding-right: var(--dl-space-space-sevenunits);
  flex-direction: row;
  padding-bottom: var(--dl-space-space-sixunits);
  justify-content: center;
}
.home-left1 {
  width: 375px;
  display: flex;
  align-self: center;
  margin-top: 0px;
  align-items: flex-start;
  margin-right: var(--dl-space-space-threeunits);
  flex-direction: column;
}
.home-text42 {
  color: rgb(82, 40, 245);
  font-style: normal;
  font-weight: 600;
  margin-bottom: 24px;
}
.home-text43 {
  text-align: left;
}
.home-text44 {
  text-align: left;
}
.home-right1 {
  gap: 40px;
  display: flex;
  flex-direction: row;
}
.home-column {
  gap: 40px;
  display: flex;
  flex-direction: column;
}
.home-column1 {
  gap: 40px;
  display: flex;
  flex-direction: column;
}
.home-text48 {
  cursor: pointer;
  display: none;
}
.home-footer {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: var(--dl-space-space-sevenunits);
  padding-left: var(--dl-space-space-sevenunits);
  padding-right: var(--dl-space-space-sevenunits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-sevenunits);
  background-color: #000000;
}
.home-top {
  width: 100%;
  display: flex;
  max-width: 1200px;
  border-color: #3B3B3B;
  flex-direction: column;
  padding-bottom: var(--dl-space-space-fiveunits);
  justify-content: space-between;
  border-bottom-width: 1px;
}
.home-contact {
  display: flex;
  margin-top: 52px;
  align-items: flex-start;
  flex-direction: column;
}
.home-text51 {
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: var(--dl-space-space-unit);
}
.home-link {
  color: #C4C4C4;
  font-size: 14px;
  text-decoration: underline;
}
.home-right2 {
  gap: var(--dl-space-space-fiveunits);
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--dl-space-space-threeunits);
  flex-direction: row;
  justify-content: flex-start;
}
.home-category5 {
  width: 240px;
  display: flex;
  align-items: stretch;
  flex-direction: column;
}
.home-text52 {
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: var(--dl-space-space-unit);
}
.home-links1 {
  gap: var(--dl-space-space-unit);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-text53 {
  color: rgb(196, 196, 196);
  cursor: pointer;
  font-size: 14px;
}
.home-text54 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text55 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text56 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text57 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-category6 {
  width: 240px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-text58 {
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: var(--dl-space-space-unit);
}
.home-links2 {
  gap: var(--dl-space-space-unit);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-text59 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text60 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text61 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text62 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text63 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text64 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-category7 {
  width: 240px;
  display: flex;
  flex-direction: column;
}
.home-text65 {
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: var(--dl-space-space-unit);
}
.home-links3 {
  gap: var(--dl-space-space-unit);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.home-text66 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text67 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text68 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text69 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
.home-text70 {
  color: rgb(196, 196, 196);
  font-size: 14px;
}
@media(max-width: 991px) {
  .home-hero {
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }
  .home-close-mobile-menu {
    align-items: center;
    justify-content: center;
  }
  .home-header {
    width: 100%;
    max-width: 1200px;
  }
  .home-image {
    width: 100%;
  }
  .home-features {
    padding-top: 260px;
  }
  .home-title {
    width: 100%;
    max-width: 1200px;
  }
  .home-text06 {
    font-size: 36px;
    line-height: 40px;
  }
  .home-text07 {
    font-size: 20px;
    margin-top: var(--dl-space-space-unit);
    line-height: 30px;
  }
  .home-cards {
    margin-top: var(--dl-space-space-fiveunits);
  }
  .home-text09 {
    line-height: 21px;
  }
  .home-text11 {
    line-height: 21px;
  }
  .home-text13 {
    line-height: 21px;
  }
  .home-text14 {
    font-size: 24px;
  }
  .home-text15 {
    line-height: 21px;
  }
  .home-quote-container {
    padding-top: var(--dl-space-space-sevenunits);
    padding-bottom: var(--dl-space-space-sevenunits);
  }
  .home-message {
    width: 100%;
    max-width: 800px;
  }
  .home-author {
    width: 100%;
    max-width: 800px;
  }
  .home-banner-advanced-analytics {
    padding-top: var(--dl-space-space-fourunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-fourunits);
  }
  .home-container5 {
    margin-left: 0px;
  }
  .home-category2 {
    padding-left: 0px;
    margin-bottom: var(--dl-space-space-threeunits);
    flex-direction: column;
  }
  .home-headng {
    margin-left: var(--dl-space-space-fourunits);
  }
  .home-container6 {
    width: 100%;
  }
  .home-pasted-image {
    height: auto;
  }
  .home-headng1 {
    padding-top: var(--dl-space-space-threeunits);
    padding-left: var(--dl-space-space-fourunits);
    padding-right: var(--dl-space-space-fourunits);
  }
  .home-headng2 {
    padding-top: var(--dl-space-space-threeunits);
    padding-left: var(--dl-space-space-fourunits);
    padding-right: var(--dl-space-space-fourunits);
  }
  .home-testimonals {
    align-items: center;
    flex-direction: column;
  }
  .home-left1 {
    margin-top: 0px;
    align-items: center;
    margin-bottom: ThreeUnits;
  }
  .home-text43 {
    font-size: 36px;
    text-align: center;
    line-height: 40px;
    margin-bottom: var(--dl-space-space-threeunits);
  }
  .home-text44 {
    font-size: 36px;
    text-align: center;
    line-height: 40px;
    margin-bottom: var(--dl-space-space-threeunits);
  }
  .home-right1 {
    gap: var(--dl-space-space-oneandhalfunits);
    flex-direction: row;
  }
  .home-column {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-column1 {
    gap: var(--dl-space-space-oneandhalfunits);
  }
  .home-footer {
    padding: var(--dl-space-space-sixunits);
  }
  .home-top {
    flex-direction: column;
  }
  .home-text51 {
    margin-bottom: var(--dl-space-space-unit);
  }
  .home-link {
    text-decoration: underline none;
  }
  .home-right2 {
    gap: var(--dl-space-space-twounits);
    flex-direction: column;
  }
  .home-links1 {
    gap: var(--dl-space-space-unit);
  }
  .home-links2 {
    gap: var(--dl-space-space-unit);
  }
  .home-links3 {
    gap: var(--dl-space-space-unit);
  }
}
@media(max-width: 767px) {
  .home-hero {
    height: 620px;
    position: relative;
    padding-bottom: 180px;
    background-color: var(--dl-color-template-blue-bg);
  }
  .home-header {
    height: 100%;
    margin-top: var(--dl-space-space-fourunits);
    justify-content: center;
  }
  .home-text03 {
    color: rgb(255, 255, 255);
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
  }
  .home-text04 {
    color: rgb(238, 233, 254);
    font-size: 16px;
    margin-top: var(--dl-space-space-unit);
    line-height: 24px;
  }
  .home-get-started {
    margin-top: var(--dl-space-space-twounits);
  }
  .home-dashboard-preview {
    top: 520px;
    width: 90%;
    border-width: 10px;
    border-radius: 45px;
  }
  .home-outline {
    border-width: 10px;
    border-radius: 35px;
  }
  .home-image {
    width: 100%;
  }
  .home-features {
    padding-top: 350px;
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }
  .home-text06 {
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
  }
  .home-container1 {
    gap: var(--dl-space-space-oneandhalfunits);
    margin-bottom: var(--dl-space-space-oneandhalfunits);
    flex-direction: column;
  }
  .home-text08 {
    font-size: 24px;
  }
  .home-text09 {
    font-size: 14px;
  }
  .home-publish {
    margin-left: 0px;
  }
  .home-text10 {
    font-size: 24px;
  }
  .home-text11 {
    font-size: 14px;
  }
  .home-container2 {
    gap: var(--dl-space-space-oneandhalfunits);
    flex-direction: column;
  }
  .home-analyze {
    margin-right: 0px;
  }
  .home-text12 {
    font-size: 24px;
  }
  .home-text13 {
    font-size: 14px;
  }
  .home-text15 {
    font-size: 14px;
  }
  .home-quote-container {
    padding-top: var(--dl-space-space-fourunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-fourunits);
  }
  .home-message {
    font-size: 24px;
    line-height: 31px;
  }
  .home-author {
    width: 100%;
  }
  .home-avatar {
    width: 40px;
    height: 40px;
  }
  .home-quote1 {
    font-size: 14px;
    max-width: 800px;
  }
  .home-banner-advanced-analytics {
    padding-bottom: var(--dl-space-space-threeunits);
  }
  .home-centered-container {
    flex-direction: column-reverse;
  }
  .home-right {
    margin-left: 0px;
  }
  .home-text19 {
    font-size: 28px;
    text-align: left;
    line-height: 26px;
    margin-bottom: var(--dl-space-space-twounits);
  }
  .home-text20 {
    font-size: 20px;
  }
  .home-text21 {
    line-height: 24px;
    margin-bottom: var(--dl-space-space-unit);
  }
  .home-text23 {
    font-size: 20px;
  }
  .home-text24 {
    line-height: 24px;
    margin-bottom: var(--dl-space-space-unit);
  }
  .home-banner {
    padding-top: var(--dl-space-space-fourunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-fourunits);
  }
  .home-container3 {
    flex-direction: column;
  }
  .home-left {
    margin-right: 0px;
  }
  .home-integrations {
    padding-top: var(--dl-space-space-fourunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-fourunits);
  }
  .home-text32 {
    line-height: 24px;
  }
  .home-pills {
    margin-bottom: var(--dl-space-space-threeunits);
  }
  .home-how-it-works {
    padding-top: var(--dl-space-space-fourunits);
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
    padding-bottom: var(--dl-space-space-fourunits);
  }
  .home-heading1 {
    margin-bottom: var(--dl-space-space-threeunits);
  }
  .home-text34 {
    margin-bottom: 0px;
  }
  .home-headng {
    padding-bottom: 0px;
  }
  .home-get-started2 {
    display: none;
  }
  .home-container6 {
    width: 100%;
  }
  .home-row {
    height: auto;
    flex-direction: column;
  }
  .home-testimonals {
    padding-left: var(--dl-space-space-fourunits);
    padding-right: var(--dl-space-space-fourunits);
    padding-bottom: 0px;
  }
  .home-right1 {
    width: 100%;
    flex-direction: column;
  }
  .home-column1 {
    display: none;
  }
  .home-text48 {
    display: flex;
    font-style: normal;
    margin-top: var(--dl-space-space-oneandhalfunits);
    font-weight: 600;
  }
  .home-footer {
    padding-top: var(--dl-space-space-fourunits);
    padding-left: var(--dl-space-space-twounits);
    padding-right: var(--dl-space-space-twounits);
  }
}
@media(max-width: 479px) {
  .home-hero {
    padding-bottom: 160px;
  }
  .home-logo {
    margin-left: 0px;
  }
  .home-icon {
    align-items: center;
    justify-content: center;
  }
  .home-text04 {
    color: #EEE9FE;
  }
  .home-get-started {
    width: 100%;
  }
  .home-dashboard-preview {
    top: 500px;
  }
  .home-features {
    padding-top: 200px;
  }
  .home-cards {
    margin-top: var(--dl-space-space-threeunits);
    margin-bottom: var(--dl-space-space-threeunits);
  }
  .home-container1 {
    gap: var(--dl-space-space-oneandhalfunits);
    margin-bottom: var(--dl-space-space-oneandhalfunits);
  }
  .home-container2 {
    gap: var(--dl-space-space-oneandhalfunits);
    margin-bottom: 0px;
  }
  .home-analyze {
    margin-bottom: 0px;
  }
  .home-category2 {
    padding-left: var(--dl-space-space-twounits);
    padding-right: var(--dl-space-space-twounits);
    flex-direction: column;
  }
  .home-testimonals {
    padding-left: var(--dl-space-space-oneandhalfunits);
    padding-right: var(--dl-space-space-oneandhalfunits);
  }
  .home-footer {
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
  }
}
</style>
