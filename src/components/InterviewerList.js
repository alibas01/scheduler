import React from "react";
import classnames from "classnames";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  let itemClass = classnames({
    "interviewers" :true,
    "interviewers__header":props.id,
    "interviewers__list" :props
    })
  
  const interviewers = props.interviewers;
  
  const listItems = interviewers.map(interviewer => 
    <InterviewerListItem 
    key={interviewer.id}
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={interviewer.id === props.interviewer}
    setInterviewer={props.setInterviewer}  />
  )

  return (
    <section className="interviewers">
      <h4 className={itemClass}>Interviewer</h4>
      <ul className={itemClass}>{listItems}</ul>
    </section>
  )
}