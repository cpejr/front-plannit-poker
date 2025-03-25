import PropTypes from "prop-types";
import { Message, ModelContainer, CloseX , YesBtn} from "./Styles";

export default function RemoveModal({ user, modalDisplay, closeModal, removeFunction }) {
  return (
    <ModelContainer style={{ display: modalDisplay }}>
      <CloseX onClick={closeModal}>X</CloseX>
      <Message> Deseja deletar {user} ?</Message>
      <YesBtn onClick={() => {removeFunction(); closeModal();}}>Sim</YesBtn>
    </ModelContainer>
  );
}

RemoveModal.propTypes = {
  user: PropTypes.string.isRequired,
  modalDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  closeModal: PropTypes.func.isRequired,
};
