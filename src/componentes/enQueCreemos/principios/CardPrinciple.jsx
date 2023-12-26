import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import ModalOpenPrincipios from "../../modal/ModalOpenPrincipios";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../context/AuthContext";
import ModalPrinciple from "../../modal/ModalPrinciple";


const CardPrinciple = () => {
  const {user} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)
  const [principios, setPrincipios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChange, setIsChange] = useState(false);
  const [principioSelected, setPrincipioSelected] = useState(null)

  useEffect(() => {
    setIsChange(false);
    const dataFetch = async () =>{
      try {
        let principiosCollection = collection(db, "principios");
        const resPrincipios = await getDocs(principiosCollection);
        const newRes = resPrincipios.docs.map((principio) => {
          return {...principio.data(), id: principio.id}
        })
        setPrincipios(newRes);
        setLoading(true)
      } catch (error) {
        console.log(error)
      }
    }
    dataFetch();
  }, [isChange])

  const editPrincipio = () => {
    handleOpenEdit();
  }

  return (
    <div className="containerPrincipios">
    {
      principios.map((principio) => (
        <span key={principio.id} className="containerCardPrincipio" onClick={() => { handleOpen(), setPrincipioSelected(principio)}}>
          {user?.rol === "aB3xY7zK" &&
            <FontAwesomeIcon
          onClick={(e) => {e.stopPropagation() ,editPrincipio(); setPrincipioSelected(principio)}}
          className="botonEdit"
          icon={faPenToSquare}
        />
          }
          
          <img src={principio?.img} alt={`imagen ${principio.title}`} className="imgCardPrincipio"/>
          <h3 className="titlePrincipio">{principio.title}</h3>
        </span>
      ))
    }
    {
      open && <ModalOpenPrincipios handleClose={handleClose} principioSelected={principioSelected} loading={loading} open={open}/>
      
    }
    {
      openEdit && <ModalPrinciple handleCloseEdit={handleCloseEdit} principioSelected={principioSelected} openEdit={openEdit} setIsChange={setIsChange}/> 
    } 
    </div>
    
  )
}

export default CardPrinciple