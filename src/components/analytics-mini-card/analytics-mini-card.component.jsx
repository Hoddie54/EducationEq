import React from "react";
import "./analytics-mini-card.styles.scss";

const AnalyticsMiniCard = (props) => {
  const { style, title, subtitle, value } = props;
  return (
    <div className="details analytics-mini-card" style={style}>
      <div className="details-analytics-mini-card">
        <div>
        <div className="analytics-mini-card-title">{title}</div>
        <div className="analytics-mini-card-name">{subtitle}</div>
        </div>
        <div className="analytics-mini-card-per">{value}</div>
      </div>
    </div>
  );
};
export default AnalyticsMiniCard;
