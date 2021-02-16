import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function ListItem(props) {
  let itemClass = classnames({
  "interviewers__item" :true,
  "interviewers__item--selected":props.selected,
  "interviewers__item-image" :props.avatar,
  "interviewers__item--selected-image" :(props.selected && props.avatar)
  })

  

  return (
    <li className={itemClass} onClick={() => props.setInterviewer(props.name)}>
      <img
      className={itemClass}
      id={props.id}
      src={props.avatar}
      alt={props.name}
      />
    {props.name}
   </li>
  );
}