export default function calculateProgress(data) {

  let completed = 0;

  let total = 12;

  if (data.firstName)
    completed++;

  if (data.passportNumber)
    completed++;

  if (data.phone)
    completed++;

  if (data.email)
    completed++;

  if (data.panCard)
    completed++;

  if (data.aadhaarCard)
    completed++;

  return Math.round(
    (completed / total) * 100
  );
}