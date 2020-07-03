<template>
  <div>
    <v-app>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-btn color="primary" dark class="mb-2" @click="addNewPatient"
            >Add patient</v-btn
          >
        </v-card-title>
        <v-data-table :headers="headers" :items="patientsList" :search="search">
          <template v-slot:item.action.date="{ item }">
            {{ item.date }}
          </template>
          <template v-slot:item.action.overview="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="overviewItem(item)"
              to="/overview"
            >
              fas fa-eye
            </v-icon>
          </template>
          <template v-slot:item.action.edit="{ item }">
            <v-icon small @click="editItem(item)">
              fas fa-edit
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
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
          text: "Date",
          sortable: false,
          align: "center",
          value: "action.date",
          width: 200
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
      // this.$router.push('add')
      this.$router.push({
        path: "/patients/add",
        name: "AddPatient",
        params: { type: "add" }
      });
    },
    overviewItem(item) {
      this.$router.push({
        path: "/patients/overview/" + item.id,
        name: "OverviewPatient",
        params: { id: item.id }
      });
    },
    editItem(item) {
      // this.$router.push({ path: `edit/${item.id}` })
      this.$router.push({
        path: "/patients/edit/" + item.id,
        name: "EditPatient",
        params: { id: item.id }
      });
    }
  },
  beforeCreate() {
    this.$axios
      .get("http://api.ohi-s.by/medicine/patient/list")
      .then(response => {
        console.log("----main-list----", response);
        response.data.patients.forEach(item => {
          this.patientsList.push({
            name: item.content[0].value,
            surname: item.content[1].value,
            id: item.id,
            date: item.created
          });
        });
      });
  }
};
</script>

<style></style>
