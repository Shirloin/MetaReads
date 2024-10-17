import { Button } from "@mui/material";

export default function PrimaryButton({ onClick, text, color }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#EFAF21",
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
