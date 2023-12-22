import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { FadeLoader } from "react-spinners";
import ModalPrinciple from "../../modal/ModalPrinciple";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../context/AuthContext";
import CardPrinciple from "./CardPrinciple";

const MainTextPrinciples = () => {
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
        let textCollection = collection(db, "textHealthyChurch");
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
        <FadeLoader color="#7CAC41" />
      ) : (
        <div className="containerMainPrincipios">
          {text?.map((item) => {
            return (
              <div key={item.id}>
                <h2 className="titleMainPrincipios">{item.title}</h2>
                <h4 className="descriptionMainPrincipios">
                  
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
                  <ModalPrinciple
                    open={open}
                    handleClose={handleClose}
                    textSelected={textSelected}
                    setIsChange={setIsChange}
                  />
                )}

                
              </div>
            );
          })}

          <CardPrinciple/>
        </div>
      )}
    </>
  );
};

export default MainTextPrinciples;
