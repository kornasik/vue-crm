<template>
  <div class="container">
    <h1>Currencies List</h1>
    <button class="btn btn-primary m-2" @click="getAll">
      <span class="oi">All</span>
    </button>
    <button class="btn btn-success m-2" @click="getEnabled">
      <span class="oi">Enabled</span>
    </button>
    <button class="btn btn-danger m-2" @click="getDisabled">
      <span class="oi">Disabled</span>
    </button>
    <div
      class="row line-margin"
      v-bind:key="currency.id"
      v-for="currency in filteredCurrencies"
    >
      <div class="col-sm-2">{{ currency.code }}</div>
      <div class="col-sm-2">
        <input
          type="checkbox"
          v-model="currency.enabled"
          @change="updateCurrencies(currency.id, currency.enabled)"
        />
      </div>
    </div>
    <div class="line-margin"></div>
  </div>
</template>

<script>
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";

export default {
  name: "app",
  data() {
    return {
      currencies: [],
      filteredCurrencies: [],
      caller: "default"
    };
  },
  methods: {
    getAll() {
      this.caller = "default";
      this.filteredCurrencies = this.currencies;
    },
    getEnabled() {
      this.caller = "enabled";
      this.filterResults(true);
    },
    getDisabled() {
      this.caller = "disabled";
      this.filterResults(false);
    },
    filterResults(enable) {
      this.filteredCurrencies = this.currencies.filter(function(item) {
        return item.enabled === enable;
      });
    },
    updateCurrencies: function(id, enabled) {
      var value = enabled ? 1 : 0;
      api(httpClient)
        .currencies.updateById(id, value)
        .then(res => {
          if (res.status === 200) {
            if (this.caller === "enabled") {
              this.getEnabled();
            } else if (this.caller === "disabled") {
              this.getDisabled();
            } else {
              this.getAll();
            }
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted: function() {
    api(httpClient)
      .currencies.getList()
      .then(res => {
        if (res.status === 200) {
          this.currencies = this.filteredCurrencies = res.data.currencies;
        } else {
          console.log("Error get patient form");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
