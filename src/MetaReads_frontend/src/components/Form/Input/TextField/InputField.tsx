import { InputBaseProps, TextField } from "@mui/material";
import { InputProps } from "../../../Props/inputFieldProps";

export default function InputField({ value, label, onChange, size, type }: InputProps) {
  return (
    <TextField
      fullWidth
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      type={type ? type : "text"}
      size={size ? size : "small"}
      onChange={(e) => onChange(e)}
    />
  );
}
