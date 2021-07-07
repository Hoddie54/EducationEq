import "./general-card.styles.scss"
import { useHistory } from "react-router-dom"

function GeneralCard(props) {
  const history = useHistory()

  return (
    <div className="general-card__container">
      <div className="general-card__text">{props.text1}</div>
      <div className="general-card__text">{props.text2}</div>
      {props.card_number ? (
        <div className="general-card__count">{`${props.card_count} cards`}</div>
      ) : (
        ""
      )}
      <div
        className={`general-card__button ${
          props.button_disabled ? "disabled" : ""
        }`}
        onClick={() => {
          history.push(props.button_link)
        }}
      >
        {props.button_text}
      </div>
    </div>
  )
}

export default GeneralCard
