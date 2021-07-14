import "./related-specpoints.styles.scss"

function RelatedSpecpoints(props) {
  return (
    <div className="related__specpoints">
      <div className="specpoints__number">This video address </div>
      <div>
        <div className="specpoints__title">Your spec point</div>
        <div className="specpoints__specpoint">
          <span className="blue-text">3.11 </span>
          <span>Text</span>
        </div>
        <div className="specpoints__title">
          This video contains the following spec points
        </div>
        {props.specpoints.map((specpoint) => {
          return (
            <div className="specpoints__specpoint">
              <span className="blue-text">3.11</span>
              <span>Text</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RelatedSpecpoints
