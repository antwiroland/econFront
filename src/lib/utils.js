export const formatDateTime = (createdAt) => {
  const date = new Date(createdAt);

  // Get the year, month, date, hours, minutes, and seconds
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Return the formatted date and time
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
