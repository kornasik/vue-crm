<template>
  <ControlWrapper
    :isValid="!$v.radio.$invalid"
    @cancel="handleCancel"
    @saveFormItem="handleAddFormItem"
  >
    <template v-slot:create>
      <h3 class="title">{{ $t("formBuilder.label") }}</h3>
      <b-field
        :type="
          $v.radio.label.$invalid && $v.radio.label.$dirty
            ? 'is-danger'
            : 'is-success'
        "
      >
        <b-input
          v-model="$v.radio.label.$model"
          @blur="emitValueChange('label', $v.radio.label.$model)"
        />
      </b-field>
      <label class="required-wrapper">
        <b-checkbox
          type="checkbox"
          :value="$v.radio.$model.required.$model"
          @input="emitValueChange('required', $event)"
        />
        <span>{{ $t("formBuilder.required") }}</span>
      </label>

      <h4 class="subtitle">{{ $t("formBuilder.addParams") }}</h4>
      <div class="options-list__wrapper">
        <b-field
          :type="
            item.name.$invalid && item.name.$dirty ? 'is-danger' : 'is-success'
          "
          :key="index"
          v-for="(item, index) in $v.radio.options.$each.$iter"
        >
          <b-input
            expanded
            v-model.trim="item.name.$model"
            @input="emitValueChange('options', radio.options)"
          />
          <p class="control">
            <b-button
              class="button"
              type="is-danger"
              icon-pack="fas"
              icon-left="times"
              @click="removeRadioOption(index)"
            />
          </p>
        </b-field>
      </div>
      <b-button type="is-success" @click="addNewOption">{{
        $t("formBuilder.addParam")
      }}</b-button>
    </template>
    <template v-slot:view>
      <h3 class="title">{{ $t("formBuilder.preview") }}</h3>
      <label
        class="view_subtitle"
        :class="{ view_subtitle__required: radio.required }"
        >{{ radio.label }}</label
      >
      <div class="checkbox-list-wrapper">
        <div
          class="checkbox-wrapper"
          v-for="option in radio.options"
          :key="option.name"
        >
          <b-radio :native-value="option.value" name="radio">
            {{ option.name }}
          </b-radio>
        </div>
      </div>
    </template>
  </ControlWrapper>
</template>

<script>
import ControlWrapper from "./ControlWrapper.vue";
import { minLength, required } from "vuelidate/lib/validators";
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
      radio: Object
    };
  },
  validations: {
    radio: {
      label: {
        required,
        minLength: minLength(1)
      },
      options: {
        $each: {
          name: {
            required,
            minLength: minLength(1)
          }
        }
      }
    }
  },
  watch: {
    value: {
      handler: function(val) {
        this.radio = Object.assign({}, val);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    addNewOption() {
      const newOptionPosition = this.radio.options.length + 1;
      this.radio.options.push({
        name: `Option-${newOptionPosition}`,
        value: `option-${newOptionPosition}`,
        refId: ""
      });
      this.emitValueChange("options", this.radio.options);
    },
    removeRadioOption(index) {
      this.radio.options.splice(index, 1);
      this.emitValueChange("options", this.radio.options);
    },
    handleAddFormItem() {
      if (!this.$v.radio.$invalid) {
        this.$emit("saveFormItem");
      } else {
        this.$v.radio.$touch();
        showToast_danger(this.$t("formBuilder.needToCheckFields"));
      }
    },
    emitValueChange(key, value) {
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
.form-item_error {
  background-color: #ffe1e1;
}
</style>
