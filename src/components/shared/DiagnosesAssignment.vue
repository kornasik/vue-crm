<template>
  <div class="diagnoses-assignment__wrapper container">
    <ToothCard :edit="false" />
    <div class="diagnoses-assignment__list-diagnoses">
      <v-app>
        <v-data-table
          v-model="value"
          :headers="headers"
          :items="tableListDiagnoses"
          :single-select="singleSelect"
          item-key="name"
          show-select
          class="elevation-1"
          hide-default-footer
          disable-pagination
        >
        </v-data-table>
      </v-app>
    </div>
  </div>
</template>

<script>
import ToothCard from "../tooth-card/ToothCard";

export default {
  name: "DiagnosesAssignment",
  components: {
    ToothCard
  },
  data: function() {
    return {
      selected: [],
      value: [],
      singleSelect: false,
      listDiagnoses: null,
      tableListDiagnoses: [],
      search: "",
      headers: [
        {
          text: "Name diagnosis",
          align: "left",
          filterable: false,
          value: "name"
        },
        {
          text: "Code diagnosis",
          value: "code",
          align: "center"
        }
      ]
    };
  },
  created() {
    this.initialize();
  },
  beforeUpdate() {
    if (this.selectedTooth && this.value.length > 0) {
      this.$store.commit("changeDiagnosesAssignmentList", {
        value: this.value,
        number: this.$store.state.ToothCard.selectedTooth
      });
    }
  },
  computed: {
    selectedTooth() {
      return this.$store.state.ToothCard.selectedTooth;
    }
  },
  watch: {
    selectedTooth() {
      this.value = [];
      for (let item in this.$store.state.Diagnoses.diagnosesAssignmentList) {
        if (Number(item) === this.selectedTooth) {
          this.value = this.$store.state.Diagnoses.diagnosesAssignmentList[
            item
          ];
          return null;
        }
      }
    }
  },
  methods: {
    initialize() {
      this.$axios
        .get("http://api.ohi-s.by/medicine/diagnosis/list")
        .then(response => {
          this.listDiagnoses = response.data.content;
          this.listDiagnoses.forEach(item => {
            let diagnosisItem = {};
            diagnosisItem.name = item.name;
            diagnosisItem.code = item.code;
            this.tableListDiagnoses.push(diagnosisItem);
          });
        });
    }
  }
};
</script>

<style lang="scss"></style>
