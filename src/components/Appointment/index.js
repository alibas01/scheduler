import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR = "ERROR";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const add = () => transition(CREATE);

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(()=> {
      transition(SHOW);
    })
  }
  function deleteInt() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(()=> {
      transition(EMPTY);
    })
  } 
  

  return (
  <article className="appointment">

    <Header time = {props.time}/>

    {mode === EMPTY && <Empty onAdd={() => add()} />} 
    {mode === ERROR && <Error message={'Could not delete appointment.'} />} 
    {mode === SAVING && <Status message={'Saving!'} />} 
    {mode === DELETING && <Status message={'Deleting!'} />} 
    {mode === CONFIRM && <Confirm message={'Delete the appointment!'}
    onConfirm={() => deleteInt()} onCancel={() => back()} />} 
    {mode === CREATE && <Form 
    interviewers = {props.interviewers}
    onSave = {(name, interviewer) => save(name, interviewer)}
    onCancel = {() => back()}
    />}
    {mode === EDIT && <Form 
    interviewers = {props.interviewers}
    name = {props.interview.student}
    interviewer = {props.interview.interviewer.id}
    onSave = {(name, interviewer) => save(name, interviewer)}
    onCancel = {() => back()}
    />}
    {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer.name}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
      />
    )}
  </article>);
};
