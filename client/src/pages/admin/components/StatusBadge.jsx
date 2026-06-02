const StatusBadge = ({ status }) => {

  let styles =
    "bg-gray-100 text-gray-700";

  // ======================
  // STATUS COLORS
  // ======================

  if (status === "Pending") {

    styles =
      "bg-yellow-100 text-yellow-700";
  }

  if (status === "Approved") {

    styles =
      "bg-green-100 text-green-700";
  }

  if (status === "Rejected") {

    styles =
      "bg-red-100 text-red-700";
  }

  if (status === "Processing") {

    styles =
      "bg-blue-100 text-blue-700";
  }

  return (

    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${styles}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;