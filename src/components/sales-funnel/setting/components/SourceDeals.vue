<template>
  <div class="sale-funnel__setting-source-deals">
    <div class="sale-funnel__setting-source-deals__select-source">
      <b-field>
        <b-select
          v-model="selectedSource"
          placeholder="Select a source"
          class="sale-funnel__setting-source-deals__select-source__item"
          size="is-large"
          expanded
        >
          <option
            v-for="(itemSource, indexSource) in sources"
            :value="itemSource.value"
            :key="indexSource"
          >
            {{ itemSource.label }}
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="sale-funnel__setting-source-deals__add-source">
      <h2 class="sale-funnel__setting-source-deals__add-source__title">
        Источник сделок
      </h2>
      <span>У вас пока нет ни одного источника.</span><br />
      <span
        >Добавьте источники, из которых сделки будут попадать в воронку.</span
      ><br>
      <b-button
        class="sale-funnel__setting-source-deals__add-source__btn"
        size="is-primary"
      >
        <b-icon pack="fas" icon="plus" size="is-small" />
        Добавить
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class SourceDeals extends Vue {
  selectedSource: string | null = null;
  sources: any = [
    { label: "source1", value: "source1" },
    { label: "source2", value: "source2" },
    { label: "source3", value: "source3" },
    { label: "source4", value: "source4" }
  ];

  updated() {
    console.log(this.selectedSource);
  }
}
</script>

<style lang="scss">
.sale-funnel {
  &__setting-source-deals {
    width: 300px;
    height: 100vh;
    background-color: #f9f9f9;

    &__select-source {
      &__item select {
        border: none;
        border-bottom: 1px solid lightgray;
        border-right: 1px solid lightgray;
        border-radius: 0;
      }

      &__item select:focus {
        border-color: lightgray;
        -webkit-box-shadow: none;
        box-shadow: none;
      }
    }

    &__add-source {
      border-right: 1px solid lightgray;
      padding: 20px;
      font-size: 14px;

      &__title {
        text-transform: uppercase;
        margin-bottom: 20px;
        font-weight: bold;
      }

      &__btn {
        margin-top: 20px;
      }
    }
  }
}
</style>
