<template>
  <div>
    <div class="tree">
      <div v-if="isShowInstruments" class="buttons-block">
        <o-button @click="addRootNode">
          <b-icon class="icon_button" pack="fas" icon="plus" />
          {{ $t("manipulations.addRoot") }}
        </o-button>
      </div>
      <input
        v-if="false"
        class="tree-search"
        type="text"
        placeholder="Search..."
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
          :isShowItemsInNode="isShowItemsInNode"
          :isShowInstruments="isShowInstruments"
          @MoveUpNodeEvent="moveUpNode"
          @MoveDownNodeEvent="moveDownNode"
          @AddNodeEvent="addToCategory"
          @DeleteNodeEvent="deleteNode($event, treeList, childrenNodeFieldName)"
          @MoveUpItemEvent="
            moveUpManipulation($event, treeList, childrenNodeFieldName)
          "
          @EditNodeEvent="editNode"
          @MoveDownItemEvent="
            moveDownManipulation($event, treeList, childrenNodeFieldName)
          "
          @DeleteItemEvent="
            deleteManipulation($event, treeList, childrenNodeFieldName)
          "
          @EditItemEvent="editManipulation"
          @ClickEvent="getClickedElement"
        />
      </div>
    </div>
    <!-- TODO: split modal to 2 components -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <form>
          <v-card v-if="isEditNode">
            <v-card-title>
              <span class="headline">{{
                $t("manipulations.editingManipulation")
              }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      :error="$v.validationGroupCategory.name.$error"
                      v-model="$v.validationGroupCategory.name.$model"
                      :label="$t('manipulations.name')"
                      required
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeModal">{{
                $t("manipulations.close")
              }}</v-btn>
              <v-btn color="blue darken-1" text @click="saveNodeEdit">{{
                $t("manipulations.save")
              }}</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <v-card-title>
              <span class="headline">
                {{
                  editingItem
                    ? $t("manipulations.editingManipulation")
                    : $t("manipulations.addingManipulation")
                }}</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <header class="text-left title font-weight-bold">
                      {{ $t("manipulations.title") }}
                    </header>
                  </v-col>
                  <o-field
                    :label="$t('manipulations.title') + ' *'"
                    :type="
                      $v.manipulationForm.manipulationName.$error
                        ? 'is-danger'
                        : 'is-success'
                    "
                    :message="
                      $v.manipulationForm.manipulationName.$error
                        ? $t('manipulations.fillManipulationName')
                        : ''
                    "
                  >
                    <o-input
                      type="text"
                      v-model.trim="$v.manipulationForm.manipulationName.$model"
                    >
                    </o-input>
                  </o-field>
                  <o-field
                    class="multiselect-wrapper"
                    :label="$t('general.icd')"
                  >
                    <!-- <o-multiselect
                      v-model="selectedIcdDiseases"
                      :options="diseases"
                    /> -->
                    <multiselect
                      v-model="selectedIcdDiseases"
                      :options="icds_1"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :multiple="true"
                      :limit="2"
                      track-by="id"
                      label="name"
                    />
                  </o-field>
                </v-row>

                <v-row>
                  <v-col class="px-4">
                    <o-field :label="$t('manipulations.price')">
                      <b-numberinput
                        icon-pack="fas"
                        @input="calculateManipulationSum(quantities)"
                        v-model="manipulationPurePrice"
                        min="0"
                      ></b-numberinput>
                    </o-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <header class="text-left title font-weight-bold">
                      {{ $t("manipulations.reagents") }}
                    </header>
                  </v-col>
                  <v-col
                    v-for="(reagent, i) in reagents"
                    :key="reagent.id"
                    cols="6"
                    sm="6"
                    md="4"
                  >
                    <b-checkbox
                      v-model="$v.manipulationForm.selectedReagents.$model"
                      class="mx-2"
                      @input="calculateManipulationSum(quantities)"
                      :nativeValue="reagent.id"
                      :id="`reagent-${reagent.id}`"
                      >{{ reagent.name }}
                      <o-input
                        v-model="quantities[i]"
                        type="number"
                        min="1"
                        :disabled="!isReagentSelected(reagent.id)"
                        @input="calculateManipulationSum(quantities)"
                      />
                    </b-checkbox>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <header class="text-left title font-weight-bold">
                      {{ $t("manipulations.currency") }}
                    </header>
                  </v-col>

                  <v-col
                    v-for="currency in currencies"
                    :key="currency.id"
                    cols="6"
                    sm="6"
                    md="4"
                  >
                    <b-radio
                      v-model="$v.manipulationForm.currency.$model"
                      :native-value="currency.id"
                      >{{ currency.code }}</b-radio
                    >
                  </v-col>
                </v-row>
                <div class="modal_row">
                  <h3>{{ $t("manipulations.reagents") }}</h3>
                  <h3>
                    <b>{{ totalReagentsPrice }}</b>
                  </h3>
                </div>
                <div class="modal_row">
                  <h3>{{ $t("manipulations.actions") }}</h3>
                  <h3>
                    <b>{{ manipulationPurePrice }}</b>
                  </h3>
                </div>
                <div class="modal_row">
                  <h3>{{ $t("manipulations.sum") }}</h3>
                  <h3>
                    <b>{{ totalManipulationPrice }}</b>
                  </h3>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <o-button type="is-light" @click="closeModal">{{
                $t("manipulations.close")
              }}</o-button>
              <o-button
                type="is-success"
                @click="addManipulation(quantities)"
                >{{ $t("manipulations.save") }}</o-button
              >
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import OField from "@/components/shared/OField/OField.vue";
import OButton from "@/components/shared/OButton/OButton.vue";
import OInput from "@/components/shared/OInput/OInput.vue";
import OCheckbox from "@/components/shared/OCheckbox/OCheckbox.vue";
import ORadio from "@/components/shared/ORadio/ORadio.vue";
import OMultiselect from "@/components/shared/OMultiselect.vue";
import OTree from "@/components/shared/OTree.vue";
import { mapActions, mapGetters } from "vuex";
import multiselect from "vue-multiselect";

