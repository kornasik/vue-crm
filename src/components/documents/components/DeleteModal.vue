<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <h1>{{ $t("documents.removal_depth") }}</h1>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <b-checkbox v-model="hard">{{ $t("documents.remove") }}</b-checkbox>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">{{ $t("documents.close") }}</button>
      <button class="button is-primary" @click="emitDeleteDocument">{{ $t("documents.del") }}</button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component({})
export default class DeleteModal extends Vue {
  @Prop({default: () => false}) hard!: boolean;
  @Prop({default: () => ''}) documentId!: number;
  @Prop({default: () => []}) documents!: [];
  data() {
    return {
      checkbox: false,
      checkboxCustom: 'No'
    };
  }
  emitDeleteDocument() {
    let id = this.documentId,
    hard = this.hard;
    this.$emit("deleteDocumentEvent", {id, hard});
    (this.$parent as any).close();
    let documents = this.refreshDocuments(this.documents, id);
    this.$emit("setDocumentsEvent", documents);
  }
  refreshDocuments(documents: [], id: number) {
    return documents.filter((doc: any) => doc.id !== id);
  }
}
</script>
