import { CenterLogo } from "./Styles";
import { TableContainer } from "./Styles";

export default function Table({ currentTask }) {
  return (
    <TableContainer>
      <CenterLogo>{currentTask}</CenterLogo>
    </TableContainer>
  );
}
