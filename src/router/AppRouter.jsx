import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import { Suspense, lazy} from "react"
const Home = lazy(() => import("../pages/Home"));
const EnQueCreemos = lazy(() => import("../pages/EnQueCreemos"));
const Sermones = lazy(() => import("../pages/Sermones"))


function AppRouter() {
  return (
    <Suspense fallback={<h3>CARGANDO...</h3>}>
      <BrowserRouter>
      <Routes>
          <Route path="/" element= {<Home/>} />
          <Route path="/enQueCreemos" element= {<EnQueCreemos/>} />
          <Route path="/sermones" element= {<Sermones/>} />
      </Routes>
      </BrowserRouter>
      
    </Suspense>
  );
}

export default AppRouter;
