import React from "react";
import './style.scss'
import Icons from "./eeicons.svg"; // Path to your icons.svg

export const IconSVG = (props) => {
    const { name } = props;
    return (
    <div className="icon-svg-wrapper">
      <svg className={`icon icon-${name}`}>
        <use xlinkHref={`${Icons}#icon-${name}`} />
      </svg>
    </div>)
    ;
  };