import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FadeLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalDescriptionHome from "../modal/ModalDescriptionHome";


const DescriptionHome = () => {
    const {user} = useContext(AuthContext)
    const [text, setText] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [textSelected, setTextSelected] = useState(null);
  
   
  
    useEffect(() => {
      setIsChange(false);
      const dataFetch = async () => {
        try {
          let textCollection = collection(db, "descriptionHome");
          const resText = await getDocs(textCollection);
          let newRes = resText.docs.map((text) => {
            return { ...text.data(), id: text.id };
          });
          setText(newRes);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      dataFetch();
    }, [isChange]);
  
    const editText = () => {
      handleOpen()
      }
  
    return (
      <>
        {loading ? (
          <div className="containerLoader">
          <FadeLoader color="#7CAC41" />
        </div>
        ) : (
          <div className="containerMainPrincipios">
            {text?.map((item) => {
              return (
                <div key={item.id}>
                  <h2 className="descriptionHome">
                    
                    {user?.rol === "aB3xY7zK" && (
                    <FontAwesomeIcon
                    onClick={() => {editText(), setTextSelected(item)}}
                      className="editTextPrincipio"
                      icon={faPenToSquare}
                    />
                  )}
                  {item.description}
                  </h2>
                  
                  {open && (
                    <ModalDescriptionHome
                      open={open}
                      handleClose={handleClose}
                      textSelected={textSelected}
                      setIsChange={setIsChange}
                    />
                  )}
  
                  
                </div>
              );
            })}
  
          </div>
        )}
      </>
    )
}


export default DescriptionHome