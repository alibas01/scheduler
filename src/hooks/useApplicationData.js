import { useReducer, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return  {...state, 
          day: action.value
        }
      case SET_APPLICATION_DATA:
        return { ...state, 
          days: action.days, 
          appointments: action.appointments, 
          interviewers: action.interviewers 
        }
      case SET_INTERVIEW: {
        return {...state, 
          appointments:action.value}
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => dispatch({ type: SET_DAY, value: day });
  //const setDays = days => setState(prev => ({ ...prev, days }));
  
  useEffect( () => {
    Promise.all([
      axios.get("/api/days"), 
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")])
      .then(responses => 
        dispatch({ type: SET_APPLICATION_DATA, 
          days: responses[0].data, 
          appointments: responses[1].data, 
          interviewers: responses[2].data 
        })
      )
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
    const dayID = Math.ceil(id / 5);
    const index = dayID-1;
    const newSpot = state.days[index].spots - 1;
    const newDays = [...state.days];
    newDays[index] = {...newDays[index], spots: newSpot}
    return axios.put(`http://localhost:8001/api/appointments/${id}`,{interview}).then((error) => {
      dispatch({ type: SET_INTERVIEW, value: appointments })
      //setState({...state, appointments, days: newDays})
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
    const dayID = Math.ceil(id / 5);
    const index = dayID-1;
    const newSpot = state.days[index].spots + 1;
    const newDays = [...state.days];
    newDays[index] = {...newDays[index], spots: newSpot}
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((error) => {
      dispatch({ type: SET_INTERVIEW, value: appointments })
      //setState({...state, appointments, days:newDays});
    });
  }

  
  

  return { state, setDay, bookInterview, cancelInterview };
}












