<template>
  <div class="edit-stage-funnel">
    <SettingSaleFunnelHeader />
    <SettingSaleFunnelMain />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SettingSaleFunnelHeader from "./SettingSaleFunnelHeader.vue";
import SettingSaleFunnelMain from "./SettingSaleFunnelMain.vue";

@Component({
  components: {
    SettingSaleFunnelHeader,
    SettingSaleFunnelMain
  }
})
export default class EditStageFunnel extends Vue {}
</script>

<style scoped lang="scss">
.edit-stage-funnel {
  flex-grow: 1100;
}
</style>
