const StatsCard = ({
  title,
  value,
  color,
}) => {

  return (

    <div
      className={`
        ${color}
        rounded-2xl
        px-5
        py-4
        text-white
        shadow-sm
      `}
    >

      <p
        className="
          text-sm
          uppercase
          font-semibold
          opacity-90
        "
      >
        {title}
      </p>

      <h2
        className="
          text-4xl
          font-bold
          mt-3
        "
      >
        {value}
      </h2>

    </div>
  );
};

export default StatsCard;