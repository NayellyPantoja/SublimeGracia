import { useState } from "react";
import { db, uploadFile } from "../../firebaseConfig";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { Box, Button, Modal, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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

const ModalPastor = ({
  open,
  handleClose,
  setIsChange,
  pastorSelected,
  add,
  edit,
  pastores,
}) => {
  const [file, setFile] = useState(null);
  const [imgCargada, setImgCargada] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pastorEditado, setPastorEditado] = useState({
    nombre: pastorSelected.nombre,
    apellido: pastorSelected.apellido,
    img: pastorSelected.img,
  });
  const [newPastor, setNewPastor] = useState({
    nombre: "",
    apellido: "",
    img: "",
  });

  const handleChange = (e) => {
    if (edit) {
      setPastorEditado((prevpastorEditado) => ({
        ...prevpastorEditado,
        [e.target.name]: e.target.value,
      }));
    } else if (add) {
      setNewPastor((prevNewPastor) => ({
        ...prevNewPastor,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleImage = async () => {
    if (edit) {
      try {
        setLoading(true);
        let url = await uploadFile(file);

        setPastorEditado({ ...pastorEditado, img: url });
        setLoading(false);
        setImgCargada(true);

        if (pastorSelected.img) {
          const storage = getStorage();
          const storageRef = ref(storage, pastorSelected.img);
          await deleteObject(storageRef);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (add) {
      try {
        setLoading(true);
        let url = await uploadFile(file);

        setNewPastor({ ...newPastor, img: url });
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
      if (pastorSelected.img) {
        const storage = getStorage();
        const storageRef = ref(storage, pastorSelected.img);
        await deleteObject(storageRef);
      }
      const pastorCollection = collection(db, "pastor");
      await updateDoc(
        doc(pastorCollection, pastorSelected.id),
        pastorEditado
      ).then(() => {
        setIsChange(true);
        handleClose();
      });
    } else if (add) {
      const nextId = pastores.length + 1;
      const pastorCollection = collection(db, "pastor");
      await setDoc(doc(pastorCollection, nextId.toString()), newPastor).then(
        () => {
          setIsChange(true);
          handleClose();
        }
      );
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
            label="Nombre"
            name="nombre"
            defaultValue={pastorSelected?.nombre}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Apellido"
            name="apellido"
            defaultValue={pastorSelected?.apellido}
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

export default ModalPastor;
