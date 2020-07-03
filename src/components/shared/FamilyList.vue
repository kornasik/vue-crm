<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="familyList"
      sort-by="calories"
      class="family-table"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ $t("familyList.title") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">{{
                $t("familyList.add")
              }}</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.name"
                        :label="$t('familyList.nameFamily')"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">{{
                  $t("familyList.cancel")
                }}</v-btn>
                <v-btn color="blue darken-1" text @click="save">{{
                  $t("familyList.save")
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
          $t("familyList.reset")
        }}</v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  name: "FamilyList",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Name family",
        align: "left",
        sortable: true,
        value: "name"
      },
      {
        text: "Actions",
        align: "right",
        value: "action",
        sortable: false
      }
    ],
    responseFamilyList: {},
    familyList: [],
    editedIndex: -1,
    editedItem: {
      name: ""
    },
    id: 0,
    defaultItem: {
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t("familyList.newFamily")
        : this.$t("familyList.editFamily");
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
        .get("http://api.ohi-s.by/medicine/patient-family/list")
        .then(response => {
          this.responseFamilyList = response.data;
          response.data.families.forEach(item => {
            this.familyList.push({
              name: item.name
            });
          });
        });
    },

    editItem(item) {
      this.editedIndex = this.familyList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.responseFamilyList.families.forEach(responseFamilyListItem => {
        if (item.name === responseFamilyListItem.name) {
          this.id = responseFamilyListItem.id;
        }
      });
    },

    deleteItem(item) {
      const index = this.familyList.indexOf(item);

      this.responseFamilyList.families.forEach(responseFamilyListItem => {
        if (item.name === responseFamilyListItem.name) {
          this.id = responseFamilyListItem.id;
        }
      });
      confirm(this.$t("familyTable.confirmText")) &&
        this.familyList.splice(index, 1) &&
        this.$axios.delete(
          `http://api.ohi-s.by/medicine/patient-family/${this.id}`
        );
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.familyList[this.editedIndex], this.editedItem);
      } else {
        this.familyList.push(this.editedItem);
      }

      if (this.editedIndex === -1) {
        this.$axios.post("http://api.ohi-s.by/medicine/patient-family/create", {
          name: this.editedItem.name
        });
      } else {
        this.$axios.put(
          `http://api.ohi-s.by/medicine/patient-family/${this.id}`,
          {
            name: this.editedItem.name
          }
        );
      }

      this.close();
    }
  }
};
</script>

<style scoped lang="scss"></style>
