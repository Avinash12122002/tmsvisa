import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { PlusCircle, Pencil, Trash2 } from "lucide-react";

import {
  createVisa,
  getVisas,
  updateVisa,
  deleteVisa,
} from "../../services/visaService";

const AddVisa = () => {
  const [visas, setVisas] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    countryName: "",
    price: "",
    fees: "",
    processingDays: "",
    visaType: "",
    issuedRecently: "",
    image: "",
  });

  // FETCH VISAS
  useEffect(() => {
    fetchVisas();
  }, []);

  const fetchVisas = async () => {
    try {
      const data = await getVisas();

      setVisas(data.visas);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // IMAGE VALIDATION
    if (!formData.image.startsWith("https://")) {
      return toast.error("Image URL must start with https://");
    }

    try {
      // UPDATE
      if (editingId) {
        await updateVisa(editingId, formData);

        toast.success("Visa updated successfully");

        setEditingId(null);
      } else {
        // CREATE
        await createVisa(formData);

        toast.success("Visa added successfully");
      }

      // RESET FORM
      setFormData({
        countryName: "",
        price: "",
        fees: "",
        processingDays: "",
        visaType: "",
        issuedRecently: "",
        image: "",
      });

      fetchVisas();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteVisa(id);

      toast.success("Visa deleted successfully");

      fetchVisas();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-black text-gray-800">
            {editingId ? "Update Visa" : "Visa Management"}
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            {editingId
              ? "Edit your visa card details"
              : "Add, update and manage visa cards"}
          </p>
        </div>

        {/* FORM */}
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="
              bg-white
              p-8
              rounded-[30px]
              shadow-xl
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >
            {/* COUNTRY */}
            <input
              type="text"
              name="countryName"
              placeholder="Country Name"
              value={formData.countryName}
              onChange={handleChange}
              className="
                border
                p-4
                rounded-2xl
                outline-none
                focus:ring-2
                focus:ring-pink-500
              "
            />

            {/* PRICE */}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="
                border
                p-4
                rounded-2xl
                outline-none
                focus:ring-2
                focus:ring-pink-500
              "
            />

            {/* FEES */}
            <input
              type="number"
              name="fees"
              placeholder="Fees"
              value={formData.fees}
              onChange={handleChange}
              className="
                border
                p-4
                rounded-2xl
                outline-none
                focus:ring-2
                focus:ring-pink-500
              "
            />

            {/* DAYS */}
            <input
              type="number"
              name="processingDays"
              placeholder="Processing Days"
              value={formData.processingDays}
              onChange={handleChange}
              className="
                border
                p-4
                rounded-2xl
                outline-none
                focus:ring-2
                focus:ring-pink-500
              "
            />

            {/* VISA TYPE */}
            <input
              type="text"
              name="visaType"
              placeholder="Visa Type"
              value={formData.visaType}
              onChange={handleChange}
              className="
                border
                p-4
                rounded-2xl
                outline-none
                focus:ring-2
                focus:ring-pink-500
              "
            />

            {/* ISSUED */}
            <input
              type="text"
              name="issuedRecently"
              placeholder="Issued Recently"
              value={formData.issuedRecently}
              onChange={handleChange}
              className="
                border
                p-4
                rounded-2xl
                outline-none
                focus:ring-2
                focus:ring-pink-500
              "
            />

            {/* IMAGE */}
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="
                md:col-span-2
                border
                p-4
                rounded-2xl
                outline-none
                focus:ring-2
                focus:ring-pink-500
              "
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="
                md:col-span-2
                bg-pink-600
                hover:bg-pink-700
                text-white
                py-5
                rounded-2xl
                text-xl
                font-bold
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <PlusCircle />

              {editingId ? "Update Visa" : "Add Visa"}
            </button>

            {/* CANCEL EDIT */}
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);

                  setFormData({
                    countryName: "",
                    price: "",
                    fees: "",
                    processingDays: "",
                    visaType: "",
                    issuedRecently: "",
                    image: "",
                  });
                }}
                className="
                  md:col-span-2
                  bg-gray-200
                  hover:bg-gray-300
                  text-gray-800
                  py-5
                  rounded-2xl
                  text-xl
                  font-bold
                  transition-all
                  duration-300
                "
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {visas.map((visa) => (
            <div
              key={visa._id}
              className="
                bg-white
                rounded-[30px]
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
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
    h-60
    object-cover
  "
              />

              {/* CONTENT */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {visa.countryName}
                  </h2>

                  <span
                    className="
                      bg-gray-100
                      px-4
                      py-2
                      rounded-full
                      text-sm
                    "
                  >
                    {visa.visaType}
                  </span>
                </div>

                <h3 className="text-4xl font-bold text-pink-600">
                  ₹{visa.price}
                </h3>

                <p className="text-gray-500 mt-2">+₹{visa.fees} Fees+Tax</p>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Processing</p>

                    <h4 className="text-xl font-bold">
                      {visa.processingDays} Days
                    </h4>
                  </div>

                  <div
                    className="
                      bg-yellow-100
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold
                    "
                  >
                    {visa.issuedRecently}
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 mt-8">
                  {/* EDIT */}
                  <button
                    onClick={() => {
                      setEditingId(visa._id);

                      setFormData({
                        countryName: visa.countryName || "",

                        price: visa.price || "",

                        fees: visa.fees || "",

                        processingDays: visa.processingDays || "",

                        visaType: visa.visaType || "",

                        issuedRecently: visa.issuedRecently || "",

                        image: visa.image || "",
                      });

                      // SCROLL TOP
                      window.scrollTo({
                        top: 0,

                        behavior: "smooth",
                      });
                    }}
                    className="
                      flex-1
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      py-4
                      rounded-2xl
                      font-bold
                      transition
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <Pencil size={18} />
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(visa._id)}
                    className="
                      flex-1
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      py-4
                      rounded-2xl
                      font-bold
                      transition
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddVisa;
