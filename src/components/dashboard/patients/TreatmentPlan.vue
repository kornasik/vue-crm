<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col">
        <h1>Treatment Plan</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <ul
          class="list-group"
          v-bind:key="patient.id"
          v-for="patient in patients"
        >
          <li
            class="list-group-item list-group-item-action"
            :class="{ active: selectedPatientId === patient.id }"
            @click="getPlans(patient.id)"
          >
            {{ patient.content[0].value }}
          </li>
        </ul>
      </div>
      <div class="col-md-8">
        <div class="btn btn-primary pt-2" @click="createPlan()">
          <span class="oi oi-plus" style="margin-right: 10px;"></span> New
        </div>
        <div class="row form" v-show="form">
          <form class="col-md-12" @submit.prevent>
            <div class="container line-margin">
              <div class="container line-margin">
                <div class="row">
                  <div class="col-md-6 pt-2"><label>Name</label></div>
                  <div class="col-md-6 pt-2">
                    <input
                      v-model="values.name"
                      type="text"
                      placeholder="message"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="container line-margin">
              <div class="container line-margin">
                <div class="row">
                  <div class="col-md-6 pt-2"><label>Operation</label></div>
                  <div class="col-md-6 pt-2">
                    <input
                      v-model="values.operation_id"
                      type="number"
                      placeholder="message"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="container line-margin">
              <div class="container line-margin">
                <div class="row">
                  <div class="col-md-6 pt-2"><label>Final Cost</label></div>
                  <div class="col-md-6 pt-2">
                    <input
                      v-model="values.final_cost"
                      type="number"
                      placeholder="message"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="container line-margin">
              <div class="row">
                <div class="col-md-6 pt-2"><label>Currencies</label></div>
                <div class="col-md-6 pt-2">
                  <multiselect
                    style="width:96%"
                    v-model="values.currency_id"
                    tag-placeholder="Add this as currency"
                    placeholder="Search or add currency"
                    label="code"
                    track-by="id"
                    :options="currenciesOptions"
                    :multiple="false"
                    :taggable="true"
                  >
                  </multiselect>
                </div>
              </div>
            </div>
            <div class="container line-margin">
              <div class="row">
                <div class="col-md-6 pt-2"><label>Manipulations</label></div>
                <div class="col-md-6 pt-2">
                  <multiselect
                    style="width:96%"
                    v-model="values.manipulations_list"
                    tag-placeholder="Add this as new manipulation"
                    placeholder="Search or add a manipulation"
                    label="name"
                    track-by="refId"
                    :options="manipulationOptions"
                    :multiple="true"
                    :taggable="true"
                  >
                  </multiselect>
                </div>
              </div>
            </div>
            <div class="container line-margin">
              <div class="container line-margin">
                <div class="row">
                  <div class="col-md-6 pt-2"><label>Content</label></div>
                  <div class="col-md-6 pt-2">
                    <input
                      v-model="values.content"
                      type="text"
                      placeholder="message"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-5">
              <button class="btn btn-success line-margin" @click="submit()">
                Save
              </button>
            </div>
          </form>
        </div>
        <div class="row pt-5" v-show="info">
          <div class="col-sm-6" v-bind:key="plan.id" v-for="plan in plans">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ plan.name.toUpperCase() }}</h5>
                <p class="card-text">
                  Cost: {{ plan.final_cost + " " + plan.currency }}
                </p>
                <span
                  class="oi oi-trash"
                  @click="deletePlan(plan.id)"
                  style="margin-right: 10px;"
                ></span>
                <span
                  class="oi oi-pencil"
                  @click="editPlan(plan)"
                  style="margin-right: 10px;"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "app",
  components: {
    Multiselect
  },
  data() {
    return {
      patients: [],
      selectedPatientId: 11,
      plans: [],
      form: false,
      info: true,
      values: this.getEmptyValues(),
      currenciesOptions: [],
      manipulationOptions: []
    };
  },
  methods: {
    getPatients() {
      this.$axios
        .get(this.$store.state.apiDomain + "/medicine/patient/list")
        .then(res => {
          if (res.status === 200) {
            this.patients = res.data.patients;
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPlans(id) {
      this.selectedPatientId = id;
      this.info = true;
      this.form = false;
      this.$axios
        .get(
          this.$store.state.apiDomain + "/medicine/plan/list?patient_id=" + id
        )
        .then(res => {
          if (res.status === 200) {
            this.plans = res.data.plans;
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    createPlan() {
      this.form = true;
      this.info = false;
      this.edit = false;
      this.values = this.getEmptyValues();
    },
    getEmptyValues() {
      return {
        patient_id: this.selectedPatientId,
        name: "",
        currency_id: "",
        operation_id: "",
        manipulations_list: [],
        final_cost: "",
        content: []
      };
    },
    getCurrencies() {
      this.$axios
        .get(this.$store.state.apiDomain + "/common/currencies/list")
        .then(res => {
          if (res.status === 200) {
            this.currenciesOptions = res.data.currencies;
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getManipulations() {
      this.$axios
        .get(this.$store.state.apiDomain + "/medicine/manipulations/list")
        .then(res => {
          if (res.status === 200) {
            this.manipulationOptions = res.data.manipulations;
          } else {
            console.log("Error get patient form");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editPlan(plan) {
      this.edit = true;
      this.form = true;
      this.info = false;
      this.selectedPlanId = plan.id;
      this.values.currency_id = this.currenciesOptions.filter(function(el) {
        return el.code === plan.currency;
      })[0];
      this.values.name = plan.name;
      this.values.patient_id = this.selectedPatientId;
      this.values.operation_id = plan.operation_id;
      this.values.manipulations_list = plan.manipulations;
      this.values.final_cost = plan.final_cost;
      this.content = plan.content;
    },
    deletePlan(id) {
      var message = "Are you sure you want to delete the treatment plan?";
      if (confirm(message)) {
        this.$axios
          .post(this.$store.state.apiDomain + "/medicine/plan/delete", {
            id: id
          })
          .then(res => {
            if (res.status === 200 && res.data.errorCode === 0) {
              this.$notify({
                group: "app",
                text: "The treatment plan was deleted!",
                type: "success"
              });
              this.getPlans(this.selectedPatientId);
            } else {
              this.$notify({
                group: "error",
                text: res.data.errorMessage,
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    submit() {
      this.values.manipulations_list = this.values.manipulations_list.map(
        function(el) {
          return el.refId;
        }
      );
      this.values.currency_id = this.values.currency_id.id;
      if (this.edit) {
        var text =
          "Are you sure you want to update a treatment plan " +
          this.values.name +
          " ?";
        if (confirm(text)) {
          this.$axios
            .put(
              this.$store.state.apiDomain +
                "/medicine/plan/" +
                this.selectedPlanId,
              this.values
            )
            .then(res => {
              if (res.status === 200 && res.data.errorCode === 0) {
                this.$notify({
                  group: "app",
                  text:
                    "The treatment plan " + this.values.name + " was updated!",
                  type: "success"
                });
                this.form = false;
                this.info = true;
                this.values = this.getEmptyValues();
                this.getPlans(this.selectedPatientId);
              } else {
                this.$notify({
                  group: "error",
                  text: res.data.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        var message =
          "Are you sure you want to create a treatment plan " +
          this.values.name +
          " ?";
        if (confirm(message)) {
          this.$axios
            .post(
              this.$store.state.apiDomain + "/medicine/plan/create",
              this.values
            )
            .then(res => {
              if (res.status === 200 && res.data.errorCode === 0) {
                this.$notify({
                  group: "app",
                  text:
                    "The treatment plan " + this.values.name + " was created!",
                  type: "success"
                });
                this.form = false;
                this.info = true;
                this.values = this.getEmptyValues();
                this.getPlans(this.selectedPatientId);
              } else {
                this.$notify({
                  group: "error",
                  text: res.data.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  },
  mounted: function() {
    this.getPatients();
    this.getPlans(this.selectedPatientId);
    this.getCurrencies();
    this.getManipulations();
  }
};
</script>

<style>
.list-group-item,
.oi {
  cursor: pointer;
}
</style>
