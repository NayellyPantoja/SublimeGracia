import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import { Suspense, lazy} from "react"
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ProtectedAdmin from "./ProtectedAdmin";
import DashboardPage from "../pages/DashboardPage";
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
          <Route path="/login" element={<Login/>}/>
          <Route path="/registro" element={<Register/>}/>
          <Route path="/olvideMiContraseña" element={<ForgotPassword/>}/>

          <Route element={<ProtectedAdmin/>}>
            <Route path="dashboard" element={<DashboardPage/>}/>
          </Route>

      </Routes>


      </BrowserRouter>
      
    </Suspense>
  );
}

export default AppRouter;
