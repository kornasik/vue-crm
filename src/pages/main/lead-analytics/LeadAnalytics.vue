<template>
  <div class="lead-analytics">
     <bar-chart
      :data="[
        ['Work', 32],
        ['Play', 1492]
      ]"
    ></bar-chart>
    <line-chart
      :data="{
        '12': 11,
        '13': 6,
        '14': 12,
        '15': 71,
        '123': 25,
        '123': 45,
        '43': 34
      }"
    ></line-chart>
    <pie-chart
      title="asd"
      :data="[
        ['Blueberry', 1],
        ['Strawberry', 3],
        ['Blueberry', 2],
        ['Strawberry', 5],
        ['Blueberry', 7],
        ['Strawberry', 9],
        ['Blueberry', 11],
        ['Strawberry', 14]
      ]"
    ></pie-chart>
    <column-chart
      :data="[['Sun', 1], ['Mon', 2], ['Tue', 3], ['qwe', 4],['asd', 5],['zxc', 6],['rth', 7],['uyj', 8],['uik', 9],['op;', 10],['b,', 11],[',', 12],['/;l', 13],]"
    ></column-chart>
    <area-chart :data="{ '2017-01-01': 11, '2017-01-02': 6,'2018-01-01': 11, '2018-01-02': 6,'2019-01-01': 11, '2019-01-02': 6 }"></area-chart>
    <scatter-chart
      :data="[
        [174.0, 80.0],
        [176.5, 82.3],
        [132.0, 60.0],
        [126.5, 42.3]
      ]"
      xtitle="Size"
      ytitle="Population"
    ></scatter-chart>
    <line-chart :data="{ '2017-01-01': 11, '2017-01-02': 6 }"></line-chart>
    Pie chart

    <pie-chart
      :data="[
        ['Blueberry', 44],
        ['Strawberry', 23]
      ]"
    ></pie-chart>
    Column chart

    <column-chart
      :data="[
        ['Sun', 32],
        ['Mon', 46],
        ['Tue', 28]
      ]"
    ></column-chart>
    Bar chart

    <bar-chart
      :data="[
        ['Work', 32],
        ['Play', 1492]
      ]"
    ></bar-chart>
    Area chart

    <area-chart :data="{ '2017-01-01': 11, '2017-01-02': 6 }"></area-chart>
    Scatter chart

    <scatter-chart
      :data="[
        [174.0, 80.0],
        [176.5, 82.3]
      ]"
      xtitle="Size"
      ytitle="Population"
    ></scatter-chart>
    <line-chart :data="data" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class LeadAnalytics extends Vue {
  data = [
    { name: "Workout", data: { "2017-01-01": 3, "2017-01-02": 4 } },
    { name: "Call parents", data: { "2017-01-01": 5, "2017-01-02": 3 } }
  ];
}
</script>

<style lang="scss" scoped></style>
