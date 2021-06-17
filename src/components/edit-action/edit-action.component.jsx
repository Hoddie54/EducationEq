import React, { useState } from "react";
import ConfirmActionDelete from "../../components/confirm-action-delete/confirm-action-delete.component";
import ConfirmActionConfirm from "../../components/confirm-action-confirm/confirm-action-confirm.component";
import "./edit-action.styles.scss";

const EditAction = (props) => {
  const { save, cancel } = props;
  const [show, setShow] = useState(false);
  const handleCloseConfirm = () => setShow(false);
  const handleShowConfirm = () => setShow(true);
  const [show_delete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  return (
    <>
      <div className="edit-action">
        <span className="edit-action__delete" onClick={cancel}>
          Cancel
        </span>
        <span className="edit-action__save" onClick={save}>
          Save
        </span>
      </div>
      <ConfirmActionDelete
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magn aliqua?zzz"
        show={show_delete}
        handleHide={handleCloseConfirm}
        handleDelete={cancel}
      ></ConfirmActionDelete>
      <ConfirmActionConfirm
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magn aliqua?zzzzzz"
        show={show}
        handleHide={handleCloseConfirm}
        handleConfirm={save}
      ></ConfirmActionConfirm>
    </>
  );
};
export default EditAction;
