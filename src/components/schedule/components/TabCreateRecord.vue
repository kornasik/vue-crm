<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      class="elevation-2"
      light
    >
      <v-tabs-slider />

      <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
        {{ i }}
      </v-tab>

      <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
        <v-card flat tile>
          <CreateRecord :edit="!edit" />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import CreateRecord from "./CreateRecord";

export default {
  components: {
    CreateRecord
  },
  props: {
    edit: Boolean
  },
  data() {
    return {
      tab: null,
      tabs: ["even", "odd"]
    };
  },
  updated() {
    this.$store.commit("setActiveTab", this.tab);
  }
};
</script>
