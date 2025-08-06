import { InputHTMLAttributes } from "react";

export function Field({
  labelText,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  labelText: string;
}) {
  const prefixLabel =
    inputProps?.type !== "radio" && inputProps?.type !== "checkbox";
  return (
    <>
      {prefixLabel && <label>{labelText}</label>}
      <input {...inputProps} />
      {!prefixLabel && <label>{labelText}</label>}
    </>
  );
}
