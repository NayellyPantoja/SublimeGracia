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

const ModalDescriptionHome = ({
  open,
  handleClose,
  textSelected,
  setIsChange,
}) => {
  const [textEditado, setTextEditado] = useState({
    description: textSelected.description,
  });
  console.log("textSelected", textSelected);

  const handleChange = (e) => {
    setTextEditado(() => ({
      ...textEditado,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const textCollection = collection(db, "descriptionHome");
    updateDoc(doc(textCollection, textSelected.id), textEditado).then(() => {
      setIsChange(true);
      handleClose();
      console.log(textSelected);
    });
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form className="formEdit">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handleClose}
            className="closeModal"
          />

          <TextField
            variant="outlined"
            label="Descripción"
            name="description"
            defaultValue={textSelected.description}
            onChange={handleChange}
            multiline 
            rows={15} 
            InputProps={{
              style: { fontSize: '15px' } 
            }}
          />
          <Button
            variant="contained"
            className="buttonEdit"
            onClick={handleSubmit}
          >
            Actualizar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalDescriptionHome;
