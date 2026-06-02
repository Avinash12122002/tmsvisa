import {
  useEffect,
  useState,
} from "react";

import AdminLayout
from "./layouts/AdminLayout";

import StatsCard
from "./components/StatsCard";

import {
  getApplications,
} from "../../services/applicationService";

export default function Dashboard() {

  // ======================
  // STATE
  // ======================

  const [
    applications,
    setApplications,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  // ======================
  // FETCH APPLICATIONS
  // ======================

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications =
    async () => {

      try {

        const data =
          await getApplications();

        setApplications(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // ======================
  // STATS
  // ======================

  const totalApplications =
    applications.length;

  const pendingApplications =
    applications.filter(
      (app) =>
        app.status ===
        "Pending"
    ).length;

  const approvedApplications =
    applications.filter(
      (app) =>
        app.status ===
        "Approved"
    ).length;

  const rejectedApplications =
    applications.filter(
      (app) =>
        app.status ===
        "Rejected"
    ).length;

  // ======================
  // UI
  // ======================

  return (

    <AdminLayout>

      <div className="p-6">

        {/* HEADER */}

        <div className="mb-8">

          <h1
            className="
              text-4xl
              font-bold
              text-gray-800
            "
          >
            Admin Dashboard
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Monitor all visa applications and statuses
          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div
            className="
              bg-white
              rounded-2xl
              shadow
              p-10
              text-center
              text-gray-500
              text-lg
            "
          >
            Loading Dashboard...
          </div>

        ) : (

          <>
            {/* STATS */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-4
                mb-8
              "
            >

              <StatsCard
                title="Total Applications"
                value={totalApplications}
                color="bg-blue-600"
              />

              <StatsCard
                title="Pending"
                value={pendingApplications}
                color="bg-amber-500"
              />

              <StatsCard
                title="Approved"
                value={approvedApplications}
                color="bg-green-600"
              />

              <StatsCard
                title="Rejected"
                value={rejectedApplications}
                color="bg-red-600"
              />

            </div>

            {/* RECENT ACTIVITY */}

            <div
              className="
                mt-10
                bg-white
                rounded-2xl
                shadow
                p-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-6
                "
              >
                Recent Applications
              </h2>

              <div className="space-y-4">

                {applications
                  .slice(0, 5)
                  .map((app) => (

                    <div
                      key={app._id}
                      className="
                        flex
                        items-center
                        justify-between
                        border-b
                        pb-4
                      "
                    >

                      <div>

                        <h3
                          className="
                            font-semibold
                            text-lg
                          "
                        >
                          {
                            app.applicantName
                          }
                        </h3>

                        <p className="text-gray-500">
                          {
                            app.email
                          }
                        </p>

                      </div>

                      <div
                        className="
                          text-sm
                          text-gray-500
                        "
                      >

                        {
                          new Date(
                            app.createdAt
                          ).toLocaleDateString()
                        }

                      </div>

                    </div>
                  ))}

              </div>

            </div>
          </>

        )}

      </div>

    </AdminLayout>
  );
}