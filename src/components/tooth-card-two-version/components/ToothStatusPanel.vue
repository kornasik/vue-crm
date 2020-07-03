<template>
  <div class="status-list">
    <StatusListItem
      v-for="(item, index) in statusToothList"
      :key="index"
      :statusName="item.name"
      :statusNumber="item.id"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import StatusListItem from "@/components/tooth-card-two-version/elements/StatusListItem.vue";
import { ToothStatus } from "@/types/tooth-card";
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    StatusListItem
  }
})
export default class ToothStatusPanel extends Vue {
  @Prop() statusToothList!: ToothStatus[];

  created() {}
}
</script>

<style lang="scss" scoped></style>
