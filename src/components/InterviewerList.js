import React from "react";
import classnames from "classnames";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  // let itemClass = classnames({
  //   "interviewers" :true,
  //   "interviewers__header":props.interviewer,
  //   "interviewers__list" :props.interviewers
  //   })
  
  const interviewers = props.interviewers;
  
  const listItems = interviewers.map(interviewer => 
    <InterviewerListItem 
    key={interviewer.id}
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={interviewer.id === props.interviewer}
    setInterviewer={event => props.setInterviewer(interviewer.id)}  />
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listItems}</ul>
    </section>
  )
}