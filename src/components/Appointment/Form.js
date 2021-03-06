import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  
  const interviewers = props.interviewers;
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState(null);

  
  const reset = function () {
    setName("");
    setInterviewer(null);
  }
  const cancel = function () {
    reset();
    props.onCancel();
  }
  const validate = function () {
    if (!name) {
      setError('student name cannot be blank');
      return;
    }
    if (!interviewer) { // this part is additional
      setError('Please choose an interviewer');
      return;
    }
    setError(null);
    props.onSave(name, interviewer);
  }
    
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder= "Enter Student Name"
            value={name}
            onChange={name => setName(name.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
        interviewers={interviewers} 
        value={interviewer} 
        onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};