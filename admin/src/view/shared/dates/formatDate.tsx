// src/utils/formatDate.js
export function formatDate(date) {
  if (!date) return '-';

  try {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short', // "Sep"
      day: '2-digit', // "22"
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Invalid date format:', date, error);
    return '-';
  }
}
