import { Link } from "react-router-dom"
import logoImagen from "../../assets/imgWebp/Logo/logoImagen.webp";
import logoLetras from "../../assets/imgWebp/Logo/logoLetras.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className="containerFooter">
        <div className="containerLogo">
        <Link to="/">
          <img
            className="logoImagen"
            src={logoImagen}
            alt="Logo Sublime Gracia"
          />
          <img
            className="logoLetras"
            src={logoLetras}
            alt="Logo Sublime Gracia"
          />
        </Link>
      </div>
      <div className="containerSocial">
        <Link to={"https://www.facebook.com/groups/942151369574173/"}><FontAwesomeIcon icon={faSquareFacebook} className="iconFacebook"/></Link>
        <Link to={"https://www.youtube.com/@iglesiacristianasublimegra1100/videos"}><FontAwesomeIcon icon={faYoutube}  className="iconFacebook"/></Link>
        
      </div>
    </div>
  )
}

export default Footer