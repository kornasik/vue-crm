<template>
  <div class="container container table table-striped">
    <div class="row">
      <div>
        <notifications group="app" position="top center" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <ul
          class="list-group"
          v-bind:key="group.id"
          v-for="group in unitsGroup"
        >
          <li
            class="list-group-item list-group-item-action"
            :class="{ active: selectedGroupId === group.id }"
            @click="getUnits(group.id)"
          >
            {{ group.name.toUpperCase() }}
          </li>
        </ul>
      </div>
      <div class="col-md-8">
        <button class="btn btn-primary m-2" @click="getAll">
          <span class="oi">All</span>
        </button>
        <button class="btn btn-success m-2" @click="getEnabled">
          <span class="oi">Enabled</span>
        </button>
        <button class="btn btn-danger m-2" @click="getDisabled">
          <span class="oi">Disabled</span>
        </button>
        <div class="row">
          <div class="col-md-12 pt-5">
            <div class="row" v-bind:key="unit.id" v-for="unit in filteredUnits">
              <div class="col-sm-2 pt-2">
                {{ unit.name.toUpperCase() }} ({{ unit.code.toLowerCase() }})
              </div>
              <div class="col-sm-2 pt-2">
                <input
                  type="checkbox"
                  v-model="unit.enabled"
                  @change="updateUnits(unit.id, unit.enabled)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <h1>Set pack for Country</h1>
        <div class="pt-2" v-bind:key="country.id" v-for="country in countries">
          <div
            class="btn btn-primary country"
            @click="setCountryPack(country.id, country.name)"
          >
            {{ country.name.toUpperCase() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   getUnitsListByGroupId,
//   getUnitsGroupList,
//   getCountriesList,
//   updateEnableAbility,
//   setCountryPack
// } from "../../../api/common/units.api";
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";
export default {
  name: `app`,
  data() {
    return {
      unitsGroup: [],
      units: [],
      countries: [],
      filteredUnits: [],
      caller: `default`,
      selectedGroupId: ``
    };
  },
  methods: {
    getUnits(groupId) {
      api(httpClient)
        .units.getListByGroupId(groupId)
        .then(res => {
          if (res.status === 200) {
            this.units = this.filteredUnits = res.data.units;
          } else {
            console.log(`Error get patient form`);
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.selectedGroupId = groupId;
    },
    getAll() {
      this.caller = `default`;
      this.filteredUnits = this.units;
    },
    getEnabled() {
      this.caller = `enabled`;
      this.filterResults(true);
    },
    getDisabled() {
      this.caller = `disabled`;
      this.filterResults(false);
    },
    filterResults(enable) {
      this.filteredUnits = this.units.filter(function(item) {
        return item.enabled === enable;
      });
    },
    setCountryPack(id, name) {
      api(httpClient)
        .countries.setPack(id)
        .then(res => {
          if (res.status === 200) {
            this.getUnits(this.selectedGroupId);
            this.$notify({
              group: `app`,
              text: `The units pack for ` + name + ` was set!`,
              type: `success`
            });
          } else {
            console.log(`Error get patient form`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateUnits: function(id, enabled) {
      var value = enabled ? 1 : 0;
      api(httpClient)
        .units.updateEnableAbility(id, value)
        .then(res => {
          if (res.status === 200) {
            if (this.caller === `enabled`) {
              this.getEnabled();
            } else if (this.caller === `disabled`) {
              this.getDisabled();
            } else {
              this.getAll();
            }
          } else {
            console.log(`Error get patient form`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted: function() {
    api(httpClient)
      .unitsGroup.getList()
      .then(res => {
        if (res.status === 200) {
          this.unitsGroup = res.data.unitsGroup;
          this.selectedGroupId = this.unitsGroup[0].id;
          this.getUnits(this.selectedGroupId);
        } else {
          console.log(`Error get patient form`);
        }
      })
      .catch(err => {
        console.log(err);
      });
    api(httpClient)
      .countries.getList()
      .then(res => {
        if (res.status === 200) {
          this.countries = res.data.countries;
        } else {
          console.log(`Error get patient form`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.list-group-item,
.country {
  cursor: pointer;
}
</style>
