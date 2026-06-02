import { useNavigate } from "react-router-dom";

const VisaCard = ({ visa }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(
          `/country/${visa.countryName
            ?.trim()
            ?.toLowerCase()
            ?.replace(/\s+/g, "-")}`,
        )
      }
      className="
        cursor-pointer
        relative
        w-full
        max-w-[340px]
        bg-white
        rounded-2xl
        overflow-hidden
        border
        border-zinc-100
        hover:shadow-lg
        transition-all
        duration-300
      "
    >
      {/* IMAGE */}
      <img
        src={visa.image}
        alt={visa.countryName}
        className="
          w-full
          h-[190px]
          object-cover
          rounded-t-2xl
        "
      />

      {/* RECENTLY ISSUED */}
      <div
        className="
          absolute
          top-3
          right-3
          bg-yellow-100
          text-yellow-800
          text-[11px]
          font-semibold
          px-3
          py-1
          rounded-lg
        "
      >
        {visa.issuedRecently}
      </div>

      {/* CONTENT */}
      <div>
        {/* TOP */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-zinc-100
            px-4
            py-3
          "
        >
          <h2
            className="
              text-lg
              font-bold
              text-gray-900
            "
          >
            {visa.countryName}
          </h2>

          <span
            className="
              bg-indigo-50
              text-xs
              px-3
              py-1.5
              rounded-full
              text-gray-700
              font-medium
            "
          >
            {visa.visaType}
          </span>
        </div>

        {/* BOTTOM */}
        <div
          className="
            flex
            items-center
            justify-between
            px-4
            py-3
          "
        >
          {/* PRICE */}
          <div className="flex flex-col">
            <span
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              ₹{visa.price}
            </span>

            <span
              className="
                text-xs
                text-gray-400
                mt-1
              "
            >
              +₹{visa.fees} (Fees+Tax)
            </span>
          </div>

          {/* DAYS */}
          <div className="text-right">
            <span
              className="
                text-xs
                text-gray-500
              "
            >
              Get Visa in
            </span>

            <h3
              className="
                text-lg
                font-bold
                text-gray-900
              "
            >
              {visa.processingDays} days
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
