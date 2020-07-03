<template>
  <div
    class="date-and-time-picker"
    :style="dataTimeInlineStyle"
    v-if="isOpenDateTimePicker"
  >
    <b-datepicker
      icon-pack="fas"
      v-model="date"
      inline
      :unselectable-days-of-week="[0, 6]"
    >
    </b-datepicker>
    <div>
      <div :style="{ fontSize: '12px', textAlign: 'center' }">
        Промежуток времени для задачи
      </div>
      <div
        :style="{
          display: 'flex',
          width: '250px',
          justifyContent: 'space-around'
        }"
      >
        <b-timepicker v-model="startTime" inline></b-timepicker>
        <b-timepicker v-model="endTime" inline></b-timepicker>
      </div>
    </div>
    <b-icon
      pack="fas"
      icon="times"
      size="is-small"
      @click.native="closeDateTimePicker"
    >
    </b-icon>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({
  props: {
    isOpenDateTimePicker: Boolean,
    dataTimeInlineStyle: Object
  }
})
export default class DateTimePicker extends Vue {
  @Watch("date")
  changeDate() {
    this.$emit("emitChangeDate", this.date);
  }
  @Watch("startTime")
  changeStartTime() {
    this.$emit("emitChangeStartTime", this.startTime);
  }
  @Watch("endTime")
  changeEndTime() {
    this.$emit("emitChangeEndTime", this.endTime);
  }
  isOpenDateTimePicker: boolean = false;
  date: Date = new Date();
  startTime: any = "";
  endTime: any = "";
  closeDateTimePicker() {
    this.$emit("emitCloseDateTimePicker", false);
  }
}
</script>

<style lang="scss" scoped>
.date-and-time-picker {
  position: absolute;
  top: -382px;
  left: 15px;
  display: flex;
  width: 550px;
  height: 373px;
}
</style>
