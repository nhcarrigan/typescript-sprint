import { ReactNode } from "react";

export function ResumeEntry({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <label>{label}: </label>
      <p>{Array.isArray(value) ? value.join(", ") : value}</p>
    </div>
  );
}
