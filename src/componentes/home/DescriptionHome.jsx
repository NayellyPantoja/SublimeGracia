import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FadeLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalDescriptionHome from "../modal/ModalDescriptionHome";

const DescriptionHome = () => {
    const { user } = useContext(AuthContext);
    const [text, setText] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [textSelected, setTextSelected] = useState(null);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const textCollection = collection(db, "descriptionHome");
                const resText = await getDocs(textCollection);
                const newRes = resText.docs.map((text) => ({
                    ...text.data(),
                    id: text.id,
                }));
                setText(newRes);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        setIsChange(false);
        dataFetch();
    }, [isChange]);

    const editText = (item) => {
        setTextSelected(item);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <div className="containerMainPrincipios">
            {loading ? (
                <div className="containerLoader">
                    <FadeLoader color="#7CAC41" />
                </div>
            ) : (
                text?.map((item) => (
                    <div key={item.id}>
                        <h2 className="descriptionHome">
                            {user?.rol === "aB3xY7zK" && (
                                <FontAwesomeIcon
                                    onClick={() => editText(item)}
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
                ))
            )}
        </div>
    );
};

export default DescriptionHome;