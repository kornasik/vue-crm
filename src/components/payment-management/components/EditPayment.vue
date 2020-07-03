<template>
  <div class="edit-payment">
    <section>
      <div class="edit-payment__select-client">
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

      <div class="edit-payment__select-payer">
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
      <div class="edit-payment__currency">
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
            class="add-payment__amount"
            v-model="amount"
          ></b-input>
        </b-field>
      </div>

      <div class="edit-payment__appointment">
        <h2>{{ $t("paymentManagement.appointment") }}</h2>
        <b-field>
          <b-input maxlength="100" type="text" v-model="appointment"></b-input>
        </b-field>
      </div>

      <div class="edit-payment__status-paid">
        <h2>
          {{ $t("paymentManagement.statusPaid") }}
        </h2>
        <b-checkbox
          v-model="status"
          class="edit-payment__status-paid__checkbox"
        >
          {{ $t("paymentManagement.paid") }}
        </b-checkbox>
      </div>
    </section>

    <b-button
      type="is-success"
      class="edit-payment__create-payment"
      @click.native="editPayment"
      >{{ $t("paymentManagement.changeDataPayment") }}</b-button
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
  },
  props: {
    idMutableEntries: Number,
    isCardModalActive: Boolean
  }
})
export default class EditPayment extends Vue {
  @Mutation("setPaymentList") setPaymentList: any;

  @Getter("getPaymentList") getPaymentList: any;

  idMutableEntries: number | any;
  appointment: string = "";
  amount: string = "";
  currency: string = "$ (USD)";
  status: boolean = false;
  client: string[] = [];
  clients: string[] = ["Client 1", "Client 2", "Client 3", "Client 4"];
  payer: string[] = [];
  payers: string[] = ["Payer 1", "Payer 2", "Payer 3", "Payer 4"];

  editPayment() {
    const copyPaymentList = [...this.getPaymentList];

    copyPaymentList[this.idMutableEntries].appointment = this.appointment;
    copyPaymentList[this.idMutableEntries].currency = this.currency;
    copyPaymentList[this.idMutableEntries].status = this.status;
    copyPaymentList[this.idMutableEntries].client = this.client;
    copyPaymentList[this.idMutableEntries].payer = this.payer;
    copyPaymentList[this.idMutableEntries].amount = this.amount;

    localStorage.setItem("payment-management", JSON.stringify(copyPaymentList));
    this.setPaymentList(copyPaymentList);

    this.$emit("emitCloseModalEditPayment", false);
  }

  created() {
    const copyPaymentList = [...this.getPaymentList];
    this.appointment = copyPaymentList[this.idMutableEntries].appointment;
    this.amount = copyPaymentList[this.idMutableEntries].amount;
    this.currency = copyPaymentList[this.idMutableEntries].currency;
    this.status = copyPaymentList[this.idMutableEntries].status;
    this.client = copyPaymentList[this.idMutableEntries].client;
    this.payer = copyPaymentList[this.idMutableEntries].payer;
  }
}
</script>

<style lang="scss">
@import "~vue-multiselect/dist/vue-multiselect.min.css";
.edit-payment {
  display: block;
  width: 500px;
  margin: 0 auto;
  padding: 40px;
  &__status-payment {
    margin: 0 5px;
  }
  &__status-paid {
    display: flex;
    margin-bottom: 10px;
    &__checkbox{
      margin: 0 auto;
    }
  }
  &__create-payment {
    width: 100%;
  }
  &__amount {
    width: 100%;
  }
}

h2 {
  margin: 10px 0;
  font-size: 15px;
  font-weight: bold;
}
</style>
