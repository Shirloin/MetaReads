import { TextField } from "@mui/material";

export default function InputField({ value, label, onChange, size, type }) {
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
