import {
  faHouse,
  faPersonPraying,
  faVideo,
  faRightToBracket,
  faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

export const routes = [
  {
    id: 1,
    path: "/",  
    text: "Inicio", 
    icon:  faHouse  },
  {
    id: 2,
    path: "/enQueCreemos",
    text: "En qué creemos",
    icon: faPersonPraying ,
  },
  { 
    id: 3,
    path: "/sermones", 
    text: "Sermones",
    icon: faVideo  
},
// {
//   id:4,
//   path: "/login",  
//   text: "Login",
//   icon: faRightToBracket,
// },
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
