<template>
  <div>
    <Breadcrumbs />
    <div class="form-container">
      <header class="form-container__header">
        <b-button
          type="is-success"
          icon-pack="fas"
          icon-left="plus"
          @click="openCreateFormModal"
        >
          {{ $t("formBuilder.addNewForm") }}
        </b-button>
      </header>

      <template v-if="!showFormBuilder && forms">
        <div class="form" v-for="(form, i) in forms" :key="i">
          <span class="form__label">
            {{ getName(form) }}
          </span>
          <div class="form__actions">
            <o-button
              class="form__button"
              @click="editForm(form.id)"
              icon-pack="fas"
              icon-left="pencil-alt"
            >
              {{ $t("general.edit") }}
            </o-button>
            <o-button class="form__button" @click="show(form.id)">
              {{ $t("general.view") }}
            </o-button>
            <o-button class="form__button" @click="deleteForm(form.id)">
              {{ $t("general.delete") }}
            </o-button>
          </div>
        </div>
      </template>

      <ModalAddForm
        v-if="isShowModalAdd"
        @addForm="handleAddForm"
        @closeModal="isShowModalAdd = false"
      ></ModalAddForm>

      <o-loading :isShow="isLoading" />
    </div>
  </div>
</template>

<script>
import { eventEmmitter } from "@/main";
import FormBuilder from "@/components/formbuilder/FormBuilder.vue";
import ModalAddForm from "@/components/formbuilder/ModalAddForm.vue";
import { mapGetters, mapActions } from "vuex";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import OButton from "@/components/shared/OButton/OButton.vue";
import OLoading from "@/components/shared/OLoading.vue";
import { showSnackBar_success } from "@/shared/notifications";
import { isExist } from "@/shared/utils";

export default {
  data() {
    return {
      dialog: false,
      isShowModalAdd: false,
      showFormBuilder: false,
      dataForm: null,
      refId: null,
      isLoading: true
    };
  },
  components: {
    ModalAddForm,
    Breadcrumbs,
    OButton,
    OLoading
  },
  computed: {
    ...mapGetters({
      forms: "formbuilder/FORMS"
    })
  },
  methods: {
    openCreateFormModal() {
      this.isShowModalAdd = true;
    },
    editForm(id) {
      this.$router.push(`/settings/formbuilder/${id}`);
    },
    show(id) {
      this.$router.push(`/settings/formbuilder/view/${id}`);
    },
    ...mapActions("formbuilder", [
      "getFormList",
      "createForm",
      "deleteFormById"
    ]),
    async handleAddForm(formAddRequest) {
      try {
        const resAddedForm = await this.createForm(formAddRequest);
        this.isShowModalAdd = false;
        showSnackBar_success(this.$t("general.saved"));
        this.$router.push(`/settings/formbuilder/${resAddedForm.data.form.id}`);
      } catch (e) {
        console.error(e);
      }
    },
    async deleteForm(id) {
      try {
        if (confirm(this.$t("general.isDelete"))) {
          await this.deleteFormById(id);
          showSnackBar_success(this.$t("general.saved"));
        }
      } catch (e) {
        console.error(e);
      }
    },
    getName(form) {
      return `${form.name} (${form.form_type_id})`;
    }
  },
  async created() {
    await this.getFormList();
    this.isLoading = false;
  }
};
</script>

<style lang="scss" scoped>
.form-container__header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 50px 10px;
}

.form {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  transition: 0.1s ease-in-out;
  & + .form:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #f2f2f2;
    left: 50%;
    transform: translateX(-50%);
  }
  &:hover {
    background-color: #fff;
  }
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.form__button + .form__button {
  margin-left: 10px;
}
</style>
