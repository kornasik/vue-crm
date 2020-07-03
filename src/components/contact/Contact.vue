<template>
  <v-app>
    <div class="contact">
      <HeaderContact />
      <DataContact />
      <AddContact />
    </div>
  </v-app>
</template>

<script>
import HeaderContact from "./components/HeaderContact";
import DataContact from "./components/DataContact";
import AddContact from "./elements/AddContact";

export default {
  name: "Contact",
  components: {
    HeaderContact,
    DataContact,
    AddContact
  },
  data: () => ({})
};
</script>

<style lang="scss">
.contact {
  width: 700px;
  margin: 0 auto;
}

.v-application--wrap {
  background-color: white;
}
</style>
