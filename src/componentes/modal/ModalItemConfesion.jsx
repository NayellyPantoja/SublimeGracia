import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db, uploadFile } from "../../firebaseConfig";
import { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { deleteObject, getStorage, ref } from "firebase/storage";

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

const ModalItemConfesion = ({
  open,
  handleClose,
  setIsChange,
  confesionSelected,
  add,
  edit,
  itemConfesion,
}) => {
  const [file, setFile] = useState(null);
  const [imgCargada, setImgCargada] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confesionEditada, setConfesionEditada] = useState({
    title: confesionSelected.title,
    description: confesionSelected.description,
    img: confesionSelected.img,
  });
  const [newConfesion, setNewConfesion] = useState({
    title: "",
    description: "",
    img: ""
  });

  console.log(confesionEditada);

  const handleChange = (e) => {
    if (edit) {
      setConfesionEditada((prevConfesionEditada) => ({
        ...prevConfesionEditada,
        description: e.target.value.length <= 300 ? e.target.value : Swal.fire({
          icon: 'warning',
          title: '¡Atención!',
          text: 'Has excedido la cantidad máxima de 300 caracteres.',
        }),
        [e.target.name]: e.target.value,  
      }));
    } else if (add) {
      setNewConfesion((prevNewConfesion) => ({
        ...prevNewConfesion,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleImage = async () => {
    if (edit) {
      try {
        setLoading(true);
        let url = await uploadFile(file);

        setConfesionEditada({ ...confesionEditada, img: url });
        setLoading(false);
        setImgCargada(true);
      } catch (error) {
        console.log(error);
      }
    } else if (add) {
      try {
        setLoading(true);
        let url = await uploadFile(file);

        setNewConfesion({ ...newConfesion, img: url });
        setLoading(false);
        setImgCargada(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (edit) {
      if (confesionSelected.img) {
        const storage = getStorage();
        const storageRef = ref(storage, confesionSelected.img);
        await deleteObject(storageRef);
      }
      const confesionCollection = collection(db, "itemConfesion");
      await updateDoc(
        doc(confesionCollection, confesionSelected.id),
        confesionEditada
      ).then(() => {
        console.log("handleSubmit ", confesionEditada);
        setIsChange(true);
        handleClose();
      });
    } else if (add) {
    const nextId = itemConfesion.length + 1;
      const confesionCollection = collection(db, "itemConfesion");
      await setDoc(doc(confesionCollection, nextId.toString()),newConfesion).then(() => {
        console.log("handleSubmit ", newConfesion);
        setIsChange(true);
        handleClose();
      });
    }
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
            label="Título"
            name="title"
            defaultValue={confesionSelected?.title}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Descripción"
            name="description"
            defaultValue={confesionSelected?.description }
            onChange={handleChange}
          />
          <TextField type="file" onChange={(e) => setFile(e.target.files[0])} />
          {file && !imgCargada && (
            <Button
              variant="contained"
              className="buttonEdit"
              onClick={handleImage}
            >
              {loading ? "Cargando..." : "Cargar"}
            </Button>
          )}

          <Button
            variant="contained"
            className="buttonEdit"
            onClick={handleSubmit}
          >
            {edit ? "Actualizar" : "Crear"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalItemConfesion;
