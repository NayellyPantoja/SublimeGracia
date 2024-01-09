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

const ModalMainTextSola = ({open, handleCloseText, setIschange, textSelected}) => {

   const [textEditado, setTextEditado] = useState({
    description: textSelected.description
   })
    console.log("textSelected", textSelected)

  const handleChange = (e) => {
    setTextEditado(() => ({
      ...textEditado, description: e.target.value
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const textCollection = collection(db, "mainTextReforma")
    updateDoc(doc(textCollection, textSelected.id), textEditado).then(() =>{
      setIschange(true)
      handleCloseText()
      console.log(textSelected)
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
        <FontAwesomeIcon icon={faXmark} onClick={handleCloseText} className="closeModal"/>
          <TextField
            variant="outlined"
            label="Descripción"
            name="description"
            defaultValue={textSelected.description}
            onChange={handleChange}
            multiline 
            rows={10}
          />
          <Button variant="contained" className="buttonEdit" onClick={handleSubmit}>Actualizar</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalMainTextSola;
