<template>
  <ul class="node">
    <li>
      <!-- <draggable
        :group="{ name: 'g1' }"
        class="dragArea list-group drop-here"
        tag="ul"
      > -->
      <div
        class="node__row"
        :class="{ node_hovered: isHover }"
        @mouseover="showBackground"
        @click.stop="emitClickItem(item)"
        @mouseleave="hideBackground"
        @click="toggle"
      >
        <b-icon
          v-if="isFolder"
          pack="fas"
          :icon="isOpen ? 'folder-open' : 'folder'"
          class="icon icon_folder"
        />
        <p class="node__name">
          {{ item[textFieldName] }}
        </p>
        <div v-if="isShowButtons" class="buttons">
          <b-tooltip
            position="is-top"
            type="is-white"
            :label="$t('treeView.moveUp')"
          >
            <b-button
              v-if="isShowArrowUp"
              class="btn_small"
              size="is-small"
              type="is-text"
              icon-pack="fas"
              icon-left="arrow-up"
              tag="a"
              @click.stop="emitMoveUpNode(item)"
            />
          </b-tooltip>
          <b-tooltip
            position="is-top"
            type="is-white"
            :label="$t('treeView.moveDown')"
          >
            <b-button
              v-if="isShowArrowDown"
              class="btn_small"
              size="is-small"
              type="is-text"
              icon-pack="fas"
              icon-left="arrow-down"
              tag="a"
              @click.stop="emitMoveDownNode(item)"
            />
          </b-tooltip>
          <b-tooltip
            position="is-top"
            type="is-white"
            :label="$t('treeView.addCategory')"
          >
            <b-button
              class="btn_small"
              size="is-small"
              type="is-text"
              icon-pack="fas"
              icon-left="plus"
              tag="a"
              @click.stop="emitAddNode(item)"
            />
          </b-tooltip>
          <b-tooltip
            position="is-top"
            type="is-white"
            :label="$t('treeView.editCategory')"
          >
            <b-button
              class="btn_small"
              size="is-small"
              type="is-text"
              icon-pack="fas"
              icon-left="pen"
              tag="a"
              @click.stop="emitEditNode(item)"
            />
          </b-tooltip>
          <b-tooltip
            position="is-top"
            type="is-white"
            :label="$t('treeView.deleteCategory')"
          >
            <b-button
              class="btn_small"
              size="is-small"
              type="is-text"
              icon-pack="fas"
              icon-left="trash"
              tag="a"
              @click.stop="emitDeleteNode(item)"
            />
          </b-tooltip>
        </div>
      </div>
      <div v-show="isOpen" v-if="isFolder" class="child">
        <Tree
          v-for="(el, index) in item[childrenNodeFieldName]"
          :key="index"
          :item="el"
          :level="level"
          :isFirstItem="index === 0"
          :isLastItem="index === item[childrenNodeFieldName].length - 1"
          :marginSize="marginSize"
          :childrenNodeFieldName="childrenNodeFieldName"
          :childrenItemsFieldName="childrenItemsFieldName"
          :isShowButtonByHover="isShowButtonByHover"
          :textFieldName="textFieldName"
          :isSingle="item[childrenNodeFieldName].length === 1"
          :isShowItemsInNode="isShowItemsInNode"
          :isShowInstruments="isShowInstruments"
          @EditNodeEvent="emitEditNode"
          @EditItemEvent="emitEditItem"
          @MoveUpNodeEvent="emitMoveUpNode"
          @MoveDownNodeEvent="emitMoveDownNode"
          @AddNodeEvent="emitAddNode"
          @MoveUpItemEvent="emitMoveUpItem"
          @MoveDownItemEvent="emitMoveDownItem"
          @DeleteNodeEvent="emitDeleteNode"
          @DeleteItemEvent="emitDeleteItem"
          @ClickEvent="emitClickItem"
        />
        <draggable
          v-if="isShowItemsInNode"
          :list="item[childrenItemsFieldName]"
          :group="{ name: 'formItems', pull: 'clone', put: false }"
          :sort="false"
        >
          <div
            v-for="(template, index_t) in item[childrenItemsFieldName]"
            :key="index_t + '_child_' + template.name"
            class="node__row"
            :data-template-id="template.id"
            @click.stop="emitClickItem(item)"
          >
            <b-icon
              v-if="isOpen"
              pack="far"
              icon="file"
              class="icon icon_folder"
            />
            {{ template[textFieldName] }}
            <div class="buttons-items">
              <b-tooltip
                position="is-top"
                type="is-white"
                :label="$t('treeView.moveUp')"
              >
                <b-button
                  v-if="index_t !== 0"
                  class="btn_small"
                  size="is-small"
                  type="is-text"
                  icon-pack="fas"
                  icon-left="arrow-up"
                  tag="a"
                  @click.stop="emitMoveUpItem(template)"
                />
              </b-tooltip>
              <b-tooltip
                position="is-top"
                type="is-white"
                :label="$t('treeView.moveDown')"
              >
                <b-button
                  v-if="index_t !== item[childrenItemsFieldName].length - 1"
                  class="btn_small"
                  size="is-small"
                  type="is-text"
                  icon-pack="fas"
                  icon-left="arrow-down"
                  tag="a"
                  @click.stop="emitMoveDownItem(template)"
                />
              </b-tooltip>
              <b-tooltip
                position="is-top"
                type="is-white"
                :label="$t('treeView.editTemplate')"
              >
                <b-button
                  class="btn_small"
                  size="is-small"
                  type="is-text"
                  icon-pack="fas"
                  icon-left="pen"
                  tag="a"
                  @click.stop="emitEditItem(template)"
                />
              </b-tooltip>
              <b-tooltip
                position="is-top"
                type="is-white"
                :label="$t('treeView.deleteTemplate')"
              >
                <b-button
                  class="btn_small"
                  size="is-small"
                  type="is-text"
                  icon-pack="fas"
                  icon-left="trash"
                  tag="a"
                  @click.stop="emitDeleteItem(template)"
                />
              </b-tooltip>
            </div>
          </div>
        </draggable>
      </div>
      <!-- </draggable> -->
    </li>
  </ul>
