import { Button } from "@mui/material";

export default function OutlinedButton({ onClick, text, color, outlineColor }) {
  return (
    <Button
      variant="outlined"
      sx={{
        fontWeight: 400,
        color: color ? color : "black",
        textTransform: "none",
        fontSize: "15px",
        outline: "1px solid white",
        outlineColor: outlineColor,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
