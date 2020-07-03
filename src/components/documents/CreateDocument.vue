<template>
  <div class="documents-create">
    <DocumentForm
      :filesRefs="filesRefs"
      :documentRef="documentRef"
      @createDocumentEvent="createDocument($event)"
      @uploadFilesEvent="uploadFiles($event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DocumentForm from "@/components/documents/components/DocumentForm.vue";
import { Getter, Action } from "vuex-class";
@Component({
  components: {
    DocumentForm
  }
})
export default class CreateDocument extends Vue {
  @Getter("FILES_REFS") filesRefs!: [];
  @Getter("REF") documentRef!: number;
  @Action("UPLOAD_FILES") uploadFiles!: void;
  @Action("CREATE_DOCUMENT") createDocument!: void;
}
</script>

<style lang="scss" scoped>
.documents-create {
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
