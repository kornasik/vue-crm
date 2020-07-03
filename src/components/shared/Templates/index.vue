<template>
  <div>
    <div class="tree">
      <div class="buttons-block">
        <o-button @click="addRootNode">
          <b-icon class="icon_button" pack="fas" icon="plus" />
          {{ $t("templates.addRootCategory") }}
        </o-button>
      </div>
      <input
        v-if="false"
        class="tree-search"
        :placeholder="$t('general.search')"
      />
      <div class="tree-container">
        <o-tree
          v-for="(el, index) in treeList"
          :key="index"
          :item="el"
          :level="1"
          :isFirstItem="index === 0"
          :isLastItem="index === treeList.length - 1"
          :marginSize="10"
          :isShowButtonByHover="false"
          :childrenNodeFieldName="childrenNodeFieldName"
          :childrenItemsFieldName="childrenItemsFieldName"
          :isSingle="treeList.length === 1"
          @MoveUpNodeEvent="moveUpNode"
          @MoveDownNodeEvent="moveDownNode"
          @AddNodeEvent="addNode"
          @DeleteNodeEvent="deleteNode($event, treeList, childrenNodeFieldName)"
          @MoveUpItemEvent="moveUpItem($event, treeList, childrenNodeFieldName)"
          @EditNodeEvent="editNode"
          @MoveDownItemEvent="
            moveDownItem($event, treeList, childrenNodeFieldName)
          "
          @DeleteItemEvent="deleteItem($event, treeList, childrenNodeFieldName)"
          @EditItemEvent="editItem"
          @ClickEvent="getClickedElement"
        />
      </div>
    </div>

    <b-modal :active.sync="modalTemplate.isOpen" :width="640" scroll="clip">
      <EditTemplate
        :template="modalTemplate.template"
        :icdlist="icds_1"
        @addTemplate="handleAddTemplate"
        @editTemplate="handleEditTemplate"
      />
    </b-modal>

    <b-modal :active.sync="modalCategory.isOpen" :width="640" scroll="clip">
      <EditCategory
        :category="modalCategory.category"
        @addCategory="handleAddCategory"
        @editCategory="handleEditCategory"
      />
    </b-modal>
  </div>
</template>
<script>
import OTree from "@/components/shared/OTree.vue";
import { required } from "vuelidate/lib/validators";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
import multiselect from "vue-multiselect";
import EditTemplate from "@/components/shared/Templates/EditTemplate.vue";
import EditCategory from "@/components/shared/Templates/EditCategory.vue";
import OButton from "@/components/shared/OButton/OButton.vue";
import { mapActions, mapGetters } from "vuex";

import { isExist } from "@/shared/utils";

