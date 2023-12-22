import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  borderRadius: 4,
};

const ModalOpenPrincipios = ({
  handleClose,
  principioSelected,
  open,
}) => {
  console.log("openModal: ", open);
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="boxContainer">
        <div className="containerModalPrincipio">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handleClose}
            className="closeModal"
          />
          <img src={principioSelected.img} className="imgCardPrincipio" />
          <div className="containerDescripcionPrincipio">
            <p className="descripcionPrincipio">
              {principioSelected.description}
            </p>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalOpenPrincipios;
