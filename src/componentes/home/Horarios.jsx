import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { FadeLoader } from "react-spinners";


const Horarios = () => {
    const [isChange, setIsChange] = useState(false)
    const [horarios, setHorarios] = useState([])
    const [invitacion, setInvitacion] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsChange(false);
        const dataFetch = async () => {
          try {
            let horariosCollection = collection(db, "reuniones");
            const resConfesion = await getDocs(horariosCollection);
            const newRes = resConfesion.docs.map((confesion) => {
              return { ...confesion.data(), id: confesion.id };
            });
            setHorarios(newRes);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
          try {
            let invitacionCollection = collection(db, "invitacionReunion");
            const resInvitacion = await getDocs(invitacionCollection);
            const newRes = resInvitacion.docs.map((invitacion) => {
              return { ...invitacion.data(), id: invitacion.id };
            });
            setInvitacion(newRes);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }

        };
        dataFetch();
      }, [isChange]);
  return (
    <section className="sectionReuniones">
      {loading ? (
      <FadeLoader color="#7CAC41"/>
      ) : (
        <div className="containerReuniones">
          
            {invitacion.map((item) => (
              <div key={item.id} className="containerImage">
                <img className="imagenIglesia" src={item.img} alt="imagen iglesia"/>
                <p>{item.description}</p>
                </div>
            ))}
          
          
        
        <div className="containerHorarios">
            {horarios.map((reunion) => (
                <div key={reunion.id} className="containerReunion">
                    <h3>{reunion.reunion}:<span>{reunion.horaInicio} - {reunion.horaFin}</span></h3>
                </div>
            ))}
        </div>
        </div>)}
        
    </section>
  )
}

export default Horarios