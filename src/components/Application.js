import React from "react";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData"
import Error from "components/Appointment/Error";

import "components/Application.scss";
import DayList from "./DayList";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);
        
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const listItems = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
    <Appointment
    key={appointment.id}
    id={appointment.id}
    time={appointment.time} 
    interview={interview}
    interviewers={dailyInterviewers}
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
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {listItems.length !==0 ? listItems : <Error message={'Backend(database) is sleeping. Please wake it up by refreshing the page! Give it a minute! Heroku will wake it up asap..'} onClose = {() => console.log('Wait, be patient please!')}/>} 
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
