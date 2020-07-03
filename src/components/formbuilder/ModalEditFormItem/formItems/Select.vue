<template>
  <ControlWrapper
    :isValid="!$v.select.$invalid"
    @cancel="handleCancel"
    @saveFormItem="handleAddFormItem"
  >
    <template v-slot:create>
      <h3 class="title">{{ $t("formBuilder.label") }}</h3>
      <b-field
        :type="
          $v.select.label.$invalid && $v.select.label.$dirty
            ? 'is-danger'
            : 'is-success'
        "
      >
        <b-input
          v-model="$v.select.label.$model"
          @blur="emitValueChange('label', $v.select.label.$model)"
        />
      </b-field>
      <label class="required-wrapper">
        <b-checkbox
          type="checkbox"
          :value="$v.select.$model.required.$model"
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
          v-for="(item, index) in $v.select.options.$each.$iter"
        >
          <b-input
            expanded
            v-model.trim="item.name.$model"
            @blur="emitValueChange('options', select.options)"
          />
          <p class="control">
            <b-button
              class="button"
              type="is-danger"
              icon-pack="fas"
              icon-left="times"
              @click="removeSelectOption(index)"
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
        :class="{ view_subtitle__required: select.required }"
        >{{ select.label }}</label
      >
      <b-select>
        <option
          v-for="option in select.options"
          :key="option.name"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </b-select>
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
      select: Object
    };
  },
  validations: {
    select: {
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
        this.select = Object.assign({}, val);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    addNewOption() {
      const newOptionPosition = this.select.options.length + 1;
      this.select.options.push({
        name: `Option-${newOptionPosition}`,
        value: `option-${newOptionPosition}`,
        refId: ""
      });
      this.emitValueChange("options", this.select.options);
    },
    removeSelectOption(index) {
      this.select.options.splice(index, 1);
      this.emitValueChange("options", this.select.options);
    },
    handleAddFormItem() {
      if (!this.$v.select.$invalid) {
        this.$emit("saveFormItem");
      } else {
        this.$v.select.$touch();
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
