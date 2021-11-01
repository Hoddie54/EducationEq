import AdminTileApproval from "../../components/admin-tile-approval/admin-tile-approval.component"
import AdminTileForm from "../../components/admin-tile-form/admin-tile-form.component"
import {
  tutorForm,
  addNewClassForm,
  removeTutorForm,
  updateTutorDetails,
  updateTutorAvailability,
  deleteClassForm,
  addStudentToClassForm,
  removeStudentFromClassForm,
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
      title="Update Tutor details"
      onSubmit={updateTutorDetails.onSubmit}
      form={updateTutorDetails.form}
      initial_state={updateTutorDetails.initial_state}
    />,
    <AdminTileForm
      title="Update Tutor availability"
      onSubmit={updateTutorAvailability.onSubmit}
      form={updateTutorAvailability.form}
      initial_state={updateTutorAvailability.initial_state}
    />,
    <AdminTileForm
      title="Remove a tutor"
      onSubmit={removeTutorForm.onSubmit}
      form={removeTutorForm.form}
      getLoadedFormData={removeTutorForm.getLoadedFormData}
      initial_state={removeTutorForm.initial_state}
    />,
    <AdminTileForm
      title="Add a class"
      onSubmit={addNewClassForm.onSubmit}
      form={addNewClassForm.form}
      initial_state={addNewClassForm.initial_state}
      getLoadedFormData={addNewClassForm.getLoadedFormData}
    />,
    <AdminTileForm
      title="Delete class"
      onSubmit={deleteClassForm.onSubmit}
      form={deleteClassForm.form}
      initial_state={deleteClassForm.initial_state}
      getLoadedFormData={deleteClassForm.getLoadedFormData}
    />,
    <AdminTileForm
      title="Add student to class"
      onSubmit={addStudentToClassForm.onSubmit}
      form={addStudentToClassForm.form}
      initial_state={addStudentToClassForm.initial_state}
      getLoadedFormData={addStudentToClassForm.getLoadedFormData}
    />,
    <AdminTileForm
      title="Remove student from class"
      onSubmit={removeStudentFromClassForm.onSubmit}
      form={removeStudentFromClassForm.form}
      initial_state={removeStudentFromClassForm.initial_state}
      getLoadedFormData={removeStudentFromClassForm.getLoadedFormData}
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
