import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal, TextField } from "@mui/material";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../../context/AuthContext";

const ModalMainTextSola = ({
  open,
  handleCloseText,
  setIschange,
  textSelected,
}) => {
  const { style } = useContext(AuthContext);
  const [textEditado, setTextEditado] = useState({
    description: textSelected.description,
  });

  const handleChange = (e) => {
    setTextEditado(() => ({
      ...textEditado,
      description: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const textCollection = collection(db, "mainTextReforma");
    updateDoc(doc(textCollection, textSelected.id), textEditado).then(() => {
      setIschange(true);
      handleCloseText();
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
            onClick={handleCloseText}
            className="closeModal"
          />
          <TextField
            variant="outlined"
            label="Descripción"
            name="description"
            defaultValue={textSelected.description}
            onChange={handleChange}
            multiline
            rows={10}
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

export default ModalMainTextSola;
