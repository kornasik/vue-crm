import Vue from "vue";
import Vuex from "vuex";

import appointments from "./modules/appointments.store";
import appointmentCalendar from "./modules/appointment-calendar.store";
import complaintCategories from "./modules/complaint-categories.store";
import contacts from "./modules/contacts.store";
import createDocument from "./modules/create-document.store";
import diagnoses from "./modules/diagnoses.store";
import documents from "./modules/documents.store";
import families from "./modules/families.store";
import formbuilder from "./modules/formbuilder.store";
import icd from "./modules/icd.store";
import manipulations from "./modules/manipulations.store";
import patients from "./modules/patients.store";
import paymentManagement from "./modules/payment-management.store";
import permissionsUser from "./modules/permissions-user.store";
import permissions from "./modules/permissions.store";
import plan from "./modules/plan.store";
import reagents from "./modules/reagents.store";
import salesFunnel from "./modules/sales-funnel.store";
import sidebar from "./modules/sidebar.store";
import status from "./modules/status.store";
import toothCard from "./modules/tooth-card.store";
Vue.use(Vuex);

export function createStore(api: any) {
  return new Vuex.Store({
    modules: {
      appointments: appointments(api),
      appointmentCalendar: appointmentCalendar(api),
      complaintCategories: complaintCategories(api),
      contacts: contacts(api),
      createDocument: createDocument(api),
      diagnoses: diagnoses(api),
      documents: documents(api),
      families: families(api),
      formbuilder: formbuilder(api),
      icd: icd(api),
      manipulations: manipulations(api),
      patients: patients(api),
      paymentManagement: paymentManagement(api),
      permissionsUser: permissionsUser(api),
      permissions: permissions(api),
      plan: plan(api),
      reagents: reagents(api),
      salesFunnel: salesFunnel(api),
      sidebar: sidebar(api),
      status: status(api),
      toothCard: toothCard(api)
    }
  });
}
