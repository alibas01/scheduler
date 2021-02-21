import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  
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

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // const dayID = Math.ceil(id / 5);
    // const dayObj = state.days[dayID-1];
    // const spots = dayObj.spots-1;
    // const days = [...state.days, {...dayObj, spots:spots}];
    return axios.put(`http://localhost:8001/api/appointments/${id}`,{interview}).then((error) => {
      setState({...state, appointments})
    })
  };

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((error) => {
      !error && setState({...state, appointments});
    });
  }



  return { state, setDay, setDays, bookInterview, cancelInterview };
}













