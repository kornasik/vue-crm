export default {
  state: {
    shiftWork: false,
    selectedDoctorId: 1,
    nameDoctor: "Dr.Strange",
    weekDay: {
      daily: []
    },
    additional_schedule: [],
    weekDayShiftWork: {
      even: [],
      odd: []
    },
    idSchedule: 0,
    activeTab: "tab-even",
    statusSchedule: "add"
  },
  mutations: {
    editShiftWork(state) {
      state.shiftWork = !state.shiftWork;
    },
    setIdSelectedDoctor(state, payload) {
      state.selectedDoctorId = payload;
    },
    setNameDoctor(state, payload) {
      state.nameDoctor = payload;
    },
    setWeekDayTimes(state, payload) {
      if (
        state.weekDay.daily &&
        state.weekDay.daily.some(item => item.day === payload.day)
      ) {
        state.weekDay.daily.splice(
          state.weekDay.daily.findIndex(element => element.day === payload.day),
          1,
          payload
        );
      } else {
        state.weekDay.daily.push(payload);
      }
    },
    setWeekDayShiftWork(state, payload) {
      if (state.activeTab === "tab-even") {
        if (
          state.weekDayShiftWork.even &&
          state.weekDayShiftWork.even.some(item => item.day === payload.day)
        ) {
          state.weekDayShiftWork.even.splice(
            state.weekDayShiftWork.even.findIndex(
              element => element.day === payload.day
            ),
            1,
            payload
          );
        } else {
          state.weekDayShiftWork.even.push(payload);
        }
      }
      if (state.activeTab === "tab-odd") {
        if (
          state.weekDayShiftWork.odd &&
          state.weekDayShiftWork.odd.some(item => item.day === payload.day)
        ) {
          state.weekDayShiftWork.odd.splice(
            state.weekDayShiftWork.odd.findIndex(
              element => element.day === payload.day
            ),
            1,
            payload
          );
        } else {
          state.weekDayShiftWork.odd.push(payload);
        }
      }
    },
    setAdditionalSchedule(state) {
      state.additional_schedule.push({
        date: "",
        start: "",
        end: ""
      });
    },
    setAdditionalScheduleValue(state, { date, start, end, index }) {
      if (date) {
        state.additional_schedule[index].date = date;
      }
      if (start) {
        state.additional_schedule[index].start = start;
      }
      if (end) {
        state.additional_schedule[index].end = end;
      }
    },
    setActiveTab(state, payload) {
      state.activeTab = payload;
    },
    deleteElementAdditionalSchedule(state, payload) {
      state.additional_schedule = [
        ...state.additional_schedule.slice(0, payload),
        ...state.additional_schedule.slice(payload + 1)
      ];
    },
    setDataDoctor(state, payload) {
      state.idSchedule = payload.id;
      state.selectedDoctorId = payload.doctor_id;
      state.nameDoctor = payload.doctor;
      state.additional_schedule = payload.additional_schedule;
      if (payload.mode === "weekly") {
        state.shiftWork = true;
        state.weekDayShiftWork = payload.schedule_week;
      }
      if (payload.mode === "daily") {
        state.shiftWork = false;
        if (state.weekDay.daily) {
          state.weekDay = payload.schedule_week;
        } else {
          state.weekDay = payload.schedule_week;
        }
      }
    },
    cleanDataDoctor(state) {
      state.shiftWork = false;
      state.weekDay.daily = [];
      state.additional_schedule = [];
      state.weekDayShiftWork.even = [];
      state.weekDayShiftWork.odd = [];
      state.activeTab = "tab-even";
    },
    changeStatusSchedule(state, payload) {
      state.statusSchedule = payload;
    }
  },
  getters: {}
};
