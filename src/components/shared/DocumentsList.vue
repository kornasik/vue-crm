<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">№</th>
          <th class="text-left">{{ $t("documentsList.name") }}</th>
          <th class="text-center">{{ $t("documentsList.date") }}</th>
          <th class="text-center">{{ $t("documentsList.status") }}</th>
          <th class="text-center">{{ $t("documentsList.total") }}</th>
          <th class="text-center">{{ $t("documentsList.download") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in documentsList" :key="item.name">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-left">{{ checkPropertiesPlan(item) }}</td>
          <td class="text-center">
            {{ item.date ? item.date : "18.10.2019" }}
          </td>
          <td class="text-center">
            <v-icon>
              {{ paymentStatus(item.status) }}
            </v-icon>
          </td>
          <td class="text-center">{{ item.total }}</td>
          <td class="text-center" @click="downloadDocument">
            <v-icon pointer>
              fas fa-file-download
            </v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  data() {
    return {
      documentsList: []
    };
  },
  created() {
    this.$axios("http://api.ohi-s.by/medicine/invoices/list").then(response => {
      this.documentsList = response.data.invoices;
    });
  },
  methods: {
    paymentStatus(status) {
      return status ? "fas fa-check" : "fas fa-times";
    },
    downloadDocument() {
      console.log("download");
    },
    checkPropertiesPlan(item) {
      return Object.keys(item.plan).length
        ? item.plan.name
        : this.$t("documentsList.defaultName");
    }
  }
};
</script>

<style></style>
