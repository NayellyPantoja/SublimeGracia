import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { FadeLoader } from "react-spinners"
import ModalMainTextSola from "../../../modal/ModalMainTextSola"


const MainSolas = ({background, loading, mainText, user, setIschange}) => {
  const [textSelected, setTextSelected] = useState({
    description: ""
  })
  const [open, setOpen] = useState(false)
  const handleOpenText = () => setOpen(true)
  const handleCloseText = () => setOpen(false)
  const editText = () => {
  handleOpenText()
  }
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
                  onClick={() => {editText(), setTextSelected(mainText[0])}}
                    className="botonEdit encabezado"
                    icon={faPenToSquare}
                  />
                )}
              </>
            )}
          </h1>
          {open &&
          <ModalMainTextSola open={open} handleCloseText={handleCloseText} textSelected={textSelected} setIschange={setIschange}/>
          }
        </div>
      </div>
  )
}

export default MainSolas