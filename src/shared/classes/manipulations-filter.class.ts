import Multiselect from "./multiselect/multiselect.model";
import MultiselectValue from "./multiselect/multiselect-value.model";
import Manipulation from "./manipulation";
import AppointmentRecord from "./AppointmentRecord.class";

export default class ManipulationsFilter {
  doctors: Multiselect;
  referrals: Multiselect;
  dates: Multiselect;
  statuses: Multiselect;
  textSearch: string;

  constructor() {
    this.doctors = new Multiselect();
    this.referrals = new Multiselect();
    this.dates = new Multiselect();
    this.statuses = new Multiselect();
    this.textSearch = "";
  }

  isDoctorSelected(name: string) {
    if (this.doctors.selected.length) {
      return this.doctors.selected.find(
        (doctor: MultiselectValue) => doctor.name === name
      );
    }
    return true;
  }

  isReferralSelected(name: string) {
    if (this.referrals.selected.length) {
      return this.referrals.selected.find(
        (referral: MultiselectValue) => referral.name === name
      );
    }
    return true;
  }

  isDateSelected(name: string) {
    if (this.dates.selected.length) {
      return this.dates.selected.find(
        (date: MultiselectValue) => date.name === name
      );
    }
    return true;
  }

  isStatusSelected(name: string) {
    if (this.statuses.selected.length) {
      return this.statuses.selected.find(
        (status: MultiselectValue) => status.name === name
      );
    }
    return true;
  }

  static getSelectedFilterValues(filter: ManipulationsFilter) {
    let values: any = {};
    const doctors = this.getValueIdsFromMultiselect(filter.doctors.selected);
    if (doctors.length) {
      values = { ...values, doctors };
    }
    const referrals = this.getValueIdsFromMultiselect(
      filter.referrals.selected
    );
    if (referrals.length) {
      values = { ...values, referrals };
    }
    const dates = this.getValueIdsFromMultiselect(filter.dates.selected);
    if (dates.length) {
      values = { ...values, dates };
    }
    const statuses = this.getValueIdsFromMultiselect(filter.statuses.selected);
    if (statuses.length) {
      values = { ...values, statuses };
    }
    if (filter.textSearch) {
      values = { ...values, searchText: filter.textSearch };
    }
    return values;
  }

  getFilterValuesFromUrl(urlParams: any) {
    if (urlParams) {
      const { doctors, referrals, dates, statuses, searchText } = urlParams;

      const doctorsNames = this.getValuesFromString(doctors);
      this.doctors.selected = this.doctors.list.filter(d =>
        doctorsNames.some((name: string) => d.name === name)
      );

      const referralsNames = this.getValuesFromString(referrals);
      this.referrals.selected = this.referrals.list.filter(d =>
        referralsNames.some((name: string) => d.name === name)
      );

      const datesNames = this.getValuesFromString(dates);
      this.dates.selected = this.dates.list.filter(d =>
        datesNames.some((name: string) => d.name === name)
      );

      const statusesNames = this.getValuesFromString(statuses);
      this.statuses.selected = this.statuses.list.filter(d =>
        statusesNames.some((name: string) => d.name === name)
      );
      this.textSearch = searchText;
    }
  }

  static getValuesFromManipulations(manipulations: Manipulation[]) {
    const filter: ManipulationsFilter = new ManipulationsFilter();
    if (manipulations && manipulations.length) {
      manipulations.forEach((manipulation: Manipulation, i: number) => {
        if (manipulation.appointment) {
          // statuses
          filter.statuses.list.push(
            new MultiselectValue(i, manipulation.appointment.completion_status)
          );

          if (
            manipulation.appointment.records &&
            manipulation.appointment.records.length
          ) {
            manipulation.appointment.records.forEach(
              (record: AppointmentRecord) => {
                // doctors
                filter.doctors.list.push(
                  new MultiselectValue(i, record.doctor.name)
                );
              }
            );

            // dates
            filter.dates.list.push(
              new MultiselectValue(
                i,
                manipulation.appointment.records[0].date || `date ${i}`
              )
            );
          }
        }

        // referrals
        filter.referrals.list.push(
          new MultiselectValue(i, manipulation.referral || `referral ${i}`)
        );
      });
    }
    return filter;
  }

  reset() {
    this.doctors.list = [];
    this.doctors.selected = [];
    this.referrals.list = [];
    this.referrals.selected = [];
    this.dates.list = [];
    this.dates.selected = [];
    this.statuses.list = [];
    this.statuses.selected = [];
  }

  private static getValueIdsFromMultiselect(array: MultiselectValue[]): string {
    return array ? array.map((el: MultiselectValue) => el.name).join(",") : "";
  }

  private getValuesFromString(str: string): any {
    return str ? str.split(",") : [];
  }
}
