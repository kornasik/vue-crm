<template>
  <div class="reagents-wrapper">
    <h3>Реагенты</h3>
    <ul class="list list_reagents">
      <draggable
        :group="{ name: dragGroupName, pull: 'clone', put: false }"
        :list="reagents"
      >
        <li
          v-for="(reagent, index) in reagents"
          :key="'reagent' + index"
          :id="'reagent-' + reagent.id"
        >
          <b-tag type="is-primary" class="custom-tag">{{ reagent.name }}</b-tag>
        </li>
      </draggable>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Reagent } from "../../shared/classes/reagent";
import draggable from "vuedraggable";
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    draggable
  }
})
export default class ManipulationsList extends Vue {
  @Prop({ default: [] }) reagents!: Reagent[];
  @Prop({ default: "" }) dragGroupName!: String;
}
</script>
