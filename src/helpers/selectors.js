

export function getAppointmentsForDay(state, day) {
  let result = [];

  let filteredDays = state.days.filter(e => e.name === day);
  filteredDays = filteredDays[0];
  
  const appointmentArr = filteredDays ? filteredDays['appointments'] : [];
  for (let app of appointmentArr) {
    result.push(state.appointments[app])
  }
  return result;
}