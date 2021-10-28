import AdminTileApproval from "../../components/admin-tile-approval/admin-tile-approval.component"
import AdminTileForm from "../../components/admin-tile-form/admin-tile-form.component"
import {
  tutorForm,
  addNewClassForm,
} from "../../components/admin-tile-form-data"

import "./admin2.styles.scss"

function Admin2() {
  const tiles = [
    <AdminTileApproval />,
    <AdminTileForm
      onSubmit={tutorForm.onSubmit}
      form={tutorForm.form}
      initial_state={tutorForm.initial_state}
      title="Add a new tutor"
    />,
    <AdminTileForm
      title="Add a class"
      onSubmit={addNewClassForm.onSubmit}
      form={addNewClassForm.form}
      initial_state={addNewClassForm.onSubmit}
      getLoadedFormData={addNewClassForm.getLoadedFormData}
    />,
  ]

  return (
    <div className="admin2-wrapper">
      <div className="admin2-header">
        <p>Admin panel</p>
      </div>
      <div className="admin2-content">
        <div className="admin2-tiles">
          {tiles.map((tile, index) => {
            return (
              <div key={index} className="tile">
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
