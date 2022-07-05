<template>
  <div>
    <div class="nav-bar"></div>
    <div id="app" class="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "~bulma/css/bulma.css";
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.nav-bar {
  background: #0054a6;
  height: 71px;
  width: 100%;
}
</style>
