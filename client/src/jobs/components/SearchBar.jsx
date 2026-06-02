export default function SearchBar({
  country,
  setCountry,
}) {
  return (
    <div className="mb-6">
      <select
        value={country}
        onChange={(e) =>
          setCountry(
            e.target.value
          )
        }
        className="w-full border rounded-lg p-3"
      >
        <option value="">
          Select Country
        </option>

        <option value="Canada">
          Canada
        </option>

        <option value="Australia">
          Australia
        </option>

        <option value="Germany">
          Germany
        </option>

        <option value="UK">
          UK
        </option>

        <option value="USA">
          USA
        </option>
      </select>
    </div>
  );
}