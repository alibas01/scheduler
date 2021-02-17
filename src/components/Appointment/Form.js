import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  
  const interviewers = props.interviewers;
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "")

  // const setInterviewer = interviewer => {
  //   interviewer = interviewers[id]; 
  // }  

  // const setName = name => {
  //   props.name;
  // } 

  const reset = function () {
    setName("");
    setInterviewer(null)
  }
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder= "Enter Student Name"
            /*
              This must be a controlled component
            */
           {...name}
          />
        </form>
        <InterviewerList 
        interviewers={interviewers} 
        interviewer={interviewer && interviewers.id} 
        setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger 
          onClick={() => {
            props.onCancel();
            reset();
            }
          }>Cancel</Button>
          <Button confirm onClick={() => props.onSave()}>Save</Button>
        </section>
      </section>
    </main>
  )
}