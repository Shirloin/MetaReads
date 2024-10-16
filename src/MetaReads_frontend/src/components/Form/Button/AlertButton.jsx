import { Button } from "@mui/material";

export default function AlertButton({ onClick, text }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#ff2222",
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