export default {
  name: "app-templates",
  components: {
    OTree,
    EditTemplate,
    EditCategory,
    OButton
  },
  data: () => ({
    treeList: [],
    childrenNodeFieldName: "childs",
    childrenItemsFieldName: "templates",
    modalTemplate: {
      template: null,
      isOpen: false
    },
    modalCategory: {
      category: null,
      isOpen: false
    },
    isEditNode: false,
    name: "",
    content: "",
    editingItem: null,
    selectedIcdDiseases: null
  }),
  computed: {
    ...mapGetters("icd", ["icds_1"])
  },
  validations: {
    name: { required },
    content: { required },
    validationGroupItem: ["name", "content"],
    validationGroupCategory: ["name"]
  },
  methods: {
    ...mapActions("icd", ["getIcds"]),
    moveUpNode: function(item) {
      if (+item.level === 0) {
        const index = this.treeList.indexOf(item);
        const oldPosition = this.treeList[index].position;
        const newPosition = this.treeList[index - 1].position;
        const poitions = [
          { id: this.treeList[index].id, position: newPosition },
          { id: this.treeList[index - 1].id, position: oldPosition }
        ];
        api(httpClient)
          .complaintTemplates.changePosition(poitions)
          .then(res => {
            this.treeList[index].position = newPosition;
            this.treeList[index - 1].position = oldPosition;
            this.treeList.sort(this.sortPositionAsc);
          });
      } else {
        const parent = this.getPropFromArrayByParentPropertyAndValue(
          this.treeList,
          "id",
          item.parent_id,
          this.childrenNodeFieldName
        );
        const parentChilds = parent[this.childrenNodeFieldName];
        const index = parentChilds.indexOf(item);
        const oldPosition = parentChilds[index].position;
        const newPosition = parentChilds[index - 1].position;
        api(httpClient)
          .complaintCategories.changePosition({
            positions: [
              { id: parentChilds[index].id, position: newPosition },
              { id: parentChilds[index - 1].id, position: oldPosition }
            ]
          })
          .then(res => {
            parentChilds[index].position = newPosition;
            parentChilds[index - 1].position = oldPosition;
            parent[this.childrenNodeFieldName].sort(this.sortPositionAsc);
          });
      }
    },
    async handleAddTemplate(newTemplate) {
      if (newTemplate) {
        try {
          newTemplate.category_id = +this.modalTemplate.category.id;
          const res = await api(httpClient).complaintTemplates.create(
            newTemplate
          );

          const addedTemplate = res.data.template;
          this.modalTemplate.category.templates.push(addedTemplate);

          this.modalTemplate.isOpen = false;
          this.modalTemplate.category = 0;
        } catch (e) {
          console.error(e);
        }
      }
    },
    async handleEditTemplate(template) {
      if (template) {
        try {
          const res = await api(httpClient).complaintTemplates.update(template);

          this.modalTemplate.template.name = template.name;
          this.modalTemplate.template.content = template.content;
          this.modalTemplate.template.icd_list = template.icd_list;

          this.modalTemplate.isOpen = false;
          this.modalTemplate.template = null;
        } catch (e) {
          console.error(e);
        }
      }
    },
    moveDownNode: function(item) {
      if (+item.level === 0) {
        const index = this.treeList.indexOf(item);
        const oldPosition = this.treeList[index].position;
        const newPosition = this.treeList[index + 1].position;
        api(httpClient)
          .complaintCategories.changePosition({
            positions: [
              { id: this.treeList[index].id, position: newPosition },
              { id: this.treeList[index + 1].id, position: oldPosition }
            ]
          })
          .then(res => {
            this.treeList[index].position = newPosition;
            this.treeList[index + 1].position = oldPosition;
            this.treeList.sort(this.sortPositionAsc);
          });
      } else {
        const parent = this.getPropFromArrayByParentPropertyAndValue(
          this.treeList,
          "id",
          item.parent_id,
          this.childrenNodeFieldName
        );
        const parentChilds = parent[this.childrenNodeFieldName];
        const index = parentChilds.indexOf(item);
        const oldPosition = parentChilds[index].position;
        const newPosition = parentChilds[index + 1].position;
        api(httpClient)
          .complaintCategories.changePosition({
            positions: [
              { id: parentChilds[index].id, position: newPosition },
              { id: parentChilds[index + 1].id, position: oldPosition }
            ]
          })
          .then(res => {
            parentChilds[index].position = newPosition;
            parentChilds[index + 1].position = oldPosition;
            parent[this.childrenNodeFieldName].sort(this.sortPositionAsc);
          });
      }
    },
    addNode: function(parentCategory) {
      const createdTypeName = prompt(
        this.$t("treeView.createTemplateOrCategory"),
        "category"
      );
      if (createdTypeName === "template") {
        this.modalTemplate.isOpen = true;
        this.modalTemplate.category = parentCategory;
      } else if (createdTypeName === "category") {
        this.modalCategory.isOpen = true;
        this.modalCategory.parentCategory = parentCategory;
      }
    },
    editNode: function(item) {
      this.modalCategory.category = item;
      this.modalCategory.isOpen = true;
    },
    editItem: function(item) {
      this.modalTemplate.template = item;
      this.modalTemplate.isOpen = true;
    },
    async handleAddCategory(newCategoryReq) {
      if (newCategoryReq) {
        try {
          newCategoryReq.parent_id = +this.modalCategory.parentCategory.id;
          newCategoryReq.level = +this.modalCategory.parentCategory.level + 1;
          const res = await api(httpClient).complaintCategories.create(
            newCategoryReq
          );
          const addedCategory = res.data.category;
          this.modalCategory.parentCategory.childs.push(addedCategory);

          this.modalCategory.isOpen = false;
          this.modalCategory.parentCategory = null;
        } catch (e) {
          console.error(e);
        }
      }
    },
    async handleEditCategory(category) {
      if (category) {
        try {
          const res = await api(httpClient).complaintCategories.update(
            category
          );

          this.modalCategory.category.name = category.name;

          this.modalCategory.isOpen = false;
          this.modalCategory.category = null;
        } catch (e) {
          console.error(e);
        }
      }
    },
    saveEdit: function() {
      if (this.isEditNode) {
        if (!this.$v.validationGroupCategory.$invalid) {
          updateTemplateCategory(this.editingItem.id, {
            name: this.$v.validationGroupCategory.name.$model
          }).then(res => {
            this.editingItem.name = this.$v.validationGroupCategory.name.$model;
            this.editingItem = null;
            this.isModalTemplateOpen = false;
            this.isEditNode = false;
          });
        }
      } else {
        if (!this.$v.validationGroupItem.$invalid) {
          updateTemplate(this.editingItem.id, {
            name: this.$v.validationGroupItem.name.$model,
            content: this.$v.validationGroupItem.content.$model,
            icd_list: this.selectedIcdDiseases.map(disease => disease.id)
          }).then(res => {
            this.editingItem.name = this.$v.validationGroupItem.name.$model;
            this.editingItem.content = this.$v.validationGroupItem.content.$model;
            this.editingItem = null;
            this.isModalTemplateOpen = false;
          });
        }
      }
    },
    closeModal: function() {
      this.isModalTemplateOpen = false;
    },
    addRootNode: function() {
      const newRootName = prompt(
        this.$t("treeView.rootCategoryName"),
        "root category name"
      );
      if (newRootName) {
        const newRootCategoryTemplateRequest = {
          name: newRootName
        };
        api(httpClient)
          .complaintCategories.create(newRootCategoryTemplateRequest)
          .then(res => {
            const addedRootCategory = res.data.category;
            this.treeList.push(addedRootCategory);
          });
      }
    },
    isNameExists(item, name) {
      return item["childs"].filter(ch => ch.name === name).length > 0;
    },
    deleteNode: function(item, treeList, childrenNodeFieldName) {
      // TODO: update positions after deleted elements
      if (confirm(this.$t("treeView.deleteCategory"))) {
        api(httpClient)
          .complaintCategories.delete(item.id)
          .then(res => {
            if (+item.level === 0) {
              this.treeList = this.treeList.filter(c => c.id !== item.id);
            } else {
              const parent = this.getPropFromArrayByParentPropertyAndValue(
                treeList,
                "id",
                item.parent_id,
                childrenNodeFieldName
              );
              parent[this.childrenNodeFieldName] = parent[
                this.childrenNodeFieldName
              ].filter(ch => ch.id !== item.id);
            }
          });
      }
    },
    moveUpItem: function(item) {
      const parent = this.getCategoryByPropertyAndValue(
        this.treeList,
        "id",
        item.category_id
      )[0];
      if (parent) {
        const index = parent[this.childrenItemsFieldName].indexOf(item);
        const parentTeamplates = parent[this.childrenItemsFieldName];
        const oldPosition = parentTeamplates[index].position;
        const newPosition = parentTeamplates[index - 1].position;
        api(httpClient)
          .complaintTemplates.changePosition({
            positions: [
              { id: parentTeamplates[index].id, position: newPosition },
              { id: parentTeamplates[index - 1].id, position: oldPosition }
            ]
          })
          .then(res => {
            parentTeamplates[index].position = newPosition;
            parentTeamplates[index - 1].position = oldPosition;
            parentTeamplates.sort(this.sortPositionAsc);
          });
      }
    },
    moveDownItem: function(item) {
      const parent = this.getCategoryByPropertyAndValue(
        this.treeList,
        "id",
        item.category_id
      )[0];
      if (parent) {
        const index = parent[this.childrenItemsFieldName].indexOf(item);
        const parentTeamplates = parent[this.childrenItemsFieldName];
        const oldPosition = parentTeamplates[index].position;
        const newPosition = parentTeamplates[index + 1].position;
        api(httpClient)
          .complaintTemplates.changePosition({
            positions: [
              { id: parentTeamplates[index].id, position: newPosition },
              { id: parentTeamplates[index + 1].id, position: oldPosition }
            ]
          })
          .then(res => {
            parentTeamplates[index].position = newPosition;
            parentTeamplates[index + 1].position = oldPosition;
            parentTeamplates.sort(this.sortPositionAsc);
          });
      }
    },
    deleteItem: function(item) {
      // TODO: update positions after deleted elements
      if (confirm(this.$t("treeView.doYouWantToDelete"))) {
        api(httpClient)
          .complaintTemplates.deleteById(item.id)
          .then(res => {
            const parent = this.getPropFromArrayByParentPropertyAndValue(
              this.treeList,
              "id",
              item.category_id,
              this.childrenNodeFieldName
            );
            parent.templates = parent.templates.filter(t => t.id !== item.id);
          });
      }
    },
    getClickedElement: function(item) {
      console.log("getClickedElement");
      console.log(item);
    },
    initialize: function() {
      api(httpClient)
        .complaintCategories.getList()
        .then(response => {
          if (isExist(response, "data", "categories")) {
            response.data.categories = response.data.categories.map(
              category => {
                if (!category.childs) {
                  category.childs = [];
                }
                return category;
              }
            );
            this.treeList = response.data.categories;
          }
        });
      this.getIcds();
    },
    getCategoryByPropertyAndValue(obj, key, val) {
      var objects = [];
      for (var i in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] === "object") {
          objects = objects.concat(
            this.getCategoryByPropertyAndValue(obj[i], key, val)
          );
        } else if (
          i === key &&
          parseInt(obj[key]) === parseInt(val) &&
          obj["treeId"]
        ) {
          objects.push(obj);
        }
      }
      return objects;
    },
    sortPositionAsc: (a, b) => {
      return +a.position - +b.position;
    }
  },
  created: function() {
    this.initialize();
  }
};
</script>
<style scoped lang="scss">
@import "~vue-multiselect/dist/vue-multiselect.min.css";
.tree {
  position: relative;
  border: 1px solid #f1f1f1;
  overflow: scroll;
  min-height: 300px;
  &-search {
    border-bottom: 1px solid #f1f1f1;
    padding: 3px 3px 3px 10px;
    width: 100%;
  }
}

.btn {
  padding: 0;
  margin: 0;
  min-width: 25px;
  min-height: 25px;
  border-radius: 50%;

  &:hover {
    filter: brightness(80%);
  }

  &_success {
    background-color: lightseagreen;
  }

  &_danger {
    background-color: darkred;
    color: #fff;
  }

  &_warning {
    background-color: yellow;
  }

  & + btn {
    margin-left: 5px !important;
  }
}

.custom-btn {
  padding: 0 !important;
  margin: 0 !important;
}

.btn_add-root {
  position: relative;
  border-bottom: 1px solid #f1f1f1;
}
</style>
