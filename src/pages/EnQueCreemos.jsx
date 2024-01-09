
import { Password } from "@mui/icons-material"
import TextConfesion from "../componentes/enQueCreemos/Confesion/TextConfesion"
import MainTextPrinciples from "../componentes/enQueCreemos/principios/MainTextPrinciples"
import Solas from "../componentes/enQueCreemos/solas/Solas"
import Header from "../componentes/header/Header"
import IndividualPastor from "../componentes/enQueCreemos/pastores/IndividualPastor"
import Footer from "../componentes/footer/Footer"


const EnQueCreemos = () => {
  return (
    <>
    <Header/>
    <Solas/>
    {/* <MainTextPrinciples/> */}
    <TextConfesion/>
    <IndividualPastor/>
    <Footer/>
    </>
    
  )
}

export default EnQueCreemos