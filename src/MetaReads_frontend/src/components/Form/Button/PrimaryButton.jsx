import { Button } from "@mui/material";

export default function PrimaryButton({ onClick, text }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#EFAF21",
        fontWeight: "600",
        color: "black",
        textTransform: "none",
        fontSize: "15px",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
