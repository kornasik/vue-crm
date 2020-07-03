<template>
  <b-button
    :type="type"
    :icon-left="iconLeft"
    :icon-pack="iconPack"
    :size="size"
    @click="$emit('click')"
  >
    <slot></slot>
  </b-button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "o-button"
})
export default class OButton extends Vue {
  @Prop({ default: "is-light" }) type!: string;
  @Prop({ required: false }) iconLeft!: string;
  @Prop({ required: false, default: "fas" }) iconPack!: string;
  @Prop({ required: false }) size!: string;
}
</script>
