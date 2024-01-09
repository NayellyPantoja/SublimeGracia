import {
  faHouse,
  faPersonPraying,
  faVideo,
  faArrowRightFromBracket,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";

export const routes = [
  {
    id: 1,
    path: "/",  
    text: "Inicio", 
    icon:  faHouse  },
  {
    id: 2,
    path: "/quienesSomos",
    text: "Quienes somos",
    icon: faPersonPraying ,
  },
  { 
    id: 3,
    path: "/sermones", 
    text: "Sermones",
    icon: faVideo  
},
{
  id: 4,
  path: "/dashboard",  
  text: "Dashboard",
  icon: faChartLine,
},
{
  id: 5,
  path: "/login",  
  text: "Cerrar sesión",
  icon: faArrowRightFromBracket,
}
];

export const register = [
  {
    id:1,
    path: "/registro"
  }
]

export const routesAdmin = [
  {
    id:1,
    path: "/login",  
    text: "Login"
  }
]
