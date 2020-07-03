<template>
  <div class="data-contact">
    <v-tabs
      v-model="tab"
      background-color="#FAFAFA"
      color="black"
      class="elevation-2"
      light
    >
      <v-tabs-slider />

      <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
        {{ i }}
      </v-tab>

      <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
        <div v-if="tab === 'tab-main'"><MainContact /></div>
        <div v-if="tab === 'tab-deals'">deals</div>
        <div v-if="tab === 'tab-setting'">setting</div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import MainContact from "./MainContact";
export default {
  name: "DataContact",
  components: {
    MainContact
  },
  data() {
    return {
      tab: null,
      tabs: ["main", "deals", "setting"]
    };
  }
};
</script>

<style scoped lang="scss">
.data-contact {
  margin-top: 30px;
}
</style>
