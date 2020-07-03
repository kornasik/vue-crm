<template>
  <div class="container table table-striped">
    <div class="row">
      <div>
        <!-- <notifications group="app" position="top center" /> -->
      </div>
      <div class="col-md-4" :class="{ 'col-md-12': !isShowInstruments }" >
        <ul
          class="list-group"
          v-bind:key="`manufacturer-${manufacturer.id}`"
          v-for="manufacturer in manufacturers"
        >
          <li
            class="list-group-item list-group-item-action"
            :class="{ active: selectedManufacturerId === manufacturer.id }"
            @click="getReagentsByManufacurerId(manufacturer.id)"
          >
            {{ manufacturer.name.toUpperCase() }}
          </li>
        </ul>
      </div>
      <div v-if="isShowInstruments" class="col-md-8">
        <div class="btn btn-primary pt-2" @click="createReagent()">
          <i class="fa fa-plus" style="margin-right: 10px;"></i>New
        </div>
        <div class="row form" v-show="form">
          <form class="col-md-12" @submit.prevent>
            <div class="container line-margin">
              <div class="row">
                <div class="col-sm-3"><label>Name</label></div>
                <div class="col-sm-3">
                  <input
                    v-model="values.name"
                    type="text"
                    placeholder="message"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="container line-margin">
              <div class="row">
                <div class="col-sm-3">
                  <label>Manufacturer</label>
                </div>
                <div class="col-sm-3">
                  <b-field>
                    <b-select v-model="values.manufacturer_id">
                      <option
                        v-for="manufacturer in manufacturers"
                        :value="manufacturer.id"
                        :key="manufacturer.id"
                      >
                        {{ manufacturer.name }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
            </div>
            <div class="container line-margin">
              <div class="row">
                <div class="col-sm-3">
                  <label>Units</label>
                </div>
                <div class="col-sm-3">
                  <b-field>
                    <b-select v-model="values.units_id">
                      <option
                        v-for="unit in units"
                        :value="unit.id"
                        :key="unit.id"
                      >
                        {{ unit.code }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
            </div>
            <div class="container line-margin">
              <div class="row">
                <div class="col-sm-3"><label for="price">Price</label></div>
                <div class="col-sm-3">
                  <input
                    v-model="values.price"
                    id="price"
                    type="text"
                    placeholder="message"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="container line-margin">
              <div class="row">
                <div class="col-sm-3"><label>Currency</label></div>
                <div class="col-sm-3">
                  <b-field>
                    <b-select v-model="values.currency_id">
                      <option
                        v-for="currency in currencies"
                        :value="currency.id"
                        :key="currency.id"
                      >
                        {{ currency.code }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
            </div>
            <button
              v-show="view"
              class="btn btn-success line-margin"
              @click="submitForm(reagentId)"
            >
              Save
            </button>
          </form>
        </div>
        <div class="row" v-show="reagents_show">
          <div class="col-md-12">
            <div
              v-bind:key="`reagent-${reagent.id}`"
              class="row pt-2"
              v-for="reagent in reagents"
            >
              <div class="col-md-4">{{ reagent.name.toUpperCase() }}</div>
              <div class="m-2">
                <i
                  class="fa fa-trash"
                  style="cursor:pointer"
                  @click="deleteReagent(reagent.id, reagent.name)"
                ></i>
              </div>
              <div class="m-2">
                <i
                  class="fa fa-pencil-alt"
                  style="cursor:pointer"
                  @click="editReagent(reagent)"
                ></i>
              </div>
              <div class="m-2">
                <i
                  class="fa fa-eye"
                  style="cursor:pointer"
                  @click="viewReagent(reagent)"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.api";
import httpClient from "@/api/httpClient/httpClient";

export default {
  name: "app",
  props: {
    isShowInstruments: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      values: this.getEmptyValues(),
      reagentId: "",
      manufacturers: [],
      reagents: [],
      selectedManufacturerId: 1,
      form: false,
      reagents_show: true,
      view: true,
      units: [],
      currencies: [],
      update: false
    };
  },
  methods: {
    getReagents: function() {
      api(httpClient)
        .reagents.getList()
        .then(res => {
          debugger;
          if (res.status === 200) {
            this.reagents = res.data.reagents;
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getReagentsByManufacurerId(id) {
      api(httpClient)
        .reagents.getListByManufacturerId(id)
        .then(res => {
          if (res.status === 200) {
            this.reagents = res.data.reagents;
            this.selectedManufacturerId = id;
            this.reagents_show = true;
            this.form = false;
            this.$emit('changeReagentsGroup', this.reagents);
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getEmptyValues() {
      return {
        id: "",
        name: "",
        manufacturer_id: "",
        units_id: "",
        price: "",
        currency_id: ""
      };
    },
    getForm() {
      this.form = true;
      this.reagents_show = false;
      api(httpClient)
        .units.getList()
        .then(res => {
          if (res.status === 200) {
            this.units = res.data.units;
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
      api(httpClient)
        .currencies.getList()
        .then(res => {
          if (res.status === 200) {
            this.currencies = res.data.currencies;
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    createReagent() {
      this.update = false;
      this.view = true;
      this.values = this.getEmptyValues();
      this.getForm();
    },
    deleteReagent(id, name) {
      var message = "Are you sure you want to delete reagent " + name + "?";
      if (confirm(message)) {
        api(httpClient)
          .reagents.deleteById(id)
          .then(res => {
            if (res.status === 200) {
              this.$notify({
                group: "app",
                text: "Reagent " + name + " was deleted!",
                type: "success"
              });
              api(httpClient).reagents.getListByManufacturerId(
                this.selectedManufacturerId
              );
            } else {
              console.log("Error get patient form");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    editReagent(reagent) {
      this.values.id = reagent.id;
      this.values.name = reagent.name;
      this.values.manufacturer_id = reagent.manufacturer_id;
      this.values.units_id = reagent.units_id;
      this.values.price = reagent.price;
      this.values.currency_id = reagent.currency_id;
      this.update = true;
      this.view = true;
      this.getForm();
    },
    submitForm(reagentId) {
      if (this.update === true) {
        api(httpClient)
          .reagents.update(this.values)
          .then(res => {
            if (res.status === 200) {
              var message =
                "Are you sure you want to update reagent " +
                this.values.name +
                "?";
              if (confirm(message)) {
                this.$notify({
                  group: "app",
                  text: "Reagent " + this.values.name + " was updated!",
                  type: "success"
                });
              }
              this.getReagentsByManufacurerId(this.selectedManufacturerId);
              this.form = false;
              this.reagents_show = true;
            } else {
              console.log("Error get patient form");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        api(httpClient)
          .reagents.create(this.values)
          .then(res => {
            if (res.status === 200) {
              var message =
                "Are you sure you want to create reagent " +
                this.values.name +
                "?";
              if (confirm(message)) {
                this.$notify({
                  group: "app",
                  text: "Reagent " + this.values.name + " was created!",
                  type: "success"
                });
              }
              this.getReagentsByManufacurerId(this.selectedManufacturerId);
              this.form = false;
              this.reagents_show = true;
            } else {
              console.log("Error get patient form");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    viewReagent(reagent) {
      this.reagentId = reagent.id;
      this.values.name = reagent.name;
      this.values.manufacturer_id = reagent.manufacturer_id;
      this.values.units_id = reagent.units_id;
      this.values.price = reagent.price;
      this.values.currency_id = reagent.currency_id;
      this.view = false;
      this.getForm();
    }
  },
  mounted() {
    api(httpClient)
      .manufacturer.getList()
      .then(res => {
        if (res.status === 200) {
          this.manufacturers = res.data.manufacturers;
          this.getReagentsByManufacurerId(this.manufacturers[0].id);
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

<style>
.list-group-item,
.oi {
  cursor: pointer;
}
</style>
