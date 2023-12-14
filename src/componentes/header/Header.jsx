import { Link } from "react-router-dom";
import logoImagen from "../../assets/imgWebp/Logo/logoImagen.webp";
import logoLetras from "../../assets/imgWebp/Logo/logoLetras.webp";
import "../../styles/App.css";
import { routes } from "../../router/routes";
import { useContext, useEffect, useState } from "react";
import BotonNavbar from "./BotonNavbar";
import { logout } from "../../firebaseConfig";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "./Navbar";

const Header = () => {
  const { logoutContext, isLogged, user } = useContext(AuthContext);
  const admin = import.meta.env.VITE_ADMIN;
  const [scrolled, setScrolled] = useState(false);
  const [pantalla, setPantalla] = useState(false);

  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 10 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const manejarAnchoDePantalla = () => {
      const esAnchoMayor = window.innerWidth > 480;
      if (esAnchoMayor && !pantalla) {
        setPantalla(true);
      } else if (!esAnchoMayor && pantalla) {
        setPantalla(false);
      }
    };

    manejarAnchoDePantalla();

    window.addEventListener("resize", manejarAnchoDePantalla);
    return () => {
      window.removeEventListener("resize", manejarAnchoDePantalla);
    };
  }, [pantalla]);

  const handleLogout = () => {
    logoutContext();
    logout();
  };

  return (
    <div className={`containerHeader ${scrolled ? "scrolled" : ""} `}>
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

      <div className={`containerMenu ${sidebar ? "sidebarOpen" : ""}`}>
        {pantalla || sidebar ? (
          <>
            {sidebar && (
              <BotonNavbar sidebar={sidebar} setSidebar={setSidebar} />
            )}
            <Navbar
              routes={routes}
              isLogged={isLogged}
              user={user}
              admin={admin}
              sidebar={sidebar}
              handleLogout={handleLogout}
            />
          </>
        ) : (
          <BotonNavbar sidebar={sidebar} setSidebar={setSidebar} />
        )}
      </div>
    </div>
  );
};

export default Header;
