import "./related-specpoints.styles.scss"

function RelatedSpecpoints(props) {
  const data = props.specpoints

  const my_specpoint = data.find(
    (specpoint) => specpoint.UID === props.specpoint
  )

  return (
    <div className="related__specpoints">
      <div className="specpoints__number">
        This video addresses {data.length} specficiation point
        {`${data.length === 1 ? "." : "s."}`}
      </div>
      <div>
        <div className="specpoints__title">Your spec point</div>
        <div className="specpoints__specpoint">
          <span className="blue-text">{my_specpoint.number} </span>
          <span>{my_specpoint.text}</span>
        </div>
        {data.length > 1 ? (
          <>
            <div className="specpoints__title">
              This video also contains the following spec points
            </div>
            {data.map((specpoint) => {
              if (specpoint.UID === props.specpoint) return ""
              return (
                <div className="specpoints__specpoint">
                  <span className="blue-text">{`${specpoint.number} `}</span>
                  <span>{specpoint.text}</span>
                </div>
              )
            })}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default RelatedSpecpoints
