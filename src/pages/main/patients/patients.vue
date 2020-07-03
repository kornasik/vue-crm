<template>
  <div class="patients">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class Patient extends Vue {}
</script>
<style scoped>
.patients {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
