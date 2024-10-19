import { Button } from "@mui/material";
import { ButtonProps } from "../../Props/buttonProps";

export default function ReadButton({ onClick, text, color }: ButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#64C008",
        fontWeight: 600,
        color: color ? color : "black",
        textTransform: "none",
        fontSize: "15px",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
