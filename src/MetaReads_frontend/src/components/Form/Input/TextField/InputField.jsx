import { TextField } from "@mui/material";

export default function InputField({ value, label, onChange }) {
  return (
    <TextField
      fullWidth
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      size="small"
      onChange={(e) => onChange(e)}
    />
  );
}
