<template>
  <div>
    <div>Plan/Course/Reception</div>
    <v-btn
      class="ma-2"
      tile
      color="indigo"
      dark
      @click="linkOnPlanCourseReception"
    >
      Планы лечения
    </v-btn>
    <v-btn class="ma-2" tile color="indigo" dark>
      Назначение приема
    </v-btn>
    <v-btn
      class="ma-2"
      tile
      color="indigo"
      dark
      @click="linkOnCreateTreatmentPlan"
    >
      Создание плана лечения
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "PlanCourseReceptionPatient",
  data: () => ({}),
  methods: {
    linkOnPlanCourseReception() {
      this.$router.push("treatment-plan");
    },
    linkOnCreateTreatmentPlan() {
      this.$router.push("create-treatment-plan");
    }
  }
};
</script>

<style scoped>
.ma-2 {
  margin: 20px;
}
</style>
