import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newEl, replace = false) { 
    replace ?
    setHistory([...history.slice(0,-1), newEl]):
    setHistory([...history, newEl]);
    setMode(newEl);
  }
  const back = function() { 
    setHistory([...history.slice(0, -1)]);
    setMode(history.length-2>=0 ? history[history.length-2] : history[0]);
   }
  
  return { mode, transition, back };
};

// const history =[];