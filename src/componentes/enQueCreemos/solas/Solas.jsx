import { useContext, useState } from "react";
import background from "../../../assets/Imagenes/Backgrounds/BackgroundEnQueCreemos.jpg";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../../../context/AuthContext";

import CardSolas from "./CardSolas";
import MainSolas from "./main/MainSolas";
import ModalEditSola from "../../modal/ModalEditSola";

const Solas = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [solas, setSolas] = useState([]);
  const [mainText, setMainText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isChange, setIschange] = useState(false);
  const [solaSelected, setSolaSelected] = useState(null);

  useEffect(() => {
    setIschange(false);
    const dataFetch = async () => {
      try {
        let textCollection = collection(db, "mainTextReforma");
        const resReforma = await getDocs(textCollection);
        let newRes = resReforma.docs.map((text) => {
          return { ...text.data(), id: text.id };
        });
        setMainText(newRes);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      try {
        let solasCollection = collection(db, "solas");
        const res = await getDocs(solasCollection);
        let newRes = res.docs.map((sola) => {
          return { ...sola.data(), id: sola.id };
        });
        setSolas(newRes);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, [isChange]);

  const editSola = () => {
    handleOpen();
  };

  return (
    <>
      <MainSolas
        background={background}
        loading={loading}
        mainText={mainText}
        user={user}
        setIschange={setIschange}
      />
      <section className="sectionSolas">
        {loading ? (
          <FadeLoader color="#7CAC41" />
        ) : (
          <CardSolas
            solas={solas}
            user={user}
            editSola={editSola}
            isChange={isChange}
            setSolaSelected={setSolaSelected}
          />
        )}
        {open && (
          <ModalEditSola
            open={open}
            handleClose={handleClose}
            solaSelected={solaSelected}
            setIschange={setIschange}
          />
        )}
      </section>
    </>
  );
};

export default Solas;
