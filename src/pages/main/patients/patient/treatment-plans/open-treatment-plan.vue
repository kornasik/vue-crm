<template>
  <div>
    <article class="wrapper">
      <div class="form">
        <FormViewer
          :form="form"
          :recommendedTemplates="recommendedTeamplates"
          :isTemplateDragging="drag"
          @sumbitForm="handleSubmitForm($event)"
        />
      </div>
      <aside class="templates">
        <draggable
          class="templates__recommended"
          :group="{ name: 'formItems', pull: 'clone', put: false }"
          @start="drag = true"
          @end="drag = false"
          :sort="false"
        >
          <div
            class="template"
            v-for="template in recommendedTeamplates"
            :key="template.id"
            :data-template-id="template.id"
          >
            {{ template.name }}
          </div>
        </draggable>
        <Templates />
      </aside>
    </article>
    <o-loading :isShow="isLoading" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Draggable from "vuedraggable";
import Component from "vue-class-component";
import Templates from "@/components/shared/Templates/index.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import FormViewer from "@/components/FormViewer/FormViewer.vue";
import { Action, Getter, Mutation } from "vuex-class";
import OLoading from "@/components/shared/OLoading.vue";
@Component({
  components: {
    Templates,
    Breadcrumbs,
    FormViewer,
    OLoading,
    Draggable
  }
})
export default class TemplatesView extends Vue {
  @Action("getFormById") getFormById: any;
  @Action("treatmentPlan/getPlanById") getPlanById: any;
  form: any = null;
  plan: any = null;
  isLoading = true;
  queue = [];
  drag = false;

  recommendedTeamplates = [
    { id: 1, content: "content1", name: "template1" },
    { id: 2, content: "content2", name: "template2" },
    { id: 3, content: "content3", name: "template3" },
    { id: 4, content: "content4", name: "template4" },
    { id: 5, content: "content5", name: "template5" },
    { id: 6, content: "content6", name: "template6" },
    { id: 7, content: "content7", name: "template7" },
    { id: 8, content: "content8", name: "template8" },
    { id: 9, content: "content9", name: "template9" }
  ];

  text = "";

  async created() {
    this.form = await this.getFormById(292);
    this.getPlan();
    this.isLoading = false;
  }

  async getPlan() {
    const id = +this.$route.params.id;
    if (id) {
      this.plan = await this.getPlanById(id);
    }
  }

  handleSubmitForm() {}
}
</script>
<style lang="scss"  >
.wrapper {
  display: flex;
  position: relative;
  flex-wrap: wrap;
}
.form {
  width: calc(100% - 300px);
}
.templates {
  max-width: 300px;
  width: 100%;
  padding: 15px 5px 0 0;
}
.templates__recommended {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
  height: 200px;
  overflow-y: scroll;
  align-items: flex-start;
}

.template {
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #069cfa;
  border-radius: 5px;
  color: #fff;
  font-size: 1.1rem;
  transition: 0.2s ease-in-out;
}

.template:hover {
  background-color: #1771f1;
}

.template + .template {
  margin-left: 5px;
}

// .drop-zone {
//   min-width: 200px;
//   min-height: 100px;
// }
// .drop-zone__active {
//   padding: 5px;
//   border: 2px dashed darkgray;
//   animation: border-dance 1s infinite ease-in-out;
// }

// @keyframes border-dance {
//   0% {
//     border-color: darkgray;
//   }
//   50% {
//     border-color: #000;
//   }
//   100% {
//     border-color: darkgray;
//   }
// }
</style>
