import "./admin2.styles.scss"

function Admin2() {
  const tiles = []

  return (
    <div className="admin2-wrapper">
      <div className="admin2-header">
        <p>Admin panel</p>
      </div>
      <div className="admin2-content">
        <div className="admin2-tiles">
          {tiles.map((tile, index) => {
            return (
              <div key={index} className="admin-tile">
                {tile}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Admin2
