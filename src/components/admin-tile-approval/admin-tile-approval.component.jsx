import { useEffect, useState } from "react"
import { getAppovals } from "../../utils/firebase/firestore"
import "./admin-tile-approval.styles.scss"

function AdminTileApproval() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()

  useEffect(async () => {
    //LOAD DATA
    const approvalData = await getAppovals()
    setData(approvalData)
    setIsLoading(false)
  })

  return (
    <div>
      {isLoading ? "Loading" : ""}
      {!isLoading ? (
        <div className="approvals">
          {data.map((approval) => {
            return <div className="approval">
                
            </div>
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default AdminTileApproval
