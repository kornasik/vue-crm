<template>
  <div class="documents">
    <DocumentsList
      :documents="documents"
      :documentId="documentId"
      @downloadFileEvent="download($event)"
      @setDocumentIdEvent="setDocumentId($event)"
    />
    <b-button :style="{ margin: '30px' }" type="is-primary" outlined @click.native="addNewDocument">{{ $t("documents.add") }}</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DocumentsList from "@/components/shared/DocumentsList.vue";
import { Getter, Action, Mutation } from "vuex-class";
@Component({
  components: {
    DocumentsList
  }
})
export default class Documents extends Vue {
  @Getter("DOCUMENTS") documents!: [];
  @Action("GET_DOCUMENTS") getDocuments!: (patient_id: string) => void;
  @Getter("DOC_ID") documentId!: number;
  @Action("DOWNLOAD") download!: void;
  @Mutation("SET_DOC_ID") setDocumentId!: void;

  mounted() {
    this.init();
  }

  init() {
    this.getDocuments(this.$route.params.id);
  }

  addNewDocument() {
    this.$router.push(`documents/create`);
  }
}
</script>

<style lang="scss" scoped>
.documents {
  padding: 20px;
  display: flex;
  width: fit-content;
  &__status-list {
    display: flex;
    justify-content: space-between;
  }
  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
