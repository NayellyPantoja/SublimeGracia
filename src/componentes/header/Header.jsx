import { Link, useLocation } from "react-router-dom";
import logoImagen from "../../assets/imgWebp/Logo/LogoImagen.webp";
import logoLetras from "../../assets/imgWebp/Logo/LogoLetras.webp";
import "../../styles/App.css";
import {routes} from "../../router/routes"
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() =>{
    const handleScroll = () =>{
      window.scrollY > 10 ? setScrolled(true) : setScrolled(false);
    }
      window.addEventListener("scroll", handleScroll);
      return() => {
        window.removeEventListener("scroll", handleScroll)
      }
    
  }, [])
  
  return (
    <div className= {`containerHeader ${scrolled ? "scrolled" : ""}`}>
      <div className="containerLogo">
        <Link to= "/"> 
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

      <div className="containerMenu">
        <Link className={`itemMenu ${location.pathname === routes.home ? 'activeLink' : '' }`} to="/">
          Inicio
        </Link>
        <Link className={`itemMenu ${location.pathname === routes.enQueCreemos ? 'activeLink' : '' }`} to="/enQueCreemos">
          En qué creemos
        </Link>
        <Link className={`itemMenu ${location.pathname === routes.sermones ? 'activeLink' : '' }`} to="/sermones">
          Sermones
        </Link>
      </div>
    </div>
  );
};

export default Header;
