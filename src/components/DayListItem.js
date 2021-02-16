import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let itemClass = classnames({
  "day-list__item" :true,
  "day-list__item--selected":props.selected,
  "day-list__item--full" :(props.spots === 0)
  })

  const formatSpots = function (obj) {
    let spotsRemaining = 
    obj.spots > 1 ? `${obj.spots} spots remaining` : 
    obj.spots === 1 ? "1 spot remaining" : 
    "no spots remaining";
    return <h3 className="text--light">{`${spotsRemaining}`}</h3>
  }

  return (
    <li onClick={() => props.setDay(props.name)}
    className={itemClass}>
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots(props)}
    </li>
  );
}

