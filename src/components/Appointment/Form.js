import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  
  const [interviewer, setInterviewer] = useState(interviewer);
  const [name, setName] = useState("")
  const interviewers = props.interviewers;
  const interviewer = props.interviewer;

  const setInterviewer = interviewer => {
    interviewer = interviewers[id]; 
  }  

  const setName = name => {
    props.name;
   } 
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder={props.name && "Enter Student Name"}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList 
        interviewers={interviewers} 
        interviewer={interviewer && interviewers.id} 
        setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => props.onCancel()}>Cancel</Button>
          <Button confirm onClick={() => props.onSave()}>Save</Button>
        </section>
      </section>
    </main>
  )
}