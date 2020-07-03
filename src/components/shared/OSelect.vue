<template>
  <b-select
    :placeholder="placeholder"
    :required="required"
    @input="onChange"
  >
    <slot></slot>
  </b-select>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

  @Component({
    name: 'o-select'
  })
  export default class OSelect extends Vue {
    @Prop({ default: '' }) value!: string;
    @Prop({ default: '' }) placeholder!: string;
    @Prop({ default: 'true' }) required!: boolean;
    @Prop({ default: '' }) options!: object;

    @Emit("input")
    onChange(value: string) {
      //this.$emit('onChange', value);
      return value;
    }
  }
</script>

<style scoped>

</style>
