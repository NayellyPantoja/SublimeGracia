import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { FadeLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalTextConfesion from "../../modal/ModalTextConfesion";
import ItemConfesion from "./ItemConfesion";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


const TextConfesion = () => {
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
          let textCollection = collection(db, "textConfesionDeFe");
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
          <div className="containerMainPrincipios containerConfesion">
            
            {text?.map((item) => {
              return (
                <div key={item.id} className="containerDescriptionConfesion">
                  
                  <h2 className="titleMainPrincipios titleConfesion">{item.title}</h2>
                  <h4 className="descriptionMainConfesion">
                    
                    {user?.rol === "aB3xY7zK" && (
                    <FontAwesomeIcon
                    onClick={() => {editText(), setTextSelected(text[0])}}
                      className="editTextPrincipio"
                      icon={faPenToSquare}
                    />
                  )}
                  {item.description}
                  </h4>
                  
                  {open && (
                    <ModalTextConfesion
                      open={open}
                      handleClose={handleClose}
                      textSelected={textSelected}
                      setIsChange={setIsChange}
                    />
                  )}
                  <Button className="linkConfesion"><Link to="https://www.chapellibrary.org/pdf/books/lbcos.pdf">Conoce más aquí</Link></Button>
                </div>
              );
            })}
            
                  <ItemConfesion/>
            
          </div>
        )}
      </>
    );
}

export default TextConfesion