import {
  faHouse,
  faPersonPraying,
  faVideo,
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
}
];

export const routesAdmin = [
  {
    id:1,
    path: "/login",  
    text: "Login"
  }
]
