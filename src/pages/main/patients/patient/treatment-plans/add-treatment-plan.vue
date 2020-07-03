<template>
  <div class="add-treatment-block">
    <!-- <ToothCard :show-children="true" :show-layouts="true" /> -->
    <!-- <b-field
      :message="
        $v.name.$error ? 'Необходимо ввести название плана лечения' : ''
      "
    >
      <b-input
        type="text"
        v-model.trim="$v.name.$model"
        placeholder="Название плана лечения"
      ></b-input>
    </b-field> -->
    <!-- <template v-if="selectedTooth">
      <div class="manipulations-builder">
        <ManipulationsList
          :manipulations="manipulations"
          @addManipulationEvent="addManipulation"
        />
        <ReagentsList :reagents="reagents" :dragGroupName="'reagents'" />
        <TreatmentPlan
          @addReagentEvent="addReagent"
          :addedManipulations.sync="addedManipulations"
          :selectedTooth="selectedTooth"
          :dragGroupName="'reagents'"
        />
        <b-button
          @click="saveNewPlan"
          :disabled="!isValid()"
          :type="isValid() ? 'is-success' : ''"
          >Сохранить созданный план</b-button
        >
      </div>
    </template>
    <template v-else>
      <h3 class="title">Выберите зуб, чтобы назначить манипуляцию</h3>
    </template> -->
    <div class="plan">
      <TreatmentPlan
        @addReagentEvent="addReagent"
        :addedManipulations.sync="addedManipulations"
        :selectedTooth="selectedTooth"
        :dragGroupName="'reagents'"
      />
      <!-- <div class="current-plan">
        <div class="current-plan__header">
          <div class="current-plan__header__name">План 1 (приемы)</div>
          <button class="current-plan__header__button">
            Завершить редактирование
          </button>
        </div>
        <p class="current-plan__price">
          Общая стоимость 219 000 - 238 000 руб.
        </p>
      </div>
      <div class="plan__current-manipulation">
        <p>Рабочая область</p>
        <button class="plan__current-manipulation__button">Сформировать</button>
      </div>

      <div class="plan__appointment">
        appointment
      </div>

      <div class="plan__appointment">
        appointment
      </div>

      <div class="plan__manipulations">
        <Maniplations @clickedElement="handleClickElement" />
      </div> -->
    </div>
    <div class="base">
      <div class="tooth-card">
        <ToothCard :show-children="true" :show-layouts="true" />
        <b-button
          @click="saveNewPlan"
          :disabled="!isValid()"
          :type="isValid() ? 'is-success' : ''"
          >Сохранить созданный план</b-button
        >
      </div>
      <div class="instruments">
        <div class="manipulations">
          <div class="manipulations__all">
            <Manipulations
              @clickedElement="handleClickElement"
              :isShowInstruments="false"
              :isShowItemsInNode="false"
            />
          </div>
          <ul class="manipulations__selected">
            <template v-if="manipulations.length">
              <li
                class="manipulations__selected__item"
                v-for="manipulation in manipulations"
                :key="manipulation.id"
                @click="addManipulation(manipulation)"
              >
                + {{ manipulation.name }}
              </li>
            </template>
            <template v-else>
              :(
            </template>
          </ul>
        </div>
        <div class="reagents">
          <div class="reagents__all">
            <Reagents
              :isShowInstruments="false"
              @changeReagentsGroup="handleChangeReagents"
            />
          </div>
          <ul class="reagents__selected">
            <template v-if="reagents.length">
              <li
                class="reagents__selected__item"
                v-for="reagent in reagents"
                :key="reagent.id"
                @click="addManipulation(manipulation)"
              >
                + {{ reagent.name }}
              </li>
            </template>
            <template v-else>
              :(
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import draggable from "vuedraggable";
import Component from "vue-class-component";
import { Reagent } from "@/shared/classes/reagent";
import { Getter, Mutation, Action } from "vuex-class";
import Reagents from "@/components/shared/Reagents.vue";
import ToothCard from "@/components/tooth-card-two-version/components/Teeth.vue";
import Manipulations from "@/components/shared/Manipulations.vue";
import ReagentsList from "@/components/treatmentPlan/ReagentsList.vue";
import TreatmentPlan from "@/components/treatmentPlan/TreatmentPlan.vue";
import Manipulation from "@/shared/classes/manipulation";
import { Validate } from "vuelidate-property-decorators";
import { required, minLength } from "vuelidate/lib/validators";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    ToothCard,
    draggable,
    Manipulations,
    ReagentsList,
    TreatmentPlan,
    Reagents
  }
})
export default class MyComponent extends Vue {
  // @Getter("MANIPULATIONS") manipulations: any;
  // @Getter("REAGENTS") reagents: any;
  @Getter("toothCard/selectedTooth") selectedTooth: any;
  @Getter("icds_1") icds: any;

  @Action("GET_MANIPULATIONS") getManipulations: any;
  @Action("GET_REAGENTS") getReagents: any;
  @Action("icd/getLimitedIcds") getLimitedIcds: any;
  @Action("CREATE_PLAN") createPlan: any;

  @Validate({ required, minLength: minLength(1) }) name = "";

  addedManipulations: any = [];
  userId: number = 0;
  manipulations: Manipulation[] = [];
  reagents: Reagent[] = [];

  mounted() {
    this.init();
  }

  isValid(): boolean {
    // const nameError: boolean = (this.$v.name.$error || {}) as boolean;
    return (true && this.addedManipulations.length) as boolean;
  }

