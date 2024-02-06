import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../context/AuthContext";
import { Button } from "@mui/material";
import ModalItemConfesion from "../../modal/ModalItemConfesion";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { FadeLoader } from "react-spinners";
import Swal from "sweetalert2";

const ItemConfesion = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [itemConfesion, setItemConfesion] = useState([]);
  const [confesionSelected, setConfesionSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [isChange, setIsChange] = useState(false);

  const fetchData = async () => {
    try {
      const confesionCollection = collection(db, "itemConfesion");
      const resConfesion = await getDocs(confesionCollection);
      const newRes = resConfesion.docs.map((confesion) => ({
        ...confesion.data(),
        id: confesion.id,
      }));
      setItemConfesion(newRes);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsChange(false);
    fetchData();
  }, [isChange]);

  const handleOpen = (item) => {
    setConfesionSelected(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAdd(false);
    setEdit(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const editConfesion = (item) => {
    handleOpen(item);
    setEdit(!edit);
  };

  const addConfesion = () => {
    handleOpen({});
    setAdd(!add);
  };

  const deleteConfesion = async (item) => {
    try {
      const shouldDelete = await Swal.fire({
        title: "¿Estás seguro?",
        text: `¡Eliminarás ${item.title}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7CAC41",
        cancelButtonColor: "#04441C",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (shouldDelete.isConfirmed) {
        if (item.img) {
          const storage = getStorage();
          const storageRef = ref(storage, item.img);
          await deleteObject(storageRef);
        }
        await deleteDoc(doc(db, "itemConfesion", item.id));
        setIsChange(true);
        Swal.fire({
          title: "Eliminado",
          text: `${item.title} ha sido eliminado`,
          icon: "success",
          confirmButtonColor: "#7CAC41",
        });
      }
    } catch (error) {
      console.error("Error al eliminar la confesión:", error);
    }
  };

  return (
    <div className="containerItemConfesion">
      {loading ? (
        <FadeLoader color="#7CAC41" />
      ) : (
        <>
          {itemConfesion.map((item) => (
            <span key={item.id} className="containerCardConfesion">
              {user?.rol === "aB3xY7zK" && (
                <>
                  <div
                    className={`containerIcon ${menuOpen ? "menuOpen" : ""}`}
                  >
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="menuIcons"
                      onClick={toggleMenu}
                    />
                    <div className="menuDropdown">
                      <div
                        className="menuItem"
                        onClick={() => {
                          editConfesion(item);
                          setConfesionSelected(item);
                        }}
                      >
                        Editar
                      </div>
                      <div
                        className="menuItem"
                        onClick={() => deleteConfesion(item)}
                      >
                        Eliminar
                      </div>
                    </div>
                    <FontAwesomeIcon
                      onClick={(e) => {
                        editConfesion(item);
                        setConfesionSelected(item);
                        e.stopPropagation;
                      }}
                      className="botonEdit"
                      icon={faPenToSquare}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="botonDelete"
                      onClick={() => {
                        deleteConfesion(item);
                      }}
                    />
                  </div>
                </>
              )}

              <div className="contentWrapper">
                <div className="textContent">
                  <h3 className="titleItemConfesion">{item.title}</h3>
                  <p className="textItemConfesion">{item.description}</p>
                </div>
                <img
                  src={item?.img}
                  alt={`imagen ${item.title}`}
                  className="imgCardConfesion"
                />
              </div>
            </span>
          ))}
          {user?.rol === "aB3xY7zK" && (
            <Button className="buttonAdd" onClick={addConfesion}>
              +
            </Button>
          )}
          {open && (
            <ModalItemConfesion
              open={open}
              handleClose={handleClose}
              setIsChange={setIsChange}
              edit={edit}
              add={add}
              confesionSelected={confesionSelected}
              itemConfesion={itemConfesion}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ItemConfesion;
