<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on }">
        <v-icon :style="{ cursor: 'pointer' }" v-on="on"
          >fas fa-plus-circle</v-icon
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add value</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="Value field" required />
              </v-col>

              <!-- <v-col cols="12" sm="6">
                   <v-autocomplete
                     :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                     label="Interests"
                     multiple
                   />
                 </v-col>-->
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ModalAddValue",
  data: () => ({
    flag: false,
    dialog: false
  }),
  updated() {
    console.log(this.$store.state.Contact);
    this.flag = this.$store.state.Contact.modalAddValue;
  }
};
</script>
