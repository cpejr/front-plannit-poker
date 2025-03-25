import PropTypes from "prop-types";
import { CardContainer, UserCard, UserNameP } from "./Styles";

export default function Card({ name, num, hasVoted, onClickedFunction}) {
  return (
    <CardContainer>
      <UserNameP>{name}</UserNameP>
      <UserCard style={{ backgroundColor: hasVoted ? "green" : "red" }}>
        {num < 0 ? (
          <span onClick={onClickedFunction}>♠</span> // Ícone de espadas continua caso não tenha votado
        ) : (
          <span onClick={onClickedFunction}>{num}</span>  // Exibe apenas o número
        )}
      </UserCard>
    </CardContainer>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  hasVoted: PropTypes.bool,
};
