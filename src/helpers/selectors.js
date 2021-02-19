

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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    let interviewerID = interview.interviewer;
    let designatedInterviewer = state.interviewers[interviewerID];
    return {...interview, interviewer:designatedInterviewer};
  }   
}

export function getInterviewersForDay(state, day) {
  let result = [];

  let filteredDays = state.days.filter(e => e.name === day);
  filteredDays = filteredDays[0];
  
  const interviewersArr = filteredDays ? filteredDays['interviewers'] : [];
  for (let app of interviewersArr) {
    result.push(state.interviewers[app])
  }
  return result;
}