  init() {
    this.userId = +this.$route.params.id;
    this.getManipulations();
    this.getReagents();
    this.getLimitedIcds({ from: 1, to: 100 });
  }

  addReagent(event: any) {
    const idMovedReagent: number = +event.item.id.split("-")[1];
    const movedReagent: Reagent = this.reagents.find(
      (r: any) => r.id === idMovedReagent
    ) as Reagent;

    const indexAddedManipulation: number = +event.to.parentElement.dataset
      .index;
    if (
      this.isReagentAlreadyExistInManipulationByIndex(
        indexAddedManipulation,
        idMovedReagent
      )
    ) {
      // манипуляция, в которой добавился реагент
      const currentManipulation: Manipulation = this.addedManipulations[
        indexAddedManipulation
      ];
      // ищем совпадения
      let indexRreagentForDelete = -1;
      const isReagentAlreadyExist =
        currentManipulation.reagents.filter((r: Reagent, i: number) => {
          if (r.id === movedReagent.id) {
            if (indexRreagentForDelete < i) {
              indexRreagentForDelete = i;
            }
            return true;
          }
          return false;
        }).length > 1;
      if (isReagentAlreadyExist) {
        // если есть, то удаляем новые (без установленного количества)
        currentManipulation.reagents.splice(indexRreagentForDelete, 1);
      }

      //после дулаения повторяющегося находим индекс реагента с id как у добавленного
      let indexReagent: number = -1;
      for (let i = 0; i < currentManipulation.reagents.length; i++) {
        if (currentManipulation.reagents[i].id === idMovedReagent) {
          indexReagent = i;
          break;
        }
      }
      // нашли - увеличиаем количество
      if (indexReagent > -1) {
        let currentReagent: Reagent =
          currentManipulation.reagents[indexReagent];
        if (currentReagent && currentReagent.quantity) {
          currentReagent.quantity++;
        } else {
          //если новый реагент, то инитим количество
          currentReagent.quantity = 1;
        }
      }
    }
  }

  isReagentAlreadyExistInManipulationByIndex(
    index: number,
    id: number
  ): boolean {
    return this.addedManipulations[index].reagents.some(
      (r: any) => r.id === id
    );
  }

  addManipulation(manipulation: Manipulation) {
    manipulation.reagents.forEach((reagent: Reagent) => {
      reagent.quantity = 1;
    });
    // setDefaultReagentsQuantity();
    this.addedManipulations.push({
      ...JSON.parse(JSON.stringify(manipulation)),
      tooth: this.selectedTooth
    });
  }

  get addedManipulationSum(): number {
    let sum = 0;
    this.addedManipulations.forEach((m: Manipulation) => {
      m.reagents.forEach((r: Reagent) => {
        sum += r.price * (r.quantity ? r.quantity : 1);
      });
    });
    return sum;
  }

  async saveNewPlan() {
    // TODO: Изменить тело на реальное после того как обновится бэк
    const obj: any = {
      name: this.name.trim,
      patient_id: this.$route.params.id,
      manipulations_list: this.addedManipulations.map((m: any) => {
        const manipulationShort: any = {};
        manipulationShort.reagents_list = m.reagents.map((r: any) => {
          const reagentShort: any = {};
          reagentShort.id = r.id;
          reagentShort.quantity = r.count || 1;
          return reagentShort;
        });
        manipulationShort.id = m.refId;
        manipulationShort.tooth = m.tooth;
        return manipulationShort;
      }),
      coupon: ""
    };
    try {
      await this.createPlan(obj);
      alert("План добавлен");
      this.$router.back();
    } catch (err) {
      alert(err);
    }
  }

  isToothSelected(toothIndex: number): boolean {
    return this.selectedTooth === toothIndex;
  }

  handleClickElement(element: any) {
    this.manipulations = element.manipulations;
  }

  handleChangeReagents(reagetns: []) {
    this.reagents = reagetns;
  }
}
</script>
<style lang="scss">
.add-treatment-block {
  display: flex;
  position: relative;
  width: 100%;
  height: calc(100% - 70px);
  padding: 15px;
}
.plan {
  height: 100%;
  max-width: 300px;
}

.current-plan {
  border: 1px solid;
}

.base {
  display: block;
  width: 100%;
}

.current-plan {
  border: 1px solid;
}

.current-plan__header {
  border: 1px solid;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.current-plan__header__name {
}

.current-plan__header__button {
  background: darkgray;
  white-space: normal;
  width: 125px;
}

.plan__current-manipulation {
  border: 1px solid;
  display: flex;
}

.plan__appointment {
  border: 1px solid;
}

.plan__current-manipulation {
  display: flex;
  justify-content: space-between;
}

.plan__manipulations {
  border: 1px solid;
}

.tooth-card {
  border: 1px solid;
  min-height: 300px;
}

.instruments {
  display: flex;
}

.manipulations {
  width: 50%;
  border: 1px solid;
  display: flex;
}

.manipulations__selected {
  width: 100%;
  border: 1px solid;
}

.reagents {
  width: 50%;
  border: 1px solid;
  display: flex;
}

.reagents__selected {
  width: 100%;
  border: 1px solid;
}

.plan__current-manipulation__button {
  background: darkgray;
  white-space: normal;
  width: 125px;
}

.manipulations__selected__item {
  width: 100%;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.manipulations__selected__item:hover {
  background-color: #0059b9;
}

.reagents__selected__item {
  width: 100%;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.reagents__selected__item:hover {
  background-color: #0059b9;
}
</style>
