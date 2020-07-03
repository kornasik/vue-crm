<template>
  <div>
    <section class="user-invitation">
      <h1>{{ $t("userInvitation.title") }}</h1>
      <b-field
        :type="$v.name.$error ? 'is-danger' : 'is-white'"
        :label="$t('userInvitation.name')"
        :message="$v.name.$error ? $t('userInvitation.textErrorFieldName') : ''"
      >
        <b-input v-model.trim="$v.name.$model" />
      </b-field>

      <b-field
        :type="$v.surname.$error ? 'is-danger' : 'is-white'"
        :label="$t('userInvitation.surname')"
        :message="
          $v.surname.$error ? $t('userInvitation.textErrorFieldSurname') : ''
        "
      >
        <b-input v-model="$v.surname.$model" />
      </b-field>

      <b-field :label="$t('userInvitation.role')">
        <b-select v-model="$v.role.$model" placeholder="Select a role">
          <option value="1">Role 1</option>
          <option value="2">Role 2</option>
          <option value="3">Role 3</option>
          <option value="4">Role 4</option>
        </b-select>
      </b-field>

      <b-field
        label="E-mail"
        :type="$v.email.$error ? 'is-danger' : 'is-white'"
        :message="
          $v.email.$error ? $t('userInvitation.textErrorFieldEmail') : ''
        "
      >
        <b-input type="email" v-model="$v.email.$model" maxlength="30">
        </b-input>
      </b-field>

      <b-field
        class="user-invitation__description"
        :label="$t('userInvitation.description')"
        :label-position="labelPosition"
      >
        <b-input v-model="description" maxlength="200" type="textarea" />
      </b-field>
      <b-button type="is-primary" @click.native="sendInvitation">{{
        $t("userInvitation.sendInvitation")
      }}</b-button>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    name: {
      required
    },
    surname: {
      required
    },
    role: {
      required
    },
    email: {
      required
    }
  }
})
export default class UserInvitation extends Vue {
  name: string = "";
  surname: string = "";
  email: string = "";
  role: string = "1";
  description: string = "";
  labelPosition: string = "on-border";

  sendInvitation() {
    if (!(this.name && this.surname && this.email)) {
      this.$buefy.snackbar.open({
        type: "is-danger",
        message: this.$t("userInvitation.incompleteData") as string
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.user-invitation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  margin: 40px 0 0 calc(50% - 250px);
}

.user-invitation h1 {
  font-size: 30px;
  color: #069cfa;
  margin-bottom: 30px;
}
</style>
