import { Button } from "@mui/material";
import { ButtonProps } from "../../Props/buttonProps";

export default function SubscribeButton({ onClick, text }: ButtonProps) {
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