</template>
<script lang="ts">
// TODO: refactor scripts, logic and styles
import { Vue, Component, Prop } from "vue-property-decorator";
import Draggable from "vuedraggable";
import TreeItem from "@/shared/classes/Tree/Tree.class";

@Component({
  name: "Tree",
  components: {
    Draggable
  }
})
export default class Tree extends Vue {
  @Prop() item!: TreeItem;
  @Prop({ default: 1 }) level!: number;
  @Prop({ default: true }) isLastItem!: boolean;
  @Prop({ default: true }) isFirstItem!: boolean;
  @Prop({ default: "name" }) textFieldName!: string;
  @Prop({ default: "next" }) childrenNodeFieldName!: string;
  @Prop({ default: "name" }) childrenItemsFieldName!: string;
  @Prop({ default: 20 }) marginSize!: number;
  @Prop({ default: true }) isShowButtonByHover!: boolean;
  @Prop({ default: false }) isSingle!: boolean;
  @Prop({ default: true }) isShowItemsInNode!: boolean;
  @Prop({ default: true }) isShowInstruments!: boolean;

  isOpen: boolean = false;
  isHover: boolean = false;

  editCategory(item: TreeItem) {
    this.$router.push({ name: "edit-category", params: { name: item.name } });
  }

  toggle() {
    if (this.isFolder) {
      this.isOpen = !this.isOpen;
    }
  }

  emitMoveUpNode(item: TreeItem) {
    this.$emit("MoveUpNodeEvent", item);
  }

  emitMoveDownNode(item: TreeItem) {
    this.$emit("MoveDownNodeEvent", item);
  }

  emitAddNode(item: TreeItem) {
    this.$emit("AddNodeEvent", item);
  }

  emitDeleteNode(item: TreeItem) {
    this.$emit("DeleteNodeEvent", item);
  }

  emitMoveUpItem(item: TreeItem) {
    this.$emit("MoveUpItemEvent", item);
  }

  emitMoveDownItem(item: TreeItem) {
    this.$emit("MoveDownItemEvent", item);
  }

  emitEditNode(item: TreeItem) {
    this.$emit("EditNodeEvent", item);
  }

  emitEditItem(item: TreeItem) {
    this.$emit("EditItemEvent", item);
  }

  emitDeleteItem(item: TreeItem) {
    this.$emit("DeleteItemEvent", item);
  }

  emitClickItem(item: TreeItem) {
    this.$emit("ClickEvent", item);
  }

  showBackground() {
    this.isHover = true;
  }

  hideBackground() {
    this.isHover = false;
  }

  get isFolder() {
    return this.item && this.item.id;
  }

  get isShowArrowUp() {
    return this.isLastItem
      ? !this.isFirstItem
      : !this.isLastItem && !this.isFirstItem;
  }

  get isShowArrowDown() {
    return this.isFirstItem
      ? !this.isLastItem
      : !this.isLastItem && !this.isFirstItem;
  }

  get isShowButtons() {
    return (this.isHover || !this.isShowButtonByHover) && this.isShowInstruments;
  }
}
</script>
<style scoped lang="scss">
.node {
  cursor: pointer;
}

.node__row {
  display: flex;
  padding: 10px;
  align-items: center;
}

.node_hovered {
  background-color: #f1f1f1;
}

.child {
  .node__row {
    margin-left: 30px;
    padding-left: 30px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

.icon {
  font-size: 1rem;
}

.icon_folder {
  margin-right: 5px;
}

.icon_button {
  font-size: 0.8rem;
}

.node__name {
  padding: 1px;
  margin: 0;
  text-align: center;

  &:hover {
    background-color: #f1f1f1;
  }
}

:hover {
  .buttons-items {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}

.btn {
  padding: 0;
  margin: 0;
  width: 23px;
  height: 23px;
  font-size: 0.9rem;
  border-radius: 50%;

  &:hover {
    filter: brightness(80%);

    .icon_button {
      color: #000;
    }
  }

  &_success {
    background-color: lightseagreen;
  }

  &_danger {
    background-color: #b95555;
    color: #fff;
  }

  &_warning {
    background-color: #e8e85d;
  }

  &_blue {
    background-color: #5dcee8;
  }

  & + btn {
    margin-left: 5px !important;
  }
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.1s ease-in-out;
  margin-left: 10px;

  &:last-child {
    margin-top: auto;
    margin-bottom: auto;
  }

  .button {
    margin-top: auto;
    margin-bottom: auto;
  }
}

.show {
  display: flex;
}

ul {
  list-style: none;
}

.buttons-items {
  display: none;
}

ul {
  margin-bottom: 0rem;
}

.btn_small {
  text-decoration: none;
  width: 20px !important;
  height: 20px !important;
}

.icon_small {
  font-size: 0.8rem !important;
}
</style>
