import { Button } from "@mui/material";

export default function SubscribeButton({ onClick, text }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#EFAF21",
        fontWeight: "600",
        color: "black",
        // textTransform: "none",
        paddingY: "12px",
        paddingX: "30px",
        fontSize: "15px",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
