import Vue from "vue";
import Component from "vue-class-component";
import { Validate } from "vuelidate-property-decorators";
import { required, minLength } from "vuelidate/lib/validators";
import { PermissionsModule } from "@/shared/classes/permissionsModule.model";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import HeaderUser from "@/components/permissions/components/HeaderUser.vue";
import Table from "@/components/permissions/components/Table.vue";
@Component({
  components: {
    Breadcrumbs,
    HeaderUser,
    Table
  }
})
export default class PermissionsUserBase extends Vue {
  modules: PermissionsModule[] = [];

  @Validate({ required, minLength: minLength(1) }) name = "";
  isLoading: Boolean = true;
  
  toggle(row: any) {
    (this.$refs.table as any).toggleDetails(row);
  }

  selectActionsInAllModules() {
    (this.$refs.table as any).selectActionsInAllModules();
  }

  deselectActionsInAllModules() {
    (this.$refs.table as any).deselectActionsInAllModules();
  }
}
