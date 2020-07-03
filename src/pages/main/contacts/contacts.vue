<template>
  <div class="list-contacts">
    <div class="contact" v-for="(item, index) in listContacts" :key="index">
      <ItemListContact :item="item" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Mutation } from "vuex-class";
import ItemListContact from "@/components/contacts/components/ItemListContact.vue";
import api from "@/api/index.api";
import httpClient from "../../../api/httpClient/httpClient";
@Component({
  components: {
    ItemListContact
  }
})
export default class ListContacts extends Vue {
  @Mutation("setContactsList") setContactsList: any;

  listContacts: any = [];

  created() {
    api(httpClient)
      .contacts.getList()
      .then((response: any) => {
        this.setContactsList(response.data.contacts);
        this.listContacts = response.data.contacts;
      });
  }
}
</script>

<style lang="scss" scoped>
.sales-funnel-list {
  width: 200px;
  margin: 20px 0 0 20px;
}

.sales-funnel__add-sales-funnel {
  display: flex;
  width: 230px;
}
</style>
