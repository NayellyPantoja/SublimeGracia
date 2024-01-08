import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ModalPastor from "../../modal/ModalPastor";
import { FadeLoader } from "react-spinners";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const IndividualPastor = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const handleOpen = (pastor) => {
    setPastorSelected(pastor), setOpen(true);
  };
  const handleClose = () => {
    setOpen(false), add && setAdd(!add), edit && setEdit(!edit);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [pastores, setPastores] = useState([]);
  const [pastorSelected, setPastorSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setIsChange(false);
    const dataFetch = async () => {
      try {
        let pastorCollection = collection(db, "pastor");
        const resPastores = await getDocs(pastorCollection);
        let newRes = resPastores.docs.map((pastor) => {
          return { ...pastor.data(), id: pastor.id };
        });
        setPastores(newRes);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, [isChange]);

  const editPastor = async (pastor) => {
    handleOpen(pastor);
    setEdit(!edit);
  };
  const addPastor = () => {
    handleOpen({});
    setAdd(!add);
  };

  const deletePastor = async (pastor) => {
    try {
      const shouldDelete = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¡Eliminarás al pastor ${pastor.nombre} ${pastor.apellido}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7CAC41',
        cancelButtonColor: '#04441C',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
      });

      if (shouldDelete.isConfirmed) {
        if (pastor.img) {
          const storage = getStorage();
          const storageRef = ref(storage, pastor.img);
          await deleteObject(storageRef);
        }
        await deleteDoc(doc(db, 'pastor', pastor.id));
        setIsChange(true);
        Swal.fire({
        title: 'Eliminado',
        text: `El pastor ${pastor.nombre} ${pastor.apellido} ha sido eliminado`,
        icon: 'success',
        confirmButtonColor: '#7CAC41'});
      }
    } catch (error) {
      console.error('Error al eliminar el pastor:', error);
      Swal.fire('Error', 'Hubo un error al intentar eliminar al pastor', 'error');
    }
  };

  return (
    <section className="containerPastores">
      {loading ? (
        <FadeLoader color="#7CAC41" />
      ) : (
        <>
          <h2>Acompañados por nuestros pastores</h2>
          <div className="containerItemPastor">
          {pastores.map((pastor) => (
            <div key={pastor.id} className="boxImage">
              <div className="content">
                {user?.rol === "aB3xY7zK" && (
                  <>
                    <div
                      className={`containerIcon ${menuOpen ? "menuOpen" : ""}`}
                    >
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        className="menuIcons pastor"
                        onClick={toggleMenu}
                      />
                      <div className="menuDropdown pastor">
                        <div
                          className="menuItem"
                          onClick={() => {
                            editPastor(pastor);
                            setPastorSelected(pastor);
                          }}
                        >
                          Editar
                        </div>
                        <div
                          className="menuItem"
                          onClick={() => deletePastor(pastor)}
                        >
                          Eliminar
                        </div>
                      </div>
                      <FontAwesomeIcon
                        onClick={(e) => {
                          editPastor(pastor);
                          setPastorSelected(pastor);
                          e.stopPropagation;
                        }}
                        className="botonEdit pastor"
                        icon={faPenToSquare}
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="botonDelete pastor"
                        onClick={() => {
                          deletePastor(pastor);
                        }}
                      />
                    </div>
                  </>
                )}
                <img src={pastor.img} />
                <h2>
                  {pastor.nombre}
                  <br />
                  {pastor.apellido}
                </h2>
              </div>
            </div>
          ))}
          </div>
          
          {user?.rol === "aB3xY7zK" && (
            <Button className="buttonAdd pastor" onClick={addPastor}>
              +
            </Button>
          )}
          {open && (
            <ModalPastor
              open={open}
              handleClose={handleClose}
              setIsChange={setIsChange}
              edit={edit}
              add={add}
              pastorSelected={pastorSelected}
              pastores={pastores}
            />
          )}
        </>
      )}
    </section>
  );
};

export default IndividualPastor;
