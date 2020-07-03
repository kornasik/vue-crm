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
          <template v-slot:item.action.date="{ item }">{{
            item.date
          }}</template>
          <template v-slot:item.action.overview="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="overviewItem(item)"
              :to="`patients/${item.id}`"
              >fas fa-eye</v-icon
            >
            <!-- to="/overview" -->
          </template>
          <template v-slot:item.action.edit="{ item }">
            <v-icon small @click="editItem(item)">fas fa-edit</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>

<script>
// import { getList } from "../../../api/medicine/patients.api";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
import {getNested} from "../../../shared/utils";
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
        path: "/patients/" + item.id
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
    api(httpClient)
      .patients.getList()
      .then(response => {
        response.data.patients.forEach(item => {
          var name = ``;
          if (getNested(item, 'content', '0', 'value')) {
            name = item.content[0].value;
          }
          var surname = ``;
          if (getNested(item, 'content', '1', 'value')) {
            surname = item.content[1].value;
          }
          this.patientsList.push({
            name: name,
            surname: surname,
            id: item.id,
            date: item.created
          });
        });
      });
  }
};
</script>

<style></style>
