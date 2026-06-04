import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import { getDashboard } from "../api/dashboardApi";
import AdminLayout from "../../pages/admin/layouts/AdminLayout";

const quickLinks = [
  {
    to: "/admin/jobs/create",
    label: "Create Job",
    desc: "Add a new job opening",
    icon: "➕",
    color: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-200",
  },
  {
    to: "/admin/jobs",
    label: "Manage Jobs",
    desc: "Edit & delete listings",
    icon: "💼",
    color: "from-green-500 to-green-600",
    shadow: "shadow-green-200",
  },
  {
    to: "/admin/job-applications",
    label: "Applications",
    desc: "View candidate applications",
    icon: "📋",
    color: "from-purple-500 to-purple-600",
    shadow: "shadow-purple-200",
  },
  {
    to: "/work-opportunity",
    label: "View Portal",
    desc: "Open public job portal",
    icon: "🌐",
    color: "from-red-600 to-red-700",
    shadow: "shadow-red-200",
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
    countriesCovered: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboard();
      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Total Jobs",    value: stats.totalJobs,          icon: "💼", trend: 12 },
    { title: "Applications",  value: stats.totalApplications,  icon: "📋", trend: 8  },
    { title: "Active Jobs",   value: stats.activeJobs,         icon: "✅", trend: 5  },
    { title: "Countries",     value: stats.countriesCovered,   icon: "🌍", trend: 2  },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-9">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center">
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Job Portal Dashboard
          </h1>
        </div>
        <p className="text-sm text-gray-500 ml-12">
          Manage jobs, applications and work opportunities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {loading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
                <div className="h-3 bg-gray-100 rounded w-24 mb-4" />
                <div className="h-8 bg-gray-100 rounded w-16" />
              </div>
            ))
          : statCards.map((card) => (
              <StatsCard key={card.title} {...card} />
            ))
        }
      </div>

      {/* Quick Actions */}
      <div className="mb-2">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickLinks.map(({ to, label, desc, icon, color, shadow }) => (
            <Link
              key={to}
              to={to}
              className={`group relative bg-gradient-to-br ${color} rounded-2xl p-6
                          shadow-md ${shadow} hover:shadow-lg hover:-translate-y-1
                          transition-all duration-200 overflow-hidden`}
            >
              {/* Background circle decoration */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full pointer-events-none" />
              <div className="absolute -bottom-6 -right-2 w-14 h-14 bg-white/5 rounded-full pointer-events-none" />

              <div className="relative">
                <span className="text-3xl mb-3 block">{icon}</span>
                <h2 className="text-base font-bold text-white mb-1 leading-tight">{label}</h2>
                <p className="text-white/70 text-xs font-medium">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}