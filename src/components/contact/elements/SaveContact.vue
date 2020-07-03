<template>
  <div>
    <v-btn color="green" dark @click="saveContact" small>
      Save
      <v-icon color="white" small :style="{ paddingLeft: '10px' }">
        fas fa-arrow-right
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "SaveContact",
  data: () => ({}),
  methods: {
    saveContact() {
      let paramsRequest = {};
      this.$store.state.Contact.dataContact.forEach(item => {
        paramsRequest[item.id] = item.value;
      });
      this.$axios.put(this.$store.state.apiDomain + "/contact/save", {
        params: paramsRequest
      });
    }
  }
};
</script>

<style></style>
