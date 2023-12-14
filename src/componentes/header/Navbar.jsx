import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar = ({ routes, isLogged, user, admin, sidebar, handleLogout }) => {
  return (
    <>
      {routes.map((ruta) => {
        const isAdmin = isLogged && user.rol === admin;
        if (
          (isAdmin && isLogged) ||
          (!isAdmin && isLogged && ruta.text !== "Dashboard") ||
          (!isLogged &&
            ruta.text !== "Dashboard" &&
            ruta.text !== "Cerrar sesión")
        ) {
          return (
            <Link
              className={`itemMenu ${
                location.pathname === ruta.path ? "activeLink" : ""
              } ${sidebar ? "sidebarOpen" : ""}`}
              to={ruta.path}
              key={ruta.id}
              onClick={ruta.text === "Cerrar sesión" ? handleLogout : null}
            >
              <FontAwesomeIcon
                icon={ruta.icon}
                className={`iconMenu ${sidebar ? "sidebarOpen" : ""}`}
              />
              <span> {ruta.text}</span>
            </Link>
          );
        }

        return null;
      })}
    </>
  );
};

export default Navbar;
