<template>
  <div class="edit-tooth">
    <o-button
      class="tooth-card__go-back"
      type="is-info"
      @click.native="
        $router.push(
          `/settings/tooth-card/${$router.history.current.params.id}`
        )
      "
    >
      {{ $t("tooth_card.goBack") }}
    </o-button>
    <Teeth :show-children="true" :show-layouts="true" />
    <div class="edit-tooth__upload-image">
      <ul>
        <li>
          {{ $t("tooth_card.selectToothForChange") }}<br />
          <strong>{{
            selectedTooth === 0
              ? $t("tooth_card.noSelectTooth")
              : `${$t("tooth_card.selectedTooth")} ${selectedTooth}`
          }}</strong>
        </li>
        <li>
          {{ $t("tooth_card.selectFile") }}
          <UploadImageTooth />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Teeth from "../../../components/tooth-card-two-version/components/Teeth.vue";
import UploadImageTooth from "@/components/tooth-card-two-version/elements/UploadImageTooth.vue";
import { Getter } from "vuex-class";
import OButton from "@/components/shared/OButton/OButton.vue";

@Component({
  components: {
    Teeth,
    UploadImageTooth,
    OButton
  }
})
export default class EditTooth extends Vue {
  @Getter("toothCard/selectedTooth") selectedTooth: any;
}
</script>

<style lang="scss" scoped>
.edit-tooth {
  display: flex;
  width: fit-content;
}

.tooth-card__go-back {
  margin: 20px;
}

.edit-tooth__upload-image {
  padding: 60px;
}

.edit-tooth__upload-image ul {
  list-style-type: decimal;
}

.edit-tooth__upload-image ul li {
  padding: 10px 0;
}
</style>
