<template>
  <div class="tags">
    <h2 class="tags-title">Теги</h2>
    <b-input class="search-tag" placeholder="Найти тег" v-model="searchTag" />
    <div
      v-for="(tag, indexTag) in filteredTags"
      :key="indexTag"
      class="tag-block"
    >
      <Tag :tag="tag" @selectedTags="eventSelectedStatus" />
    </div>
  </div>
</template>

<script>
import Tag from "./Tag";
import { mapState } from "vuex";

export default {
  name: "TagOrders",
  components: {
    Tag
  },
  data: () => ({
    tags: [
      { name: "a", count: "01" },
      { name: "b", count: "02" },
      { name: "c", count: "40" },
      { name: "d", count: "50" },
      { name: "e", count: "07" },
      { name: "f", count: "0245" },
      { name: "g", count: "021" },
      { name: "l", count: "05" },
      { name: "mewr", count: "5670" },
      { name: "mdsf", count: "5670" },
      { name: "fghmfhg", count: "5670" },
      { name: "eyemery", count: "5670" }
    ],
    filteredTags: [],
    selectedTags: [],
    searchTag: ""
  }),
  created() {
    this.filteredTags = this.tags;
  },
  methods: {
    eventSelectedStatus(tagName) {
      if (this.selectedTags.length > 0) {
        if (this.selectedTags.includes(tagName)) {
          const id = this.selectedTags.indexOf(tagName);
          this.selectedTags = [
            ...this.selectedTags.slice(0, id),
            ...this.selectedTags.splice(id + 1)
          ];
        } else {
          this.selectedTags.push(tagName);
        }
      } else {
        this.selectedTags.push(tagName);
      }
      this.$store.commit("setItemFilterTag", this.selectedTags);
    }
  },
  // Todo: под вопросом данное решение. Если что , переделать
  watch: {
    searchTag(tagName) {
      if (!(tagName === "")) {
        this.filteredTags = this.tags.filter(item => {
          return item.name.toLowerCase().indexOf(tagName.toLowerCase()) > -1;
        });
      } else {
        this.filteredTags = this.tags;
      }
    },
    filterTag() {
      this.selectedTags = this.$store.state.SalesFunnel.filterTag.tags;
    }
  },
  computed: mapState(["filterTag"])
};
</script>

<style scoped lang="scss">
.tags {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 50%;
  margin-top: 20px;
}

.tags-title {
  margin-top: 9px;
  font-weight: 700;
  color: #363636;
}

.search-tag {
  width: 80%;
  margin: 36px 0 20px 0;
}

.tag-block {
  width: 200px;
  min-width: 50px;
  text-align: left;
}
</style>
