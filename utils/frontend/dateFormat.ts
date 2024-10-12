/**
 * Funtion to format date "2024-10-12T13:15:14+00:00" to "12.10.2024 13:15"
 * @param date
 */
export const dateFormat = (date: string): string => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hours = d.getHours();
const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}