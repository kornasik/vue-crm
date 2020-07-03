import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes: any = [
  {
    path: "/",
    name: "main",
    component: () => import("@/pages/main/main.vue"),
    children: [
      {
        path: "users",
        name: "users",
        component: () => import("@/pages/main/users/users.vue")
      },
      {
        path: "",
        name: "Patients",
        component: () => import("@/pages/main/patients/patients.vue"),
        children: [
          {
            path: "patients",
            name: "ListPatient",
            component: () => import("@/pages/main/patients/ListPatient.vue")
          },
          {
            path: "patients/add",
            name: "AddPatient",
            component: () =>
              import("@/pages/main/patients/add.vue")
          },
          {
            path: "patients",
            name: "patient",
            component: () =>
              import("@/pages/main/patients/patient/patient.vue"),
            children: [
              {
                path: ":id",
                name: "patientId",
                component: () =>
                  import("@/pages/main/patients/patient/PatientGeneral.vue")
              },
              {
                path: "add",
                name: "AddPatient",
                component: () =>
                  import("@/pages/main/patients/patient/AddPatient.vue")
              },
              {
                path: "edit/:id",
                name: "EditPatient",
                component: () =>
                  import("@/pages/main/patients/patient/EditPatient.vue")
              },
              {
                path: "overview/:id",
                name: "OverviewPatient",
                component: () =>
                  import("@/pages/main/patients/patient/OverviewPatient.vue")
              },
              {
                path: ":id/tooth-card",
                name: "tooth-card",
                component: () => import("@/pages/main/settings/ToothCard.vue")
              },
              {
                path: ":id/documents",
                name: "documents",
                component: () => import("@/components/documents/Documents.vue")
              },
              {
                path: ":id/documents/create",
                name: "create document",
                component: () =>
                  import("@/components/documents/CreateDocument.vue")
              },
              {
                path: ":id/treatment-plans",
                name: "treatment-plans",
                component: () =>
                  import(
                    "@/pages/main/patients/patient/treatment-plans/treatment-plans.vue"
                  ),
              },
              {
                path: ":id/treatment-plans/:id",
                name: "open-treatment-plan",
                component: () =>
                  import(
                    "@/pages/main/patients/patient/treatment-plans/open-treatment-plan.vue"
                  )
              },
              {
                path: ":id/add-treatment-plan",
                name: "add-treatment-plan",
                component: () =>
                  import(
                    "@/pages/main/patients/patient/treatment-plans/add-treatment-plan.vue"
                  )
              },
              {
                path: ":id/pictures",
                name: "pictures",
                component: () =>
                  import("@/pages/main/patients/patient/pictures.vue")
              },
              {
                path: ":id/patient-card",
                name: "patient-card",
                component: () =>
                  import("@/pages/main/patients/patient/patient-card.vue")
              },
              {
                path: ":id/finances",
                name: "finances",
                component: () =>
                  import("@/pages/main/patients/patient/finances.vue")
              },
              {
                path: ":id/documents",
                name: "documents",
                component: () =>
                  import("@/pages/main/patients/patient/documents.vue")
              },
              {
                path: ":id/documents/create",
                name: "create document",
                component: () =>
                  import("@/pages/main/patients/patient/create-document.vue")
              }
            ]
          }
        ]
      },
      {
        path: "sales-and-marketing",
        name: "sales-and-marketing",
        component: () =>
          import("@/pages/main/sales-and-marketing/sales-and-marketing.vue")
      },
      {
        path: "sales-and-marketing/lead-analytics",
        name: "lead-analytics",
        component: () => import("@/pages/main/lead-analytics/LeadAnalytics.vue")
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/pages/main/settings/settings.vue"),
        children: [
          {
            path: "",
            name: "settings-menu",
            component: () => import("@/pages/main/settings/menu.vue")
          },
          {
            path: "currencies",
            name: "currencies",
            component: () => import("@/pages/main/settings/currencies.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Currencies" }
              ]
            }
          },
          {
            path: "formbuilder",
            name: "formbuilder",
            component: () =>
              import("@/pages/main/settings/formbuilder/forms-list.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Formbuilder" }
              ]
            }
          },
          {
            path: "formbuilder/:id",
            name: "formbuilder-edit-controls",
            component: () =>
              import(
                "@/pages/main/settings/formbuilder/formbuilder-edit-controls.vue"
              ),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Formbuilder", link: "/settings/formbuilder" },
                { name: "Formbuilder edit" }
              ]
            }
          },
          {
            path: "formbuilder/view/:id",
            name: "formbuilder-view",
            component: () =>
              import("@/pages/main/settings/formbuilder/view-form.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Formbuilder", link: "/settings/formbuilder" },
                { name: "View form" }
              ]
            }
          },
          {
            path: "manipulations",
            name: "manipulations",
            component: () => import("@/pages/main/settings/manipulations.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Manipulations" }
              ]
            }
          },
          {
            path: "templates",
            name: "templates",
            component: () => import("@/pages/main/settings/templates.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Templates" }
              ]
            }
          },
          {
            path: "reagents",
            name: "reagents",
            component: () => import("@/pages/main/settings/reagents.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Reagents" }
              ]
            }
          },
          {
            path: "units",
            name: "units",
            component: () => import("@/pages/main/settings/units.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Units" }
              ]
            }
          },
          {
            path: "tooth-card/:id",
            name: "tooth-card",
            component: () => import("@/pages/main/settings/ToothCard.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Tooth card" }
              ]
            }
          },
          {
            path: "tooth-card/:id/edit",
            name: "tooth-card",
            component: () => import("@/pages/main/settings/EditTooth.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Tooth card" },
                { name: "Edit tooth" },
              ]
            }
          },
          // {
          //   path: "permissions",
          //   name: "permissions",
          //   component: () =>
          //     import("@/pages/main/settings/permissions/permissions.vue"),
          //   meta: {
          //     breadcrumb: [
          //       { name: "Settings", link: "/settings" },
          //       { name: "permissions" }
          //     ]
          //   }
          // },
          {
            path: "users",
            name: "settings-users",
            component: () => import("@/pages/main/settings/users/users.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "Users" }
              ]
            }
          },
          {
            path: "users/add",
            name: "settings-user-add",
            component: () => import("@/pages/main/settings/users/user-add.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                {
                  name: "users",
                  link: "/settings/users"
                },
                { name: "user-add" }
              ]
            }
          },
          // {
          //   path: "settings-user/:id",
          //   name: "settings-user-view",
          //   component: () =>
          //     import(
          //       "@/pages/main/settings/users/settings-user-view.vue"
          //     ),
          //   meta: {
          //     breadcrumb: [
          //       { name: "Settings", link: "/settings" },
          //       { name: "Permissions", link: "/settings/permissions" },
          //       {
          //         name: "settings-user",
          //         link: "/settings/settings-user"
          //       },
          //       { name: "settings-user-view" }
          //     ]
          //   }
          // },
          {
            path: "/settings/users/:id/edit",
            name: "permissions-user-edit",
            component: () =>
              import("@/pages/main/settings/users/permissions-user-edit.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                {
                  name: "users",
                  link: "/settings/users"
                },
                { name: "permissions-user-edit" }
              ]
            }
          },
          {
            path: "permissions-group",
            name: "permissions-group",
            component: () =>
              import("@/pages/main/settings/permissions/permissions-group.vue"),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                { name: "permissions-group" }
              ]
            }
          },
          {
            path: "permissions-group/add",
            name: "permissions-group-add",
            component: () =>
              import(
                "@/pages/main/settings/permissions/permissions-group/permissions-group-add.vue"
              ),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                {
                  name: "permissions-group",
                  link: "/settings/permissions-group"
                },
                { name: "permissions-group-add" }
              ]
            }
          },
          {
            path: "permissions-group/:id",
            name: "permissions-group-view",
            component: () =>
              import(
                "@/pages/main/settings/permissions/permissions-group/permissions-group-view.vue"
              ),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                {
                  name: "permissions-group",
                  link: "/settings/permissions-group"
                },
                { name: "permissions-group-view" }
              ]
            }
          },
          {
            path: "permissions-group/:id/edit",
            name: "permissions-group-edit",
            component: () =>
              import(
                "@/pages/main/settings/permissions/permissions-group/permissions-group-edit.vue"
              ),
            meta: {
              breadcrumb: [
                { name: "Settings", link: "/settings" },
                {
                  name: "permissions-group",
                  link: "/settings/permissions-group"
                },
                { name: "permissions-group-edit" }
              ]
            }
          }
        ]
      },
      {
        path: "sales-and-marketing/sale-funnel/:id",
        name: "sales-funnel",
        component: () => import("@/pages/main/sales-funnel/SalesFunnel.vue")
      },
      {
        path: "sales-and-marketing/contacts",
        name: "contacts",
        component: () => import("@/pages/main/contacts/contacts.vue")
      },
      {
        path: "sales-and-marketing/contacts/:id",
        name: "contact",
        component: () => import("@/components/contact/Contact.vue")
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/pages/main/profile/profile.vue")
      },
      {
        path: "/",
        redirect: { path: "settings" }
      },
      {
        path: "sales-and-marketing/sale-funnel/:id/setting",
        name: "setting-sales-funnel",
        component: () =>
          import("@/components/sales-funnel/setting/SettingSaleFunnel.vue")
      },
      {
        path: "sales-and-marketing/sale-funnel/:id/add-lead/",
        name: "add-lead",
        component: () =>
          import("@/components/sales-funnel/components/add-lead/AddLead.vue")
      },
      {
        path: "sales-and-marketing/payment-management",
        name: "payment-management",
        component: () =>
          import("@/components/payment-management/PaymentManagement.vue")
      },
      {
        path: "sales-and-marketing/payment-management/add-payment",
        name: "add-payment",
        component: () =>
          import("@/components/payment-management/components/AddPayment.vue")
      },
      {
        path: "profile/appointment-calendar",
        name: "appointment-calendar",
        component: () =>
          import("@/components/appointment-calendar/AppointmentCalendar.vue")
      },
      {
        path: "/user-invitation",
        name: "user-invitation",
        component: () =>
          import("@/components/user-invitation/UserInvitation.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue")
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("@/components/reset-password/ResetPassword.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: routes
});
router.beforeEach((to, from, next) => {
  //to.meta.roles
  // if (to.meta.roles && to.meta.roles.some((role: string) => role.match('admin'))) {
  //   alert('admin')
  // } else {
  //   alert('user')
  // }
  next();
});

export default router;
