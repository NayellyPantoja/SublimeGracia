import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal, TextField } from "@mui/material";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../../context/AuthContext";

const ModalEdit = ({ open, handleClose, solaSelected,setIschange }) => {
  const { style } = useContext(AuthContext);
  const [solaEditada, setSolaEditada] = useState({
    title: solaSelected.title,
    description: solaSelected.description
  })

  const handleChange = (e) => {
    setSolaEditada(() => ({...solaEditada, [e.target.name]: e.target.value}))
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
            multiline 
            rows={15}
          />
          <Button variant="contained" className="buttonEdit" onClick={handleSubmit}>Actualizar</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
