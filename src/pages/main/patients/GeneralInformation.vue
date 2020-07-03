<template>
  <div>
    <o-button type="is-info" @click="addNewPatient">{{$t('listPatient.addPatient')}}</o-button>
    <b-table :headers="headers" :items="patientsList" :search="search">
      <template v-slot:item.action.overview="{ item }">
        <b-icon small class="mr-2" @click="overviewItem(item)" to="/overview">
          fas fa-eye
        </b-icon>
      </template>
      <template v-slot:item.action.edit="{ item }">
        <b-icon small @click="editItem(item)">
          fas fa-edit
        </b-icon>
      </template>
    </b-table>
  </div>
</template>

<script>
import OButton from "../../../components/shared/OButton/OButton.vue";
export default {
  components: {
    OButton
  },
  name: "GeneralInformation",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "left",
          filterable: false,
          value: "name",
          width: 150
        },
        {
          text: "Surname",
          sortable: false,
          align: "left",
          value: "surname"
        },
        {
          text: "Overview",
          sortable: false,
          align: "center",
          value: "action.overview",
          width: 100
        },
        {
          text: "Edit",
          sortable: false,
          align: "center",
          value: "action.edit",
          width: 100
        }
      ],
      patientsList: []
    };
  },
  methods: {
    addNewPatient() {
      this.$router.push("add");
    },
    overviewItem(item) {
      this.$router.push({ path: `overview/${item.id}` });
    },
    editItem(item) {
      this.$router.push({ path: `edit/${item.id}` });
    }
  },
  beforeCreate() {
    this.$axios
      .get("http://api.ohi-s.by/medicine/patient/list")
      .then(response => {
        response.data.patients.forEach(item => {
          this.patientsList.push({
            name: item.content[1].value,
            surname: item.content[0].value,
            id: item.id
          });
        });
      });
  }
};
</script>

<style></style>
