<template>
  <div class="add-lead">
    <div class="add-lead__setting">
      <SettingLead />
    </div>
    <div class="add-lead__notes">
      <NotesLead />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SettingLead from "@/components/sales-funnel/components/add-lead/components/SettingLead.vue";
import NotesLead from "@/components/sales-funnel/components/add-lead/components/NotesLead.vue";
@Component({
  components: {
    SettingLead,
    NotesLead
  }
})
export default class AddLead extends Vue {

}
</script>

<style lang="scss" scoped>
.add-lead {
  display: flex;
  height: 100%;
  &__setting {
    width: 25%;
    background-color: white;
    border-right: 1px solid lightgray;
  }
  &__notes {
    width: 75%;
    background-color: #f5f5f5;
  }
}
</style>
