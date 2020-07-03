<template>
  <div>
    <Breadcrumbs />
    <section class="container-fluid">
      <div class="buttons flex-end">
        <b-button
          type="is-success"
          icon-pack="fas"
          @click="openPageNewGroup()"
          icon-left="plus"
        >
          {{ $t("permissionsGroups.addNewGroup") }}
        </b-button>
      </div>
      <b-table
        v-if="groups && groups.length && columnsVisible"
        :data="groups"
        icon-pack="fas"
      >
        <template slot-scope="props">
          <b-table-column
            field="id"
            v-if="columnsVisible['dropdown'].title"
            :label="columnsVisible['id'].title"
            sortable
            searchable
          >
            {{ props.row.id }}
          </b-table-column>
          <b-table-column
            field="name"
            v-if="columnsVisible['dropdown'].title"
            :label="columnsVisible['name'].title"
            sortable
            searchable
          >
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            v-if="columnsVisible['dropdown'].title"
            field="dropdown"
            :label="columnsVisible['dropdown'].title"
            centered
          >
            <div class="buttons flex-center">
              <b-button
                type="is-success"
                icon-right="eye"
                icon-pack="fas"
                @click="openPageGroupById(props.row.id)"
              />
              <b-button
                type="is-warning"
                icon-right="edit"
                icon-pack="fas"
                @click="openPageGroupEditById(props.row.id)"
              />
              <b-button
                type="is-danger"
                icon-right="trash-alt"
                icon-pack="fas"
                @click="deleteGroupWithId(props.row.id)"
              />
            </div>
          </b-table-column>
        </template>
      </b-table>
      <div v-else class="notification">
        {{ $t("permissionsGroups.noRecords") }}
      </div>
      <b-loading
        :is-full-page="false"
        :active.sync="isLoading"
        :can-cancel="true"
      />
    </section>
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
  @Getter("PERMISSIONS_GROUPS") groups: any;
  @Getter("icds_1") icds_1: any;

  @Action("GET_PERMISSIONS_GROUPS") getGroups: any;
  @Action("DELETE_PERMISSIONS_GROUP_BY_ID") deleteGroupById: any;

  columnsVisible: any = null;
  isLoading: Boolean = true;

  async created() {
    await this.getGroups();
    this.isLoading = false;
    this.columnsVisible = {
      id: { title: "ID", display: true },
      name: {
        title: this.$t("permissionsGroups.tableHeaderName"),
        display: true
      },
      dropdown: {
        title: this.$t("permissionsGroups.tableHeaderActions"),
        display: true
      }
    };
  }

  openPageNewGroup(): void {
    this.$router.push("/settings/permissions-group/add");
  }

  openPageGroupById(id: number): void {
    this.$router.push(`/settings/permissions-group/${id}`);
  }

  openPageGroupEditById(id: number): void {
    this.$router.push(`/settings/permissions-group/${id}/edit`);
  }

  deleteGroupWithId(id: number) {
    if (confirm(this.$t("permissionsGroups.delete") as string)) {
      this.deleteGroupById(id);
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
