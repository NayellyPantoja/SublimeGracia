import { collection, doc, updateDoc } from "firebase/firestore"
import { useContext, useState } from "react"
import { db } from "../../firebaseConfig"
import { Box, Button, Modal, TextField } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";

const ModalTextConfesion = ({open, handleClose, textSelected, setIsChange}) => {
    const { style } = useContext(AuthContext);
    const [textEditado, setTextEditado] = useState({
        title: textSelected.title,
        description: textSelected.description
       })
    
      const handleChange = (e) => {
        setTextEditado(() => ({
          ...textEditado, [e.target.name]: e.target.value
        }))
      }
    
      const handleSubmit = (e) =>{
        e.preventDefault()
        const textCollection = collection(db, "textConfesionDeFe")
        updateDoc(doc(textCollection, textSelected.id), textEditado).then(() =>{
          setIsChange(true)
          handleClose()
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
            <FontAwesomeIcon icon={faXmark} onClick={handleClose} className="closeModal"/>
              <TextField
                variant="outlined"
                label="Título"
                name="title"
                defaultValue={textSelected.title}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="Descripción"
                name="description"
                defaultValue={textSelected.description}
                onChange={handleChange}
                multiline 
                rows={15}
              />
              <Button variant="contained" className="buttonEdit" onClick={handleSubmit}>Actualizar</Button>
            </form>
          </Box>
        </Modal>
      );
}

export default ModalTextConfesion