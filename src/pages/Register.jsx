import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { signUp } from "../firebaseConfig";
import {useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prevUser) => ({...user, [e.target.name] : e.target.value}))

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    signUp(user)
    navigate("/login")
  }

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit} className="cardContainer register">
        <div className="formulario register">
          <div className="textLogin">
            <h1>¡REGISTRATE AHORA!</h1>
          </div>

          <Grid item xs={10} md={12} paddingBottom={"2rem"}>
            <TextField
            onChange={handleChange}
              name="nombre"
              label="Nombre"
              sx={{ width: "48%", marginRight: "4%" }}
            />
            <TextField onChange={handleChange} name="apellido" label="Apellido" sx={{ width: "48%" }} />
          </Grid>
          <Grid item xs={10} md={12} paddingBottom={"2rem"}>
            <TextField  onChange={handleChange} name="email" label="Email" fullWidth />
          </Grid>
          <Grid item xs={10} md={12} paddingBottom={"2rem"}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                name="password"
                onChange={handleChange}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff color="primary" />
                      ) : (
                        <Visibility color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>
          </Grid>

          <div className="containerBoton">
            <button type="submit" className="loginBoton">
              REGISTRARTE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
