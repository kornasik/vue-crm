<template>
  <ControlWrapper
    :isValid="!$v.input.$invalid"
    @cancel="handleCancel"
    @saveFormItem="handleAddFormItem"
  >
    <template v-slot:create>
      <h3 class="title">{{ $t("formBuilder.label") }}</h3>
      <b-field
        :type="
          $v.input.label.$invalid && $v.input.label.$dirty
            ? 'is-danger'
            : 'is-success'
        "
      >
        <b-input
          v-model.trim="$v.input.label.$model"
          @blur="handleValueChange('label', $v.input.label.$model)"
        />
      </b-field>
      <label class="required-wrapper">
        <b-checkbox
          type="checkbox"
          :value="input.required"
          @input="handleValueChange('required', $event)"
        />
        <span>{{ $t("formBuilder.required") }}</span>
      </label>
    </template>
    <template v-slot:view>
      <h3 class="title">{{ $t("formBuilder.preview") }}</h3>
      <label
        class="view_subtitle"
        :class="{ view_subtitle__required: input.required }"
        >{{ input.label }}</label
      >
      <b-input disabled />
    </template>
  </ControlWrapper>
</template>

<script>
import ControlWrapper from "./ControlWrapper.vue";
import { required, minLength } from "vuelidate/lib/validators";
import { showToast_danger } from "@/shared/notifications";

export default {
  components: {
    ControlWrapper
  },
  props: {
    value: Object
  },
  data() {
    return {
      input: Object
    };
  },
  validations: {
    input: {
      label: {
        required,
        minLength: minLength(1)
      }
    }
  },
  watch: {
    value: {
      handler: function(val) {
        this.input = Object.assign({}, val);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleAddFormItem() {
      if (!this.$v.input.$invalid) {
        this.$emit("saveFormItem");
      } else {
        this.$v.input.$touch();
        showToast_danger(this.$t("formBuilder.needToCheckFields"));
      }
    },
    handleValueChange(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
    },
    handleCancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.25rem !important;
  font-weight: 500;
  line-height: 2rem;
  margin-bottom: 1.5rem;
}

.subtitle {
  display: flex;
  width: 100%;
  margin: 0;
  padding: 10px 0 5px;
  font-size: 1.15rem !important;
  font-weight: 500;
  line-height: 1.5rem;
}

.view_subtitle {
  display: flex;
  position: relative;
  width: 100%;
  margin: 0;
  padding: 10px 0 5px;
  font-size: 1.15rem !important;
  font-weight: 500;
  line-height: 1.5rem;
  &__required:after {
    content: "*";
    font-size: 24px;
    color: red;
  }
}

.checkbox-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  justify-content: flex-start;
  max-height: 330px;
  overflow-y: scroll;
}

.checkbox-wrapper {
  display: flex;
  width: 50%;
}

.required-wrapper {
  padding: 10px 0 0 0;
}

.options-list__wrapper {
  max-height: 250px;
  overflow-y: scroll;
}
</style>
