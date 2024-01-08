import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FadeLoader } from "react-spinners";

const Dashboard = () => {
  const [userSelected, setUserSelected] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newRol, setNewRol] = useState("");
  const userEditado = {
    ...userSelected,
    rol: newRol == "admin" ? "aB3xY7zK" : "user",
  };

  console.log("userEditado", userEditado);

  useEffect(() => {
    setIsChange(false);
    const dataFetch = async () => {
      try {
        let userCollection = collection(db, "users");
        const resUser = await getDocs(userCollection);
        let newRes = resUser.docs.map((user) => {
          return { ...user.data(), id: user.id };
        });
        setUsers(newRes);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, [isChange]);

  const handleChangeRol = async () => {
    try {
      const userCollection = collection(db, "users");
      const userEditado = {
        ...userSelected,
        rol: newRol === "admin" ? "aB3xY7zK" : "user",
      };
      await updateDoc(doc(userCollection, userSelected.id), userEditado);
      setIsChange(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ paddingTop: "5rem" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Apellido</TableCell>
              <TableCell align="left">Rol</TableCell>
              <TableCell align="left">acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {user.id}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {user.nombre}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {user.apellido}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  onClick={() => {
                    setUserSelected(user);
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <select
                    value={user.rol}
                    onChange={(e) => setNewRol(e.target.value)}
                    onBlur={() => handleChangeRol()}
                  >
                     {user.rol === "aB3xY7zK" ? (
                      <>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </>
                    ) : (
                      <>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </>
                    )}
                  </select>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="botonDelete pastor"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
