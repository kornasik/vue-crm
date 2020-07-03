<template>
  <v-app-bar app clipped-left color="#0000b3" dense>
    <v-app-bar-nav-icon @click.stop="toggle" />
    <v-toolbar-title class="mr-12 align-center">
      <span class="title">OHI-S</span>
    </v-toolbar-title>
    <v-spacer />
    <v-row align="center" style="max-width: 650px">
      <v-text-field
        placeholder="Search.. ."
        single-line
        append-icon="fa fa-search"
        color="white"
        hide-details
      />
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Mutation, Action } from "vuex-class";
@Component({})
export default class Header extends Vue {
  @Mutation("sidebar/toggle") toggle: any;
}
</script>
