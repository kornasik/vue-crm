<template>
  <div>
    <Breadcrumbs />
    <FormViewer :form="form" @sumbitForm="handleSubmitForm($event)" />
    <o-loading :isShow="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import FormViewer from "@/components/FormViewer/FormViewer.vue";
import OLoading from "@/components/shared/OLoading.vue";

export default {
  data() {
    return {
      form: Object,
      isLoading: true
    };
  },
  components: {
    Breadcrumbs,
    FormViewer,
    OLoading
  },
  methods: {
    ...mapActions({
      getFormById: "getFormById"
    }),
    async getForm() {
      const id = +this.$route.params.id;
      if (id) {
        this.form = await this.getFormById(id);
        this.isLoading = false;
      }
    },
    handleSubmitForm(submittedForm) {
      alert(JSON.stringify(submittedForm));
    }
  },
  created() {
    this.form = null;
    this.getForm();
  }
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  border: 1px solid #212121;
  border-radius: 20%;
  width: 190px;
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 20px;
  transition: 0.1s ease-in-out;
  &:hover {
    i {
      transform: scale(1.3);
      color: #57af3c !important;
    }
  }
  .icon {
    i {
      font-size: 40px;
      color: #2c339e;
      transition: 0.3s linear;
    }
  }
  &__label {
    text-align: center;
  }
}
.form-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
