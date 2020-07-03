<template>
  <v-row justify="center" class="add-contact">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-icon color="green" dark v-on="on" x-large>fas fa-plus-circle</v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add new field</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Label field" v-model="label" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="typeField"
                  label="Value field"
                  required
                  v-model="type"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox label="Required" required v-model="required" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="clickSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    required: false,
    type: "",
    label: "",
    typeField: ["Text", "Number", "Flag", "List", "Multiselect", "Date"]
  }),
  methods: {
    clickSave() {
      this.$store.commit("setFieldLabel", {
        label: this.label,
        type: this.type.toLowerCase(),
        required: this.required
      });
      this.$store.commit("setFieldValue", "");
      this.$axios.post(this.$store.state.apiDomain + "/contact/add", {
        params: {
          label: this.label,
          type: this.type.toLowerCase(),
          is_required: this.required
        }
      });
      this.dialog = false;
    }
  }
};
</script>

<style>
.add-contact {
  position: fixed;
  bottom: 20px;
  right: 30px;
}
</style>
