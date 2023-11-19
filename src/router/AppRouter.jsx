import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import { routes } from "./routes";
import { Suspense, lazy} from "react"
const Home = lazy(() => import("../pages/Home"));
const EnQueCreemos = lazy(() => import("../pages/EnQueCreemos"));
const Sermones = lazy(() => import("../pages/Sermones"))


function AppRouter() {
  return (
    <Suspense fallback={<h3>CARGANDO...</h3>}>
      <BrowserRouter>
      <Routes>
          <Route path={routes.home} element= {<Home/>} />
          <Route path={routes.enQueCreemos} element= {<EnQueCreemos/>} />
          <Route path={routes.sermones} element= {<Sermones/>} />
      </Routes>
      </BrowserRouter>
      
    </Suspense>
  );
}

export default AppRouter;
