import { InputHTMLAttributes } from "react";

export function Field({
  labelText,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  labelText: string;
}) {
  const prefixLabel =
    inputProps?.type !== "radio" && inputProps?.type !== "checkbox";
  const label = <label>{labelText}</label>;

  return (
    <>
      {prefixLabel && label}
      <input {...inputProps} />
      {!prefixLabel && label}
    </>
  );
}
