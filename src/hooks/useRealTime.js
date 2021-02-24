import { useEffect } from "react";

export default function useRealTime(dispatch, state) {
//this hook is created for web socket. Interviews and updating interviews are working fine. 
//remaining spots calculation is not working. The client who demands the interview operation can see updated spots info
// on his/her screen. Others can't. Because I commented out related lines. Since this activity is stretch and 
//I already spent too much time, I will revisit this issue some other time.

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
        return dispatch({ type: "SET_INTERVIEW", appointments: appointments, days: newDays });
      }
    }
    return () => {ws.close()};
  }, [dispatch, state]);
}
