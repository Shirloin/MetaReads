import { Button } from "@mui/material";

export default function SecondaryButton({ onClick, text }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#494e5a",
        fontWeight: "600",
        color: "white",
        textTransform: "none",
        fontSize: "15px",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
