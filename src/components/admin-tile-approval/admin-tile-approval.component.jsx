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
  }, [])

  return (
    <div>
      {isLoading ? "Loading approvals" : ""}
      {!isLoading ? (
        <>
          <div>
            <strong>
              <u>Approvals</u>
            </strong>
          </div>
          <div className="approvals">
            {data.map((approval) => {
              return (
                <div className="approval">
                  <div className="left">Name: {approval.parent_name}</div>
                  <div className="right">Child name: {approval.child_name}</div>
                  <div className="left">Email: {approval.email}</div>
                  <div className="right">Package: {approval.package}</div>
                  <div className="left">Phone: {approval.phone_number}</div>
                  <div className="right">Year group: {approval.year_group}</div>
                  <div className="left">UID: {approval.uid}</div>
                  <div className="right">
                    Add info: {approval.additional_info}
                  </div>
                  <div className="left">
                    Maths:{" "}
                    {approval.Mathematics.active ? (
                      <span>Requested</span>
                    ) : (
                      "N/A"
                    )}
                  </div>
                  <div className="right">
                    Biology:{" "}
                    {approval.Biology.active ? <span>Requested</span> : "N/A"}
                  </div>
                  <div className="left">
                    Chemistry:{" "}
                    {approval.Chemistry.active ? <span>Requested</span> : "N/A"}
                  </div>
                  <div className="right">
                    Physics:{" "}
                    {approval.Physics.active ? <span>Requested</span> : "N/A"}
                  </div>
                  <div className="approve-button">Approve all</div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  )
}

export default AdminTileApproval