import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";

import {
  required,
  numeric,
  minValue,
  minLength,
  integer
} from "vuelidate/lib/validators";
import { showSnackBar_success } from "@/shared/notifications";
import { isExist } from "../../shared/utils";
export default {
  name: "app-templates",
  components: {
    OTree,
    OButton,
    OField,
    OInput,
    multiselect
  },
  props: {
    isShowItemsInNode: {
      type: Boolean,
      default: true
    },
    isShowInstruments: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    treeList: [],
    childrenNodeFieldName: "childs",
    childrenItemsFieldName: "manipulations",
    dialog: false,
    isEditNode: false,
    name: "",
    content: "",
    editingCategory: null,
    editingItem: null,
    editingNode: null,
    reagents: [],
    currencies: [],
    manipulationPurePrice: 1,
    manipulationName: "",
    selectedReagents: [],
    currency: 0,
    quantities: [],
    totalManipulationPrice: 0,
    totalReagentsPrice: 0,
    checkedNames: [],
    selectedIcdDiseases: []
  }),
  validations: {
    name: { required },
    manipulationName: { required },
    selectedReagents: {
      required,
      minLength: minLength(1),
      $each: {
        required
      }
    },
    currency: {
      required,
      integer,
      minValue: minValue(1)
    },
    manipulationPurePrice: {
      required,
      integer,
      minValue: minValue(1)
    },
    validationGroupCategory: ["name"],
    manipulationForm: [
      "manipulationName",
      "selectedReagents",
      "currency",
      "manipulationPurePrice"
    ]
  },
  computed: {
    ...mapGetters("icd", ["icds_1"])
  },
  methods: {
    ...mapActions("icd", ["getIcds"]),
    initialize() {
      api(httpClient)
        .manipulationsCategory.getList()
        .then(response => {
          this.treeList = response.data.categories;
        });
      api(httpClient)
        .reagents.getList()
        .then(response => {
          this.reagents = response.data.reagents;
          const defaultReagentQuantity = 1;
          this.reagents.forEach(reagent => {
            this.quantities.push(defaultReagentQuantity);
          });
        });
      api(httpClient)
        .currencies.getListByEnabledId(0)
        .then(response => {
          this.currencies = response.data.currencies;
        });
      this.getIcds();
    },
    getClickedElement: function(item) {
      this.$emit("clickedElement", item);
      console.log("getClickedElement", item);
    },
    addRootNode: function() {
      const newRootName = prompt(
        this.$t("manipulations.rootCategoryName").toString()
      );
      if (newRootName) {
        const newTemplate = {
          name: newRootName
        };
        api(httpClient)
          .manipulationsCategory.create(newTemplate)
          .then(res => {
            const addedRootCategory = res.data.category;
            this.treeList.push(addedRootCategory);
          });
      }
    },
    addToCategory: function(item) {
      const createdTypeName = prompt(
        this.$t("manipulations.createTemplateOrCategory").toString(),
        "template"
      );
      if (createdTypeName === "template") {
        this.dialog = true;
        this.editingCategory = item;
      } else if (createdTypeName === "category") {
        let newCategoryName = "";
        let isNameUnique = false;
        do {
          newCategoryName = prompt(
            this.$t("manipulations.enterCategory").toString()
          );
          if (newCategoryName) {
            if (this.isNameExists(item, newCategoryName)) {
              isNameUnique = false;
              alert(this.$t("manipulations.categoryAlreadyExist"));
            } else {
              isNameUnique = true;
            }
          } else {
            break;
          }
        } while (!isNameUnique);
        if (newCategoryName) {
          const newCategory = {
            name: newCategoryName,
            parent_id: item.id
          };
          api(httpClient)
            .manipulationsCategory.create(newCategory)
            .then(res => {
              const addedCategory = res.data.category;
              item[this.childrenNodeFieldName].push(addedCategory);
            });
        }
      }
    },
    deleteNode: function(item, treeList, childrenNodeFieldName) {
      // TODO: update positions after deleted elements
      if (confirm(this.$t("manipulations.deleteCategory").toString())) {
        const isMerge = +!!confirm(
          this.$t("manipulations.mergeChildren").toString()
        );
        api(httpClient)
          .manipulationsCategory.deleteById(item.id, Boolean(0))
          .then(res => {
            if (+item.level === 0) {
              this.treeList = this.treeList.filter(c => c.id !== item.id);
              if (isMerge) {
                const mergedNodes = res.data.categories;
                this.treeList.push(...mergedNodes);
              }
            } else {
              const parent = this.getObjByPropertyAndValue(
                treeList,
                "id",
                item.parent_id,
                childrenNodeFieldName
              );
              parent[childrenNodeFieldName].filter(n => n.id !== item.id);
            }
          });
      }
    },
    editNode: function(item) {
      this.isEditNode = true;
      this.name = item.name;
      this.editingNode = item;
      this.dialog = true;
    },
    moveUpNode: function(item) {
      if (+item.level === 0) {
        const index = this.treeList.indexOf(item);
        const oldPosition = this.treeList[index].position;
        const newPosition = this.treeList[index - 1].position;
        api(httpClient)
          .manipulationsCategory.changePosition({
            positions: [
              { id: this.treeList[index].id, position: newPosition },
              {
                id: this.treeList[index - 1].id,
                position: oldPosition
              }
            ]
          })
          .then(res => {
            this.treeList[index].position = newPosition;
            this.treeList[index - 1].position = oldPosition;
            this.treeList.sort(this.sortPositionAsc);
          });
      } else {
        const parent = this.getObjByPropertyAndValue(
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
          .manipulationsCategory.changePosition({
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
    moveDownNode: function(item) {
      if (+item.level === 0) {
        const index = this.treeList.indexOf(item);
        const oldPosition = this.treeList[index].position;
        const newPosition = this.treeList[index + 1].position;
        api(httpClient)
          .manipulationsCategory.changePosition({
            positions: [
              { id: this.treeList[index].id, position: newPosition },
              {
                id: this.treeList[index + 1].id,
                position: oldPosition
              }
            ]
          })
          .then(res => {
            this.treeList[index].position = newPosition;
            this.treeList[index + 1].position = oldPosition;
            this.treeList.sort(this.sortPositionAsc);
          });
      } else {
        const parent = this.getObjByPropertyAndValue(
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
          .manipulationsCategory.changePosition({
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
    saveNodeEdit: function() {
      if (this.isEditNode) {
        if (!this.$v.validationGroupCategory.$invalid) {
          api(httpClient)
            .manipulationsCategory.changeById(this.editingNode.id, {
              name: this.$v.validationGroupCategory.name.$model
            })
            .then(res => {
              showSnackBar_success(
                this.$t("manipulation.successfullyUpdated").toString()
              );
              this.editingNode.name = this.$v.validationGroupCategory.name.$model;
              this.editingNode = null;
              this.closeModal();
              this.isEditNode = false;
              this.$v.validationGroupCategory.reset();
            });
        }
      }
    },
    addManipulation: function(quantities) {
      if (!this.$v.manipulationForm.$invalid) {
        const form = this.$v.manipulationForm;
        const selectedIcdDiseases = this.selectedIcdDiseases || [];
        if (this.editingItem) {
          const editingManipulation = {
            id: this.editingItem.id,
            name: form.manipulationName.$model,
            currency_id: +form.currency.$model,
            price: +this.manipulationPurePrice,
            icd_list: this.selectedIcdDiseases.map(disease => disease.id),
            reagents: form.selectedReagents.$model.map(selectedReagentId => {
              const reagentIndex = this.reagents.findIndex(
                ragent => ragent.id === selectedReagentId
              );
              return {
                id: this.reagents[reagentIndex].id,
                quantity: +quantities[reagentIndex]
              };
            })
          };
          api(httpClient)
            .manipulations.changeById(editingManipulation)
            .then(res => {
              showSnackBar_success(
                this.$t("manipulation.successfullyUpdated").toString()
              );
              this.editingItem.name = editingManipulation.name;
              this.editingItem.currency_id = editingManipulation.currency_id;
              this.editingItem.price = editingManipulation.price;
              this.editingItem.icd_list = editingManipulation.icd_list;
              this.editingItem.reagents = editingManipulation.reagents;
              this.editingCategory = null;
              this.clearForm();
              this.closeModal();
            });
        } else {
          const categoryId = this.editingCategory.id;
          const newManipulation = {
            name: form.manipulationName.$model,
            currency_id: +form.currency.$model,
            category_id: +categoryId,
            price: +this.totalManipulationPrice,
            icd_list: selectedIcdDiseases.map(disease => disease.id),
            reagents: form.selectedReagents.$model.map(selectedReagentId => {
              const reagentIndex = this.reagents.findIndex(
                ragent => ragent.id === selectedReagentId
              );
              return {
                id: this.reagents[reagentIndex].id,
                quantity: +quantities[reagentIndex]
              };
            })
          };
          api(httpClient)
            .manipulations.create(newManipulation)
            .then(res => {
              this.editingCategory[this.childrenItemsFieldName].push(
                res.data.manipulation
              );
              showSnackBar_success(
                this.$t("manipulation.successfullAdded").toString()
              );
              this.editingCategory = null;
              this.clearForm();
              this.closeModal();
            });
        }
      } else {
        alert(this.$t("manipulations.fillAllFields"));
      }
    },
    editManipulation: function(item) {
      this.editingItem = item;
      this.$v.manipulationForm.manipulationName.$model = item.name;
      this.$v.manipulationForm.selectedReagents.$model = [];
      const reagents = this.reagents;
      const quantities = this.quantities;
      item.reagents.forEach((reagent, i) => {
        this.$v.manipulationForm.selectedReagents.$model.push(reagent.id);
        const reagentIndex = reagents.findIndex(r => r.id === reagent.id);
        this.quantities[reagentIndex] = reagent.quantity;
      });
      this.$v.manipulationForm.currency.$model = item.currency_id;
      this.$v.manipulationForm.manipulationPurePrice.$model = item.price;
      this.calculateManipulationSum();
      this.dialog = true;
    },
    moveUpManipulation: function(item) {
      const parent = this.getCategoryByPropertyAndValue(
        this.treeList,
        "id",
        item.category_id
      )[0];
      if (parent) {
        const index = parent[this.childrenItemsFieldName].indexOf(item);
        const parentManipulations = parent[this.childrenItemsFieldName];
        const oldPosition = parentManipulations[index].position;
        const newPosition = parentManipulations[index - 1].position;
        api(httpClient)
          .manipulations.changePositions({
            positions: [
              { id: parentManipulations[index].id, position: newPosition },
              { id: parentManipulations[index - 1].id, position: oldPosition }
            ]
          })
          .then(res => {
            parentManipulations[index].position = newPosition;
            parentManipulations[index - 1].position = oldPosition;
            parentManipulations.sort(this.sortPositionAsc);
          });
      }
    },
    moveDownManipulation: function(item) {
      const parent = this.getCategoryByPropertyAndValue(
        this.treeList,
        "id",
        item.category_id
      )[0];
      if (parent) {
        const index = parent[this.childrenItemsFieldName].indexOf(item);
        const parentManipulations = parent[this.childrenItemsFieldName];
        const oldPosition = parentManipulations[index].position;
        const newPosition = parentManipulations[index + 1].position;
        api(httpClient)
          .manipulations.changePositions({
            positions: [
              { id: parentManipulations[index].id, position: newPosition },
              { id: parentManipulations[index + 1].id, position: oldPosition }
            ]
          })
          .then(res => {
            parentManipulations[index].position = newPosition;
            parentManipulations[index + 1].position = oldPosition;
            parentManipulations.sort(this.sortPositionAsc);
          });
      }
    },
    deleteManipulation: function(item) {
      // TODO: update positions after deleted elements
      if (confirm(this.$t("manipulations.doYouWantToDelete").toString())) {
        api(httpClient)
          .manipulations.deleteById(item.id)
          .then(res => {
            const parent = this.getObjByPropertyAndValue(
              this.treeList,
              "id",
              item.category_id,
              this.childrenNodeFieldName
            );
            parent[this.childrenItemsFieldName] = parent[
              this.childrenItemsFieldName
            ].filter(t => t.id !== item.id);
          });
      }
    },
    closeModal: function() {
      this.dialog = false;
      this.isEditNode = false;
      this.clearForm();
    },
    sortPositionAsc: (a, b) => {
      return +a.position - +b.position;
    },
    clearForm: function() {
      this.$v.manipulationForm.selectedReagents.$model = [];
      this.$v.manipulationForm.currency.$model = 0;
      this.$v.manipulationForm.manipulationPurePrice.$model = 1;
      this.$v.manipulationForm.manipulationName.$model = "";
      this.$v.manipulationForm.$reset();
    },
    isNameExists(item, name) {
      return item["childs"].filter(ch => ch.name === name).length > 0;
    },
    getObjByPropertyAndValue(array, key, value, arrayPropName) {
      var o;
      array.some(function iter(a) {
        if (parseInt(a[key]) === parseInt(value)) {
          o = a;
          return true;
        }
        return Array.isArray(a[arrayPropName]) && a[arrayPropName].some(iter);
      });
      return o;
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
    calculateManipulationSum: function(quantities) {
      const form = this.$v.manipulationForm;
      this.totalReagentsPrice = 0;
      if (isExist(form, "selectedReagents", "$model", "length")) {
        const selectedReagents = form.selectedReagents.$model;
        for (let i = 0; i < form.selectedReagents.$model.length; i++) {
          const reagentIndex = this.reagents.findIndex(
            reagent => reagent.id === form.selectedReagents.$model[i]
          );
          if (reagentIndex > 0) {
            this.totalReagentsPrice +=
              this.reagents[reagentIndex].price * quantities[reagentIndex];
          }
        }
      }
      this.totalManipulationPrice =
        this.totalReagentsPrice + this.manipulationPurePrice;
    },
    isReagentSelected: function(id) {
      return this.$v.manipulationForm.selectedReagents.$model.includes(id);
    }
  },
  mounted: function() {
    this.initialize();
  },
  watch: {
    quantities: {
      handler: function(val, oldVal) {
        this.calculateManipulationSum(this.quantities);
      },
      deep: true
    }
  }
};
</script>
<style scoped lang="scss">
@import "~vue-multiselect/dist/vue-multiselect.min.css";
.tree {
  position: relative;
  border: 1px solid #f1f1f1;
  margin-left: 20px;
  overflow: scroll;
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
.reagent {
  display: flex;
  align-items: center;
}
.modal_row {
  display: flex;
  justify-content: space-between;
}
</style>
