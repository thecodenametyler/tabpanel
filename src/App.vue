<template>
  <div id="app">
    <TabPanel msg="TabPanel"/>
  </div>
</template>

<script>
import TabPanel from './components/TabPanel.vue'

export default {
  name: 'App',
  components: {
    TabPanel
  }
}
</script>

<style>
  @import './assets/css/normalize.css';
  @import './assets/css/custom.css';
</style>
