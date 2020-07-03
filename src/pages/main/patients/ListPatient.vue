<template>
  <section class="list-patient">
    <b-button
      class="list-patient__create-patient"
      type="is-info"
      @click="addNewPatient"
    >
      {{ $t("listPatient.addPatient") }}
    </b-button>
    <div class="list-patient__empty-list" v-if="dataTable.length < 1">
      {{ $t("listPatient.emptyTable") }}
    </div>
    <table class="list-patient__table" v-else>
      <tr>
        <th v-for="title in titlesTable" :key="title">{{ title }}</th>
      </tr>
      <tr
        class="list-patient__table__row"
        v-for="(row, rowIndex) in dataTable"
        :key="rowIndex"
      >
        <td v-for="(rowItem, rowItemIndex) in row" :key="rowItemIndex">
          {{ rowItem[1] }}
        </td>
        <td class="list-patient__table__actions">
          <b-icon
            pack="fas"
            icon="eye"
            size="is-small"
            class="list-patient__table__actions__overview"
            @click.native="overviewPatient(rowIndex)"
          >
          </b-icon>
          <b-icon
            pack="fas"
            icon="edit"
            size="is-small"
            class="list-patient__table__actions__edit"
            @click.native="editPatient(rowIndex)"
          >
          </b-icon>
          <b-icon
            pack="fas"
            icon="trash"
            size="is-small"
            class="list-patient__table__actions__delete"
            @click.native="deletePatient(rowIndex)"
          >
          </b-icon>
        </td>
      </tr>
    </table>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {FieldForPatient} from "@/types/list-patient";

@Component({})
export default class ListPatient extends Vue {
  titlesTable: string[] = [
    "Name",
    "Surname",
    "Phone number",
    "E-mail",
    "Actions"
  ];
  dataTable: Array<Object> = [];
  addNewPatient() {
    this.$router.push({
      path: "/patients/add",
      name: "AddPatient",
      params: { type: "add" }
    });
  }

  created() {
    const listPatient = JSON.parse(localStorage.getItem("listPatient")).map(
      (fieldsPatient: any, index: any) => {
        return fieldsPatient.map((field: FieldForPatient) => {
          return {
            [field["label"]]: field["value"]
          };
        });
      }
    );
    let list: any = [];
    listPatient.forEach((patient: any) => {
      let temp = {};
      patient.forEach((fieldPatient: object) => {
        Object.assign(temp, fieldPatient);
      });
      list.push(temp);
    });
    this.dataTable = list;
    this.dataTable.slice(0, 3);
    this.dataTable = this.dataTable.map((row: any) => {
      return Object.entries(row).slice(0, 4);
    });
  }

  deletePatient(id: number) {
    let listPatient = JSON.parse(localStorage.getItem("listPatient"));
    listPatient.splice(id, 1);
    localStorage.setItem("listPatient", JSON.stringify(listPatient));
    this.dataTable.splice(id, 1);

    this.$buefy.toast.open({
      message: "Пациент удален!",
      type: "is-success"
    });
  }

  overviewPatient(id: number) {
    this.$router.push("/patients/overview/" + id);
  }

  editPatient(id: number) {
    this.$router.push("/patients/edit/" + id);
  }
}
</script>

<style lang="scss" scoped>
.list-patient {
  &__create-patient {
    margin: 20px;
  }
  &__empty-list {
    margin: 0 auto;
    width: fit-content;
  }
  &__table {
    &__actions {
      &__overview {
        margin: 0 5px;
      }
      &__edit {
        margin: 0 5px;
      }
      &__delete {
        margin: 0 5px;
      }
    }
    &__row:hover {
      background-color: #eaeaea;
    }
  }
}
table th {
  padding: 10px 20px;
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid lightgray;
}

td {
  padding: 5px;
  text-align: center !important;
}

table {
  background-color: white;
  width: 60%;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin: 0 auto;
}
</style>
