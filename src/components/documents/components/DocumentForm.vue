<template>
  <section>
    <div class="file-dropdown">
      <b-field>
        <b-upload v-model="dropFiles" multiple drag-drop>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <i class="fas fa-upload"></i>
              </p>
              <p>{{ $t("documents.drop") }}</p>
            </div>
          </section>
        </b-upload>
      </b-field>
      <div class="tags">
      <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary" >
        {{file.name}}
        <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
      </span>
      </div>
    </div>
    <form @submit.prevent>
      <div class="container line-margin input-row">
        <div class="row">
          <div class="col-sm-3">
            <label>{{ $t("label.name") }}</label>
          </div>
          <div class="col-sm-3">
            <input v-model="document.name" id="documents" type="text" :placeholder="$t('label.name')" class="form-control"/>
          </div>
        </div>
      </div>
      <div class="container line-margin input-row">
        <div class="row">
          <div class="col-sm-3">
            <label>{{ $t("label.note") }}</label>
          </div>
          <div class="col-sm-3">
            <textarea v-model="document.note" id="note" :placeholder="$t('label.note')" class="form-control"/>
          </div>
        </div>
      </div>
      <button
        class="btn btn-success line-margin button-center"
        @click="emitSubmitForm"
      >
        {{ $t("buttons.save") }}
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Documents } from "@/shared/classes/documents";
import { NotificationProgrammatic as Notification } from 'buefy';
import {showSnackBar_success, showSnackBar_danger} from '@/shared/notifications'
@Component({})
export default class DocumentForm extends Vue {
  @Prop({default: () => []}) dropFiles!: [];
  @Prop({default: () => []}) filesRefs!: [];
  @Prop({default: () => ''}) documentRef!: number;
  @Prop({default: () => ({name: '', note: '', files:[], patient_id: ''})}) document!: Documents;

  @Watch("filesRefs")
  onFilesRefsChanged(val: []) {
    this.filesRefs = val;
    if (this.filesRefs.length > 0) {
      this.document.patient_id = Number(this.$route.params.id);
      this.document.files = this.filesRefs;
      this.$emit("createDocumentEvent", this.document);
    }
  }

  @Watch("documentRef")
  onRefChanged(val: number) {
    this.documentRef = val;
    if (this.documentRef) {
      this.$router.back();
      showSnackBar_success(this.$t('notifies.success').toString());
    } else {
      showSnackBar_danger(this.$t('notifies.failed').toString());
    }
  }

  deleteDropFile(index: number) {
    this.dropFiles.splice(index, 1);
  }

  emitSubmitForm() {
    if (this.dropFiles.length > 0) {
      let formData = new FormData();
      for (var i = 0; i < this.dropFiles.length; i++ ){
        let file = this.dropFiles[i];
        formData.append('files[' + i + ']', file);
      }
      this.$emit("uploadFilesEvent", formData);
    } else {
      showSnackBar_danger(this.$t('notifies.attach_danger').toString());
    }
  }
}
</script>

<style lang="scss" scoped>
.file-dropdown {
  margin: 50px 600px 50px 600px;
}
.input-row {
  margin: 50px 400px 50px 400px;
  width: 100%;
}
.button-center {
  margin: 50px 700px 50px 700px;
}
</style>
