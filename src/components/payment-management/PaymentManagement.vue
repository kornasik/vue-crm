<template>
  <div>
    <b-button
      type="is-success"
      class="payment-management"
      @click.native="$router.push('payment-management/add-payment')"
      >{{ $t("paymentManagement.addPayment") }}</b-button
    >
    <b-table :data="paymentList">
      <template slot-scope="props">
        <b-table-column label="ID" width="20" numeric centered>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column :label="$t('paymentManagement.client')" centered>
          {{ props.row.client }}
        </b-table-column>

        <b-table-column :label="$t('paymentManagement.payer')" centered>
          {{ props.row.payer }}
        </b-table-column>

        <b-table-column :label="$t('paymentManagement.appointment')" centered>
          {{ props.row.appointment }}
        </b-table-column>

        <b-table-column :label="$t('paymentManagement.amount')" centered>
          {{ props.row.amount }}
        </b-table-column>

        <b-table-column :label="$t('paymentManagement.currency')" centered>
          {{ props.row.currency }}
        </b-table-column>

        <b-table-column :label="$t('paymentManagement.status')" centered>
          <b-icon
            pack="fas"
            :icon="props.row.status === true ? 'check' : 'times'"
            size="is-small"
            :style="{ color: props.row.status === true ? 'green' : 'red' }"
          >
          </b-icon>
        </b-table-column>
        <b-table-column :label="$t('paymentManagement.actions')" centered>
          <b-icon
            pack="fas"
            icon="edit"
            size="is-small"
            class="payment-management__status-payment"
            @click.native="editPayment(props.row.id)"
          >
          </b-icon>
          <b-icon
            pack="fas"
            icon="trash-alt"
            size="is-small"
            class="payment-management__status-payment"
            :id="props.row.id"
            @click.native="deletePayment"
          >
          </b-icon>
        </b-table-column>
      </template>
    </b-table>

    <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <EditPayment
          :idMutableEntries="idMutableEntries"
          @emitCloseModalEditPayment="closeModalEditPayment"
        />
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Mutation } from "vuex-class";
import AddOrEditPayment from "@/components/payment-management/components/AddPayment.vue";
import EditPayment from "@/components/payment-management/components/EditPayment.vue";
import { paymentItem } from "@/types/payment-management";

@Component({
  components: {
    AddOrEditPayment,
    EditPayment
  }
})
export default class PaymentManagement extends Vue {
  @Mutation("setPaymentList") setPaymentList: any;

  @Getter("getPaymentList") paymentList: any;
  isCardModalActive: boolean = false;

  idMutableEntries: number = 0;

  columns: any = [
    {
      field: "id",
      label: "ID",
      width: "40",
      numeric: true,
      centered: true
    },
    {
      field: "client",
      label: "Client",
      centered: true
    },
    {
      field: "payer",
      label: "Плательщик",
      centered: true
    },
    {
      field: "appointment",
      label: "Назначение",
      centered: true,
      width: 200
    },
    {
      field: "amount",
      label: "Сумма",
      centered: true
    },
    {
      field: "currency",
      label: "Валюта",
      centered: true
    },
    {
      field: "status",
      label: "Статус",
      centered: true
    }
  ];

  editPayment(id: number) {
    this.isCardModalActive = true;
    this.idMutableEntries = id - 1;
  }

  deletePayment(event: any) {
    const copyPaymentList = [...this.paymentList];
    copyPaymentList.splice(event.target.parentElement.id - 1, 1);
    copyPaymentList.forEach(
      (copyPaymentItem: paymentItem, copyPaymentIndex: number) => {
        copyPaymentItem.id = copyPaymentIndex + 1;
      }
    );
    this.setPaymentList(copyPaymentList);
    localStorage.setItem("payment-management", JSON.stringify(copyPaymentList));
    this.$buefy.snackbar.open("Запись удалена.");
  }

  closeModalEditPayment(payload: boolean) {
    this.isCardModalActive = payload;
    this.$buefy.snackbar.open("Запись изменена.");
  }

  created() {
    if (JSON.parse(localStorage.getItem("payment-management") as string)) {
      this.setPaymentList(
        JSON.parse(localStorage.getItem("payment-management") as string)
      );
    }
  }
}
</script>

<style lang="scss">
.payment-management {
  margin: 30px 30px 30px auto;
  display: block;
  &__status-payment {
    margin: 0 5px;
  }
}
</style>
