<template>
  <div>
    <Breadcrumbs />
    <section class="container-fluid">
      <div class="buttons flex-end">
        <b-button
          type="is-success"
          icon-pack="fas"
          @click="handleOpenPageUserAdd()"
          icon-left="plus"
        >
          {{ $t("users.addNewUser") }}
        </b-button>
      </div>
      <b-table v-if="users && users.length" :data="users" icon-pack="fas">
        <template slot-scope="props">
          <b-table-column
            field="id"
            :label="columnsVisible['id'].title"
            sortable
            searchable
          >
            {{ props.row.id }}
          </b-table-column>
          <b-table-column
            field="name"
            :label="columnsVisible['name'].title"
            sortable
            searchable
          >
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            field="dropdown"
            :label="columnsVisible['dropdown'].title"
            centered
          >
            <div class="buttons flex-center">
              <b-button
                type="is-warning"
                icon-right="shield-alt"
                icon-pack="fas"
                @click="handleOpenUserEditById(props.row.id)"
              />
              <b-button
                type="is-danger"
                icon-right="trash-alt"
                icon-pack="fas"
                @click="handleDeleteId(props.row.id)"
              />
            </div>
          </b-table-column>
        </template>
      </b-table>
      <div v-else class="notification">
        {{ $t("users.noRecords") }}
      </div>
    </section>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="true"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {
  PERMISSIONS_MULTIPLE,
  PERMISSIONS_ACTIONS
} from "@/shared/constants/permissions";
import { Getter, Action } from "vuex-class";
import { PermissionsGroup } from "@/shared/classes/permissionsGroup.model";
@Component({
  components: {
    Breadcrumbs
  }
})
export default class PermissionsGroupView extends Vue {
  @Getter("PERMISSIONS_USERS") users: any;

  @Action("GET_PERMISSIONS_USERS") getUsers: any;
  @Action("DELETE_PERMISSIONS_USER_BY_ID") deleteUserById: any;

  columnsVisible: any = null;
  isLoading: Boolean = true;

  async created() {
    this.getUsers();
    this.isLoading = false;
    this.columnsVisible = {
      id: { title: "ID", display: true },
      name: {
        title: this.$t("users.tableHeaderName"),
        display: true
      },
      dropdown: {
        title: this.$t("users.tableHeaderActions"),
        display: true
      }
    };
  }

  handleOpenPageUserAdd(): void {
    this.$router.push("/settings/users/add");
  }

  handleOpenUserEditById(id: number): void {
    this.$router.push(`/settings/users/${id}/edit`);
  }

  handleDeleteId(id: number) {
    if (confirm(this.$t("users.delete").toString())) {
      this.deleteUserById(id);
    }
  }
}
</script>
<style lang="scss">
.flex-center {
  justify-content: center;
}
.flex-end {
  justify-content: flex-end;
}
</style>
