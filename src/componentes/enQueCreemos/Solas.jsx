import { useContext, useState } from "react"
import background from "../../assets/Imagenes/Backgrounds/BackgroundEnQueCreemos.jpg"
import { db } from "../../firebaseConfig"
import {getDocs, collection} from "firebase/firestore" 
import { useEffect } from "react"
import { FadeLoader } from "react-spinners"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "../../context/AuthContext"


const Solas = () => {
  const {user} = useContext(AuthContext)
  const [solas, setSolas] = useState([])
  const [mainText, setMainText] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    const dataFetch = async () => {
      try {
        let textCollection = collection(db, "mainTextReforma")
        const resReforma = await getDocs(textCollection)
        let newRes = resReforma.docs.map(text => {
          return {...text.data(), id:text.id}
        })
        setMainText(newRes)
        setLoading(false)

      } catch (error) {
        console.log(error)
      }

      try {
        let refCollection = collection(db, "solas")
        const res = await getDocs(refCollection)
        let newRes = res.docs.map(sola => {
          return {...sola.data(), id: sola.id }
        })
        setSolas(newRes)
        setLoading(false)

      } catch (error) {
        console.log(error)
      }    
    }
    dataFetch();
  },[])


  return (
    <>
    
    <div className="containerBienvenida">
      <div className="containerImgBgHome solas">
        <img className="backgroundHome" src={background} alt="" />
      </div>
      <div className="containerTextoBienvenida solas">
        <h1 className="textoBienvenida solas">
            {loading ? 
            <FadeLoader color="#fff"/>
            :
            (
              <>
              {mainText[0]?.description}
              {user?.rol === "aB3xY7zK" && <FontAwesomeIcon className="botonEdit encabezado" icon={faPenToSquare} />}
            
              </>
            )
            }
                  
        </h1>
      </div>
    </div>
    <section className="sectionSolas">
            {loading ? 
            <FadeLoader color="#7CAC41" />
            :
            solas.map(sola => {
              return(
                <div key={sola.id} className="cardSolas">
                  <div className="iconContainer">
                    {user?.rol === "aB3xY7zK" && 
                    <>
                    {/* <FontAwesomeIcon className="botonDelete" icon={faTrashCan}/> */}
                    <FontAwesomeIcon className="botonEdit" icon={faPenToSquare} />
                    </>
                    }
                  
                  </div>
                  
                  <p className="titleSolas">{sola.title}</p>
                  <p className="textSolas">{sola.description}</p>
                </div>
              )
            })}
            {
              user?.rol === "aB3xY7zK" && <FontAwesomeIcon className="buttonAdd" icon={faPlus} />
            }
            

          
    </section>
    </>
  )
}

export default Solas