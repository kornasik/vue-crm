<template>
  <div class="add-payment">
    <section>
      <div class="add-payment__select-client">
        <h2>{{ $t("paymentManagement.selectClient") }}</h2>
        <multiselect
          v-model="client"
          :options="clients"
          :close-on-select="true"
          :clear-on-select="false"
          :preserve-search="true"
          :placeholder="$t('paymentManagement.selectDoctor')"
          :preselect-first="true"
        ></multiselect>
      </div>

      <div class="add-payment__select-payer">
        <h2>{{ $t("paymentManagement.selectPayer") }}</h2>
        <multiselect
          v-model="payer"
          :options="payers"
          :close-on-select="true"
          :clear-on-select="false"
          :preserve-search="true"
          :placeholder="$t('paymentManagement.selectDoctor')"
          :preselect-first="true"
        ></multiselect>
      </div>
      <div class="add-payment__currency">
        <h2>
          {{ $t("paymentManagement.currency") }}
          {{ $t("paymentManagement.and") }}
          {{ $t("paymentManagement.amount") }}
          {{ $t("paymentManagement.payment") }}
        </h2>
        <b-field>
          <b-select placeholder="Currency" v-model="currency">
            <option>$ (USD)</option>
            <option>£ (GBP)</option>
            <option>€ (EUR)</option>
          </b-select>
          <b-input
            type="float"
            step="0.0001"
            placeholder="0.00"
            custom-class="add-payment__amount"
            v-model="amount"
          ></b-input>
        </b-field>
      </div>

      <div class="add-payment__appointment">
        <h2>{{ $t("paymentManagement.appointment") }}</h2>
        <b-field>
          <b-input maxlength="100" type="text" v-model="appointment"></b-input>
        </b-field>
      </div>

      <div class="add-payment__status-paid">
        <h2>
          {{ $t("paymentManagement.statusPaid") }}
        </h2>
        <b-checkbox v-model="checkbox" custom-class="add-payment__status-paid">
          {{ $t("paymentManagement.paid") }}
        </b-checkbox>
      </div>
    </section>

    <b-button
      type="is-success"
      class="add-payment__create-payment"
      @click.native="createPayment"
      >{{ $t("paymentManagement.createPayment") }}</b-button
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Multiselect from "vue-multiselect";
import { Getter, Mutation } from "vuex-class";
@Component({
  components: {
    Multiselect
  }
})
export default class AddPayment extends Vue {
  @Mutation("setPaymentList") setPaymentList: any;

  @Getter("getPaymentList") paymentList: any;

  appointment: string = "";
  amount: string = "";
  currency: string = "$ (USD)";
  checkbox: boolean = false;
  client: string[] = [];
  clients: string[] = ["Client 1", "Client 2", "Client 3", "Client 4"];
  payer: string[] = [];
  payers: string[] = ["Payer 1", "Payer 2", "Payer 3", "Payer 4"];

  createPayment() {
    const copyPaymentList = [...this.paymentList];

    copyPaymentList.push({
      id: copyPaymentList.length + 1,
      appointment: this.appointment,
      currency: this.currency,
      status: this.checkbox,
      client: this.client,
      payer: this.payer,
      amount: this.amount
    });
    this.setPaymentList(copyPaymentList);
    localStorage.setItem("payment-management", JSON.stringify(copyPaymentList));
    this.$router.go(-1);
  }
}
</script>

<style lang="scss">
@import "~vue-multiselect/dist/vue-multiselect.min.css";
.add-payment {
  display: block;
  width: 500px;
  margin: 0 auto;

  &__status-paid {
    display: flex;
    margin-bottom: 10px;
  }

  &__create-payment {
    width: 100%;
  }

  &__amount {
    width: 100%;
  }

  &__status-paid{
    margin: 0 auto;
  }
}

h2 {
  margin: 10px 0;
  font-size: 15px;
  font-weight: bold;
}
</style>
