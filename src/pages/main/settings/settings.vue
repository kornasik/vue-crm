<template>
  <div>
    <!-- Settings
    <p><router-link to="/settings/currencies">currencies</router-link></p>
    <p><router-link to="/settings/formbuilder">formbuilder</router-link></p>
    <p><router-link to="/settings/manipulations">manipulations</router-link></p>
    <p><router-link to="/settings/templates">templates</router-link></p>
    <p><router-link to="/settings/reagents">reagents</router-link></p> -->
    <div class="header">
      {{ $t("settings.settings") }}
    </div>
    <div class="routes-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background-color: #2d2c6e;
  padding: 13px 20px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: 70px;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  color: #fff;
}
</style>
