import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal, TextField } from "@mui/material";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebaseConfig";

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

const ModalEdit = ({ open, handleClose, solaSelected,setIschange }) => {

  const [solaEditada, setSolaEditada] = useState({
    title: "",
    description:""
  })

  const handleChange = (e) => {
    setSolaEditada((prevSolaEditada) => ({...prevSolaEditada, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const solasCollection = collection(db, "solas")
    updateDoc(doc(solasCollection, solaSelected.id), solaEditada).then(() =>{
      setIschange(true)
      handleClose()
    })
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        <form className="formEdit" >
        <FontAwesomeIcon icon={faXmark} onClick={handleClose} className="closeModal"/>
          <TextField variant="outlined" label="Título" name="title" defaultValue={solaSelected?.title} onChange={handleChange}/>
          <TextField
            variant="outlined"
            label="Descripción"
            name="description"
            defaultValue={solaSelected?.description}
            onChange={handleChange}
          />
          <Button variant="contained" className="buttonEdit" onClick={handleSubmit}>Actualizar</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
