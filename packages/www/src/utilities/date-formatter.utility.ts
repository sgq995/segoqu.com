export default function DateFormatter(dateInput: string | Date) {
  const date = new Date(dateInput);
  return date.toLocaleDateString();
}
