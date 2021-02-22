import { useEffect } from "react";




export default function useRealTime(dispatch, state) {

  useEffect( () => {

    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onopen = function open() {
      ws.send("ping");
    };

    ws.onmessage = function(event) {
      const data = JSON.parse(event.data);
      if(typeof data === 'object' && data.type === "SET_INTERVIEW") {
        // console.log('received', data);
        // const dayID = Math.ceil(data.id / 5);
        // console.log('days', state.days)
        // const index = dayID-1;
        // let newSpot;
        // if (state.days.length>=1) {
        //   newSpot = data.interview ? 
        //   state.days[index].spots - 1 :
        //   state.days[index].spots + 1;
        // }
        const newDays = [...state.days];
        //newDays[index] = {...newDays[index], spots: newSpot}
        const appointment = {
          ...state.appointments[data.id],
          interview: data.interview ? { ...data.interview } : null
        };
        const appointments = {
          ...state.appointments,
          [data.id]: appointment
        };
        console.log("state", state);
        dispatch({ type: "SET_INTERVIEW", appointments: appointments, days:newDays })
      }
    }
  }, [dispatch, state]);
}
