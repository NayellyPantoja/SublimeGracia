import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FadeLoader } from "react-spinners"


const MainSolas = ({background, loading, mainText, user}) => {
  return (
    <div className="containerBienvenida">
        <div className="containerImgBgHome solas">
          <img className="backgroundHome" src={background} alt="" />
        </div>
        <div className="containerTextoBienvenida solas">
          <h1 className="textoBienvenida solas">
            {loading ? (
              <FadeLoader color="#fff" />
            ) : (
              <>
                {mainText[0]?.description}
                {user?.rol === "aB3xY7zK" && (
                  <FontAwesomeIcon
                    className="botonEdit encabezado"
                    icon={faPenToSquare}
                  />
                )}
              </>
            )}
          </h1>
        </div>
      </div>
  )
}

export default MainSolas