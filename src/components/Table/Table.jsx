import { CenterLogo } from "./Styles";
import { TableContainer } from "./Styles";

export default function Table({ name }) {
  return (
    <TableContainer>
      <CenterLogo>{name}</CenterLogo>
    </TableContainer>
  );
}
