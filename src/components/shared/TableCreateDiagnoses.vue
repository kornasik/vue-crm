<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="tableListDiagnoses"
      hide-default-footer
      class="elevation-1"
      disable-pagination
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{
            $t("tableCreateDiagnoses.title")
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">{{
                $t("tableCreateDiagnoses.add")
              }}</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        :label="$t('tableCreateDiagnoses.nameDiagnosis')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.code"
                        :label="$t('tableCreateDiagnoses.codeDiagnosis')"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="close">{{
                  $t("tableCreateDiagnoses.cancel")
                }}</v-btn>
                <v-btn color="blue darken-1" text @click="save">{{
                  $t("tableCreateDiagnoses.save")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          fas fa-edit
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          fas fa-trash-alt
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">{{
          $t("tableCreateDiagnoses.reset")
        }}</v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  name: "TableCreateDiagnoses",
  components: {},
  data() {
    return {
      headers: [
        {
          text: this.$t("tableCreateDiagnoses.title"),
          align: "left",
          value: "name"
        },
        {
          text: this.$t("tableCreateDiagnoses.codeDiagnosis"),
          value: "code",
          align: "right",
          sortable: false
        },
        {
          text: this.$t("tableCreateDiagnoses.actions"),
          value: "action",
          sortable: false
        }
      ],
      listDiagnoses: null,
      tableListDiagnoses: [],
      dialog: false,
      editedIndex: -1,
      id: 0,
      editedItem: {
        name: "",
        code: ""
      },
      defaultItem: {
        name: "",
        code: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t("tableCreateDiagnoses.newDiagnosis")
        : this.$t("tableCreateDiagnoses.editDiagnosis");
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
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
    },

    editItem(item) {
      this.editedIndex = this.tableListDiagnoses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log("this.tableListDiagnoses:", this.tableListDiagnoses);
      console.log("item:", item);
    },

    deleteItem(item) {
      let id = "";
      const index = this.tableListDiagnoses.indexOf(item);
      this.listDiagnoses.forEach(listDiagnosesItem => {
        if (listDiagnosesItem.name === item.name) {
          id = listDiagnosesItem.id;
          return null;
        }
      });
      confirm(this.$t("tableCreateDiagnoses.confirmText")) &&
        this.tableListDiagnoses.splice(index, 1) &&
        this.$axios
          .delete(`http://api.ohi-s.by/medicine/diagnosis/${id}`)
          .catch(error => {
            console.log(error);
          });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save(item) {
      if (this.editedIndex > -1) {
        Object.assign(
          this.tableListDiagnoses[this.editedIndex],
          this.editedItem
        );
      } else {
        this.tableListDiagnoses.push(this.editedItem);
      }
      let id = 0;
      let position = 0;

      if (this.editedIndex === -1) {
        this.tableListDiagnoses.forEach((item, index) => {
          if (item.name === this.editedItem.item) {
            position = index + 1;
          } else {
            position = this.tableListDiagnoses.length;
          }
        });
        this.$axios.post("http://api.ohi-s.by/medicine/diagnosis/create", {
          name: this.editedItem.name,
          position: position
        });
      } else {
        this.listDiagnoses.forEach((item, index) => {
          if (item.name === this.editedItem.name) {
            id = item.id;
            position = index + 1;
            return null;
          }
        });
        this.$axios.put(`http://api.ohi-s.by/medicine/diagnosis/${id}`, {
          name: this.editedItem.name,
          position
        });
      }
      this.close();
    }
  }
};
</script>

<style scoped></style>
