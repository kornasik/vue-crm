import URLS from "@/api/url-pathes";

import appointments from "@/api/endpoints/medicine/appointments.api";
import complaintCategories from "@/api/endpoints/medicine/complaint-categories.api";
import complaintTemplates from "@/api/endpoints/medicine/complaint-templates.api";
import doctors from "@/api/endpoints/medicine/doctors.api";
import families from "@/api/endpoints/medicine/families.api";
import manipulationsCategory from "@/api/endpoints/medicine/manipulations-category.api";
import manipulations from "@/api/endpoints/medicine/manipulations.api";
import manufacturer from "@/api/endpoints/medicine/manufacturer.api";
import patients from "@/api/endpoints/medicine/patients.api";
import plan from "@/api/endpoints/medicine/plan.api";
import reagents from "@/api/endpoints/medicine/reagents.api";
import teethCard from "@/api/endpoints/medicine/teeth-card.api";
import teethStatus from "@/api/endpoints/medicine/teeth-status.api";

import countries from "@/api/endpoints/common/countries.api";
import currencies from "@/api/endpoints/common/currencies.api";
import documents from "@/api/endpoints/common/documents.api";
import files from "@/api/endpoints/common/files.api";
import unitsGroup from "@/api/endpoints/common/units-group.api";
import units from "@/api/endpoints/common/units.api";
import icd from "@/api/endpoints/common/icd.api";

import block from "@/api/endpoints/constructor/block.api";
import form from "@/api/endpoints/constructor/form.api";
import formitem from "@/api/endpoints/constructor/formitem.api";

import contacts from "@/api/endpoints/crm/contacts.api";
import funnelStage from "@/api/endpoints/crm/funnel-stage.api";
import leadFields from "@/api/endpoints/crm/lead-fields.api";
import lead from "@/api/endpoints/crm/lead.api";
import salesFunnel from "@/api/endpoints/crm/sales-funnel.api";

export default (httpClient: any) => ({
  appointments: appointments(httpClient, URLS.MEDICINE.APPOINTMENTS),
  complaintCategories: complaintCategories(httpClient, URLS.MEDICINE.COMPLAINT_CATEGORIES),
  complaintTemplates: complaintTemplates(httpClient, URLS.MEDICINE.COMPLAINT_TEMPLATES),
  doctors: doctors(httpClient, URLS.MEDICINE.DOCTORS),
  families: families(httpClient, URLS.MEDICINE.FAMILIES),
  manipulationsCategory: manipulationsCategory(httpClient, URLS.MEDICINE.MANIPULATIONS_CATEGORIES),
  manipulations: manipulations(httpClient, URLS.MEDICINE.MANIPULATIONS),
  manufacturer: manufacturer(httpClient, URLS.MEDICINE.MANUFACTURER),
  patients: patients(httpClient, URLS.MEDICINE.PATIENTS),
  plan: plan(httpClient, URLS.MEDICINE.PLAN),
  reagents: reagents(httpClient, URLS.MEDICINE.REAGENTS),
  teethCard: teethCard(httpClient, URLS.MEDICINE.TEETH_CARD),
  teethStatus: teethStatus(httpClient, URLS.MEDICINE.TEETH_STATUS),

  countries: countries(httpClient, URLS.COMMON.COUNTRIES),
  currencies: currencies(httpClient, URLS.COMMON.CURRENCIES),
  documents: documents(httpClient, URLS.COMMON.DOCUMENTS),
  files: files(httpClient, URLS.COMMON.FILES),
  unitsGroup: unitsGroup(httpClient, URLS.COMMON.UNITS_GROUP),
  units: units(httpClient, URLS.COMMON.UNITS),
  icd: icd(httpClient, URLS.COMMON.ICD),

  block: block(httpClient, URLS.CONSTRUCTOR.BLOCKS),
  form: form(httpClient, URLS.CONSTRUCTOR.FORMS),
  formitem: formitem(httpClient, URLS.CONSTRUCTOR.FORM_ITEMS),

  contacts: contacts(httpClient, URLS.CRM.CONTACTS),
  funnelStage: funnelStage(httpClient, URLS.CRM.FUNNEL_STAGE),
  leadFields: leadFields(httpClient, URLS.CRM.LEAD_FIELDS),
  lead: lead(httpClient, URLS.CRM.LEAD),
  salesFunnel: salesFunnel(httpClient, URLS.CRM.SALES_FUNNEL)
});
