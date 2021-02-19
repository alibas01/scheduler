import React, { useState, useEffect } from "react";
import axios from 'axios';
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

import "components/Application.scss";
import DayList from "./DayList";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  let dailyAppointments = [];
  
  useEffect( () => {
    Promise.all([
      axios.get("/api/days"), 
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")])
      .then(responses => 
        {setState(prev => 
          ({...prev, days: responses[0].data, appointments: responses[1].data, interviewers: responses[2].data})
          )})
        }, []);
        
  let dailyInterviewers = getInterviewersForDay(state, state.day);
  const bookInterview = (id, interview) => console.log(id, 'id', interview);
        
  dailyAppointments = getAppointmentsForDay(state, state.day);  
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
