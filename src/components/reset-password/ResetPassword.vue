<template>
  <div>
    <div class="reset-password" v-if="processResetPassword">
      <div class="reset-password__title">
        {{ $t("resetPassword.title") }}
      </div>
      &nbsp;&nbsp;
      <span class="reset-password__description">
        {{ $t("resetPassword.description") }}
      </span>
      <div class="reset-password__field-for-email">
        <b-field horizontal>
          <template slot="label">
            E-mail
            <b-tooltip type="is-dark" :label="$t('resetPassword.tooltip')">
              <b-icon
                pack="fas"
                size="is-small"
                icon="question-circle"
              ></b-icon>
            </b-tooltip>
          </template>
          <b-input type="email" size="is-medium" v-model="email" />
        </b-field>
      </div>
      <b-button
        class="reset-password__button"
        type="is-primary"
        @click.native="resetPassword"
        >{{ $t("resetPassword.button") }}</b-button
      >
    </div>
    <div v-else>
      <b-notification
        icon-pack="fas"
        type="is-success"
        has-icon
        aria-close-label="Close notification"
      >
        {{ $t("resetPassword.successfulNotification") }}
      </b-notification>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class ResetPassword extends Vue {
  email: String = "";
  processResetPassword: Boolean = true;

  resetPassword() {
    if (this.email) {
      if (this.email.split("").includes("@")) {
        this.processResetPassword = false;
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      } else {
        this.$buefy.snackbar.open(
          this.$t("resetPassword.wrongFormat") as string
        );
      }
    } else {
      this.$buefy.snackbar.open(
        this.$t("resetPassword.mailNotEntered") as string
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__title {
    font-size: 36px;
    color: #069cfa;
  }
  &__description {
    font-size: 14px;
    opacity: 0.6;
  }
  &__field-for-email {
    background-color: lightgray;
    border-radius: 10px;
    border: 1px solid gray;
    padding: 20px;
    margin-top: 20px;
    width: 500px;
  }
  &__button {
    margin-top: 20px;
  }
}
</style>
