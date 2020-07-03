<template>
  <div class="documents-wrapper">
    <h3>{{ $t("documents.name") }}</h3>
    <div id="app" class="container">
      <section>
        <b-tabs>
          <b-tab-item v-for="(document, index) in documents" :key="'document' + index" :label="document.name">
            <h1>{{ document.name }}</h1>
            <div v-for="(file, index) in document.files" :key="'file' + index">
              <div class="content-container container mt-5">
                <div class="document-container container py-3 pl-0">
                  <div class="document-container__icon float-left px-2 ">
                    <a class="document-container__link icon" :id="file.name_external" @click.prevent="emitDownloadFile(file.id, file.name_external)">
                      <i :title="getFileExtension(file.name_external)"></i>
                    </a>
                  </div>
                  <div class="document-container__details">
                    <div class="document-container__details--title">
                      <h3>{{file.name_external}}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2>{{ document.note }}</h2>
            <div class="content-container container mt-5">
              <b-button type="is-danger" @click="openModal(document.id)">
                <i class="fas fa-trash"></i>
                {{ $t("documents.delete") }}
              </b-button>
              <b-modal :active.sync="isComponentModalActive" has-modal-card trap-focus aria-role="dialog" aria-modal>
                <delete-modal :documents="documents" :documentId="documentId" @deleteDocumentEvent="deleteDocument($event)" @setDocumentsEvent="setDocuments($event)"></delete-modal>
              </b-modal>
            </div>
          </b-tab-item>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Documents } from "@/shared/classes/documents";
import DeleteModal from "@/components/documents/components/DeleteModal.vue";
import { Action, Mutation } from "vuex-class";
import { Prop } from "vue-property-decorator";
@Component({
  components: {
    DeleteModal
  }
})
export default class DocumentsList extends Vue {
  @Action("DELETE_DOC") deleteDocument!: void;
  @Mutation("SET_DOCUMENTS") setDocuments!: void;
  @Prop({default: () => []}) documents!: Documents[];
  @Prop({default: () => false}) isComponentModalActive!: boolean;
  @Prop({default: () => []}) documentId!: number;

  getFileExtension(fileName: string) {
    return fileName.substr(fileName.lastIndexOf('.') + 1);
  }

  emitDownloadFile(id: number, name: string) {
    this.$emit("downloadFileEvent", {id, name});
  }

  openModal(id: number) {
    this.$emit("setDocumentIdEvent", id);
    this.isComponentModalActive = true;
  }
}
</script>

<style lang="scss" scoped>
.documents-wrapper {
  margin: 25px;
}
h1 {
  font-size: 50px;
  text-align: center;
  font-weight: 300;
  color: #777;
  margin-bottom: 0;
}
h2 {
  text-align: center;
  margin: 15px;
  font-size: 16px;
}
h3 {margin-bottom: 0; font-size: 24px;}

.document-container {border-bottom: 1px solid #000;}
.document-container__details--description p {margin: 0;}
.icons {
  font-size: 0;
}
.icon {
  display: inline-block;
  width: 40px;
  height: 50px;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  margin: 0 5px;
}
.icon::after {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-radius: 0 2px;
  transition: all 0.2s linear;
  backface-visibility: hidden;
}
.icon {background-color: #00a78e;}
.icon::after {
  background: linear-gradient(45deg, #00f4cf 50%, #FFF 50%);
}
.icon i::before { content: '< >'; }
a[id$=".jpg"], a[id$=".jpeg"], a[id$=".png"] {background-color: #0193ab;}
a[id$=".jpg"]::after, a[id$=".jpeg"]::after, a[id$=".png"]::after {
  background: linear-gradient(45deg, #095865 50%, #FFF 50%);
}
a[id$=".jpg"]i::before, a[id$=".jpeg"]i::before, a[id$=".png"] i::before { content: '🖻'; }
a[id$=".txt"] {background-color: #92a09e;}
a[id$=".txt"]::after {
  background: linear-gradient(45deg, #6a6d6d 50%, #FFF 50%);
}
a[id$=".txt"] i::before { content: '☵'; }
a[id$=".pdf"] {background-color: #db4437;}
a[id$=".pdf"]::after {
  background: linear-gradient(45deg, #e78178 50%, #FFF 50%);
}
a[id$=".pdf"] i::before { content: '☵'; }
a[id$=".doc"], a[id$=".docx"] {background-color: #4285f4;}
a[id$=".doc"]::after, a[id$=".docx"]::after {
  background: linear-gradient(45deg, #8ab4f8 50%, #FFF 50%);
}
a[id$=".doc"] i::before,
a[id$=".docx"] i::before { content: '☰'; }
a[id$=".xls"], a[id$=".xlsx"] {background-color: #0f9d58;}
a[id$=".xls"]::after, a[id$=".xlsx"]::after {
  background: linear-gradient(45deg, #16e37f 50%, #FFF 50%);
}
a[id$=".xls"] i::before,
a[id$=".xlsx"] i::before { content: '⊟'; }
a[id$=".ppt"], a[id$=".pptx"] {background-color: #f5b707;}
a[id$=".ppt"]::after, a[id$=".pptx"]::after {
  background: linear-gradient(45deg, #facd4f 50%, #FFF 50%);
}
a[id$=".ppt"] i::before,
a[id$=".pptx"] i::before { content: '⧉'; }
.icon i {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  font-size: 10px;
  color: #fff;
  font-weight: 500;
}
.icon i::before {
  text-align: center;
  font-size: 12px;
  opacity: 0;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
}
.icon i::before, .icon i::after {
  display: block;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.icon i::after {
  content: attr(title);
  -webkit-transform: translateY(-5px);
  transform: translateY(-5px);
}
.icon i::before, .icon i::after {
  display: block;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.icon:hover { border-radius: 2px 4px 2px 2px;}
.icon:hover::after {
  width: 12px;
  height: 12px;
}
.icon:hover i::before {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}
.icon:hover i::after {
  -webkit-transform: translateY(0);
  transform: translateY(0);
}
</style>
