import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { Box, Button, Modal, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ModalPrinciple = ({openEdit, handleCloseEdit, principioSelected, setIsChange}) => {
  

  return (
    <Modal
      open={openEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        
      </Box>
    </Modal>
  );
}

export default ModalPrinciple