import { collection, doc, updateDoc } from "firebase/firestore";
import {  useState } from "react";
import { db, uploadFile } from "../../firebaseConfig";
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

const ModalPrinciple = ({
  openEdit,
  handleCloseEdit,
  principioSelected,
  setIsChange,
}) => {
  

  const [file, setFile] = useState(null);
  const [imgCargada, setImgCargada] = useState(false)
  const [loading, setLoading] = useState(false);
  const [principioEditado, setPrincipioEditado] = useState({
    title: principioSelected.title,
    description: principioSelected.description,
    img: principioSelected.img,
  });
  console.log(principioEditado)

  const handleChange = (e) => {
    setPrincipioEditado((prevPrincipioEditado) => ({
      ...prevPrincipioEditado,
      [e.target.name]: e.target.value
    }));
  };

  const handleImage = async () => {
    try {
      setLoading(true)
      let url = await uploadFile(file)
      
      setPrincipioEditado({...principioEditado, img: url });
      setLoading(false)
      setImgCargada(true)
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const principioCollection = collection(db, "principios");
      await updateDoc(doc(principioCollection, principioSelected.id), principioEditado).then(() => {
        console.log("handleSubmit ", principioEditado)
        setIsChange(true)
        handleCloseEdit()
      })
      
    
    
  };

  return (
    <Modal
      open={openEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form className="formEdit">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handleCloseEdit}
            className="closeModal"
          />
          <TextField
            variant="outlined"
            label="Título"
            name="title"
            defaultValue={principioSelected?.title}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Descripción"
            name="description"
            defaultValue={principioSelected?.description}
            onChange={handleChange}
          />
          <TextField type="file" onChange={(e) => setFile(e.target.files[0]) } />
          {
            file && !imgCargada && <Button variant="contained"
            className="buttonEdit" onClick={handleImage}>{(loading ) ? "Cargando..." : "Cargar"}</Button>
          }
          
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

export default ModalPrinciple;
