<!--<template>
  <div>
    <div>History diagnoses</div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Diagnoses</th>
          <th class="text-left">Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in historyDiagnosesList" :key="item.patient_id">
            <td class="text-left">{{ item.name }}</td>
            <td class="text-left">{{ item.date }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>-->

<!--<template>
  <v-data-table
    :items="historyDiagnosesList"
    item-key="name"
    group-by="date"
    class="elevation-1"
  ></v-data-table>
</template>-->

<template>
  <div>
    <div
      :style="{ display: 'flex', margin: '50px' }"
      v-for="diagnosisListItem in historyDiagnosesList"
      :key="diagnosisListItem.date"
    >
      <div>Date: {{ diagnosisListItem.date }}</div>
      <div
        :style="{ margin: '50px' }"
        v-for="(diagnosisItem, index) in diagnosisListItem.diagnosis"
        :key="index"
      >
        Number tooth:{{ index }}
        <div v-for="diagnosis in diagnosisItem" :key="diagnosis.name">
          Diagnosis:{{ diagnosis.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryDiagnoses",
  data: () => ({
    historyDiagnosesList: []
  }),
  beforeCreate() {
    this.$axios
      .get("http://api.ohi-s.by/medicine/patient-diagnosis/list")
      .then(response => {
        console.log(response.data.diagnosis);
        response.data.diagnosis.forEach(diagnosisListItem => {
          for (let diagnosisItem in diagnosisListItem.diagnosis) {
            let diagnosesList = [];
            for (let diagnosis in diagnosisListItem.diagnosis[diagnosisItem]) {
              let nameDiagnosis =
                diagnosisListItem.diagnosis[diagnosisItem][diagnosis].name;
              diagnosesList.push(nameDiagnosis);
              this.historyDiagnosesList.push({
                date: diagnosisListItem.date,
                [diagnosisItem]: diagnosesList
              });
            }
          }
        });
        console.log(this.historyDiagnosesList);
      });
  }
};
</script>

<style></style>
