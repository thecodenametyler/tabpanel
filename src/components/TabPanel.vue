<template>
  <div>
    <section class="section__wrapper tabulations__wrapper">
      <div class="section__container container">
        <div class="row tabulations__intro middle-md">
          <div class="col-xs-12 col-md-6">
              <h1>{{ msg }}</h1>
          </div>
          <div class="col-xs-12 col-md-6">
            <strong>Debugger</strong><br>
            keypress: {{ keypressed }}
            <br>
            Tracktab: {{ trackTab }}
            <br>
            Number of panels: <input v-model.number="numOfTab" type="number">
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <button :tabindex="0" type="button" class="btn btn--fill">Button 1</button>
            <div class="tabulations">
              <div class="tabulations__header">
                <ol class="tabulations__header__list">
                  <li v-for="i in numOfTab" :key="i" :tabindex="i === showTab ? 0 : ''" v-bind:item="i" @click="switchTab(i)" class="tabulations__header__item" :class="{ 'active' : i === showTab,  'focus' : i === trackTab}">
                    TAB {{ i }}
                  </li>
                </ol>
              </div>
              <div class="tabulations__content__wrapper">
                <div v-for="i in numOfTab" :key="i" v-bind:item="i" class="tabulations__content__item" :class="{ 'active' : i === showTab}">
                  <div class="tabulations__content">
                    <p><strong>Content {{ i }}</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <button :tabindex="0" type="button" class="btn btn--fill">Button 3</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TabPanel',
  props: {
    msg: String
  },
  data: function() {
    return {
      showTab: 1,
      trackTab: 1,
      numOfTab: 4,
      keypressed: ''
    }
  },
  methods: {
    keyLogger(key) {
      switch(key) {
        case 9: // key enter
          this.keypressed = 'tab'
          break;
        case 13: // key enter
        case 32: // key space
          this.keypressed = 'space or enter'
          this.switchTab(this.trackTab);
          break;
        case 37: // key left
        case 38: // key up
          this.keypressed = 'up or left'
          if(this.trackTab > 1) {
            this.trackTab--;
          } else {
            this.trackTab = this.numOfTab;
          }
          break;
        case 39: // key right
        case 40: // key down
          this.keypressed = 'down or right'
          if(this.trackTab == this.numOfTab) {
            this.trackTab = 0;
          }
          this.trackTab++;
          break;
        default:
          // code block
          this.keypressed = key
      }
    },
    switchTab(index) {
      this.showTab = index;
      this.trackTab = index;
    }
  },
  mounted: function () {
    var $this = this;
      window.addEventListener("keyup", function(e) {
        $this.keyLogger(e.keyCode);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* @import './../assets/css/main.css'; */
</style>
