import React from "react";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterviewersForDay, getInterview, defaultInterviewerForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData"

import "components/Application.scss";
import DayList from "./DayList";

export default function Application(props) {
  const {
    state,
    setDay,
    setDays,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);
        
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const defaultInterviewer = defaultInterviewerForDay(state, state.day);
  console.log(defaultInterviewer)
  const listItems = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
    <Appointment 
    key={appointment.id}
    id={appointment.id}
    time={appointment.time} 
    interview={interview}
    interviewers={dailyInterviewers}
    defaultInterviewer={defaultInterviewer}
    bookInterview={(id, interview) => bookInterview(id, interview)}
    cancelInterview={(id) => cancelInterview(id)}
    />);
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
        days={state.days} 
        day={state.day} 
        setDay={setDay}
        setDays={setDays} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {listItems} 
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
