import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CardSolas = ({solas, user, editSola, setSolaSelected}) => {
  
  
  return (
    solas.map((sola) => {
        return (
          <div key={sola.id} className="cardSolas">
            <div className="iconContainer">
              {user?.rol === "aB3xY7zK" && (
                <>
                  <FontAwesomeIcon
                    onClick={() => {editSola(sola.id); setSolaSelected(sola)}}
                    className="botonEdit"
                    icon={faPenToSquare}
                  />
                </>
              )}
            </div>

            <p className="titleSolas">{sola.title}</p>
            <p className="textSolas">{sola.description}</p>
          </div>
        );
      })
  )
}

export default CardSolas