import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { getVisas } from "../../services/visaService";
import VisaCard from "../../components/cards/VisaCard";
import Loader from "../../components/ui/Loader";

const VisaPage = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");

  // ======================
  // FETCH VISAS
  // ======================

  useEffect(() => {
    fetchVisas();
  }, []);

  const fetchVisas = async () => {
    try {
      const data = await getVisas();

      // FILTER INVALID IMAGES
      const cleanedVisas = data.visas.map((visa) => ({
        ...visa,

        image:
          visa.image && visa.image.startsWith("http")
            ? visa.image
            : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      }));

      setVisas(cleanedVisas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // FILTER VISAS
  // ======================

const filteredVisas = visas.filter((visa) =>
  visa?.countryName
    ?.toLowerCase()
    ?.includes(
      searchTerm.toLowerCase()
    ),
);

  // ======================
  // LOADING
  // ======================

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#edf5f7] px-4 py-2">
      {/* HEADING */}
      <div className="max-w-7xl mx-auto mb-5">
        <h1 className="text-5xl font-black text-gray-800">
          Explore Visa Services
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Choose your destination and start your visa process easily with TMS
          VISA
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-white rounded-full shadow-md flex items-center px-5 py-2">
          {/* ICON */}
          <div className="text-blue-600 mr-3 text-xl">✈️</div>

          {/* INPUT */}
          <input
            type="text"
            placeholder="Where to, captain?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
        flex-1
        outline-none
        text-lg
        text-gray-700
        placeholder:text-gray-400
        bg-transparent
      "
          />

          {/* SEARCH BUTTON */}
          <button
            className="
        bg-blue-600
        hover:bg-blue-700
        transition
        w-12
        h-12
        rounded-full
        flex
        items-center
        justify-center
        text-white
      "
          >
            <Search size={22} />
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredVisas.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-4xl font-bold text-gray-700">
            No Visa Cards Found
          </h2>

          <p className="text-gray-500 mt-4">Try searching another country.</p>
        </div>
      )}

      {/* VISA GRID */}
      <div
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-8
        "
      >
        {filteredVisas.map((visa) => (
          <VisaCard key={visa._id} visa={visa} />
        ))}
      </div>
    </div>
  );
};

export default VisaPage;
