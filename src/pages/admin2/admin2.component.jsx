import AdminTileApproval from "../../components/admin-tile-approval/admin-tile-approval.component"
import AdminTileForm from "../../components/admin-tile-form/admin-tile-form.component"
import {
  tutorForm,
  addNewClassForm,
  removeTutorForm,
  updateTutorDetails,
  updateTutorAvailability,
  deleteClassForm,
  changeClassDateForm,
  addStudentToClassForm,
  removeStudentFromClassForm,
  addNewStudentForm,
  simulateScheduleForm,
  viewStudentsInClass,
  addCreditForm,
  downloadData,
  downloadAttendanceData,
  changeClassTutorForm,
} from "../../components/admin-tile-form-data"

import "./admin2.styles.scss"

function Admin2() {
  const tiles = [
    // <AdminTileApproval />,
    <AdminTileForm
      onSubmit={viewStudentsInClass.onSubmit}
      form={viewStudentsInClass.form}
      initial_state={viewStudentsInClass.initial_state}
      title="View students in a class"
      getLoadedFormData={viewStudentsInClass.getLoadedFormData}
    />,
    <AdminTileForm
      onSubmit={tutorForm.onSubmit}
      form={tutorForm.form}
      initial_state={tutorForm.initial_state}
      title="Add a new tutor"
    />,
    <AdminTileForm
      onSubmit={addNewStudentForm.onSubmit}
      form={addNewStudentForm.form}
      initial_state={addNewStudentForm.initial_state}
      title="Add a new student"
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
      title="Change class date/time"
      onSubmit={changeClassDateForm.onSubmit}
      form={changeClassDateForm.form}
      initial_state={changeClassDateForm.initial_state}
      getLoadedFormData={changeClassDateForm.getLoadedFormData}
    />,
    <AdminTileForm
      title="Change class tutor"
      onSubmit={changeClassTutorForm.onSubmit}
      form={changeClassTutorForm.form}
      initial_state={changeClassTutorForm.initial_state}
      getLoadedFormData={changeClassTutorForm.getLoadedFormData}
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
    <AdminTileForm
      title="Add lesson credit"
      onSubmit={addCreditForm.onSubmit}
      form={addCreditForm.form}
      initial_state={addCreditForm.initial_state}
      getLoadedFormData={addCreditForm.getLoadedFormData}
    />,
    <AdminTileForm
      title="Download data"
      onSubmit={downloadData.onSubmit}
      form={downloadData.form}
      initial_state={{}}
    />,
    <AdminTileForm
      title="Download Attendance Data"
      onSubmit={downloadAttendanceData.onSubmit}
      form={downloadAttendanceData.form}
      initial_state={downloadAttendanceData.initial_state}
    />,
    <AdminTileForm
      title="Simulate a schedule"
      onSubmit={simulateScheduleForm.onSubmit}
      form={simulateScheduleForm.form}
      initial_state={simulateScheduleForm.initial_state}
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
