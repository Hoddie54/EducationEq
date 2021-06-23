import "./badge.styles.scss"

function Badge(props) {
  return (
    <div
      className="badge"
      onClick={() => {
        console.log("hi")
        window.open(
          `/specification?topic=${props.topic_id}&subtopic=${props.subtopic_id}`,
          "_blank"
        )
      }}
    >
      {props.number}
    </div>
  )
}

export default Badge
