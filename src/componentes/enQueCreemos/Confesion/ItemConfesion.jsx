import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../context/AuthContext";
import { Button } from "@mui/material";
import ModalItemConfesion from "../../modal/ModalItemConfesion";
import { deleteObject, getStorage, ref } from "firebase/storage";

const ItemConfesion = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const handleOpen = (item) => {setConfesionSelected(item) ,setOpen(true)};
  const handleClose = () => {setOpen(false), add && setAdd(!add), edit && setEdit(!edit)};
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [itemConfesion, setItemConfesion] = useState([]);
  const [confesionSelected, setConfesionSelected] = useState({})
  const [loading, setLoading] = useState(true);
  const [isChange, setIsChange] = useState(false);
  

  

  useEffect(() => {
    setIsChange(false);
    const dataFetch = async () => {
      try {
        let confesionCollection = collection(db, "itemConfesion");
        const resConfesion = await getDocs(confesionCollection);
        const newRes = resConfesion.docs.map((confesion) => {
          return { ...confesion.data(), id: confesion.id };
        });
        setItemConfesion(newRes);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, [isChange]);

  const editConfesion = (item) => {
    handleOpen(item);
    setEdit(!edit);
    console.log("itemConfesion: ", itemConfesion)
    console.log("open: ", open)
  };
  const addConfesion = () => {
    handleOpen({});
    setAdd(!add)
  };
  const deleteConfesion = async (item) => {
    try {
        console.log(item.id);
        if(item.img){
            const storage = getStorage();
            const storageRef = ref(storage, item.img);
            await deleteObject(storageRef)
        }
        await deleteDoc(doc(db, "itemConfesion", item.id));
        setIsChange(true);
      } catch (error) {
        console.error("Error al eliminar la confesión:", error);
      }
  }
  return (
    <div className="containerItemConfesion">
      {itemConfesion.map((item) => (
        <span
          key={item.id}
          className="containerCardConfesion"

        >
          {user?.rol === "aB3xY7zK" && (
            <>
            
            <div className={`containerIcon ${menuOpen ? 'menuOpen' : ''}`}>
            <FontAwesomeIcon icon={faEllipsis} className="menuIcons" onClick={toggleMenu}/>
            <div className="menuDropdown">
            <div className="menuItem" onClick={() => { editConfesion(item); setConfesionSelected(item); }}>
              Editar
            </div>
            <div className="menuItem" onClick={() => deleteConfesion(item)}>
              Eliminar
            </div>
          </div>
            <FontAwesomeIcon
              onClick={(e) => {editConfesion(item);
                setConfesionSelected(item);
                e.stopPropagation
              }}
              className="botonEdit"
              icon={faPenToSquare}
            />
            <FontAwesomeIcon icon={faTrashCan} className="botonDelete" onClick={() => {deleteConfesion(item)}}/>
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
      <Button className="buttonAdd" onClick={addConfesion}>+</Button>
      {open && <ModalItemConfesion open={open} handleClose={handleClose} setIsChange={setIsChange} edit={edit} setEdit={setEdit} add={add} setAdd={setAdd} confesionSelected={confesionSelected} itemConfesion={itemConfesion}/>}
    </div>
  );
};

export default ItemConfesion;
