import { useEffect, useState, useMemo } from "react";
import { 
  Download, 
  Users, 
  Globe, 
  Tag, 
  Search, 
  SlidersHorizontal, 
  RefreshCw 
} from "lucide-react";
import * as XLSX from "xlsx";

import { User } from "@/api/user.types";
import { getUsersApi } from "@/api/Admin.api";
import UsersTable from "./UsersTable";


const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsersApi();
      setUsers(response.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter lists derived from unique user data
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(users.map((u) => u.category).filter(Boolean)))];
  }, [users]);

  const countries = useMemo(() => {
    return ["All", ...Array.from(new Set(users.map((u) => u.country).filter(Boolean)))];
  }, [users]);

  // Filtered & Searched Data
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = 
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.city && user.city.toLowerCase().includes(searchQuery.toLowerCase()));
        
      const matchesCategory = selectedCategory === "All" || user.category === selectedCategory;
      const matchesCountry = selectedCountry === "All" || user.country === selectedCountry;

      return matchesSearch && matchesCategory && matchesCountry;
    });
  }, [users, searchQuery, selectedCategory, selectedCountry]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedCountry]);

  // Paginated Data
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));

  // Export current filtered view or all users
  const exportUsers = () => {
    const dataToExport = filteredUsers.length > 0 ? filteredUsers : users;
    
    const exportData = dataToExport.map((user) => ({
      "First Name": user.first_name,
      "Last Name": user.last_name,
      Email: user.email,
      Mobile: user.mobile,
      City: user.city,
      State: user.state,
      Country: user.country,
      "Age Group": user.age_group,
      Category: user.category,
      Interests: Array.isArray(user.interests)
        ? user.interests.join(", ")
        : user.interests,
      Consent: user.consent ? "Yes" : "No",
      Registered: new Date(user.created_at).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "Users_Export.xlsx");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 pt-24 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              User Directory
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Manage system access, analyze registration metrics, and export data views.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
              title="Refresh directory data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={exportUsers}
              disabled={loading || filteredUsers.length === 0}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <Download className="h-4 w-4" />
              <span>Export {filteredUsers.length !== users.length ? "Filtered" : "Excel"}</span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Records</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">{users.length}</h2>
              </div>
              <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500">
                {filteredUsers.length} matches in current view
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Countries Represented</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {[...new Set(users.map((u) => u.country).filter(Boolean))].length}
                </h2>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Globe className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500">Global geographic diversity</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Segments</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {[...new Set(users.map((u) => u.category).filter(Boolean))].length}
                </h2>
              </div>
              <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
                <Tag className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500">Active membership categories</p>
            </div>
          </div>
        </div>

        {/* Search and Filters Segment */}
        <div className="mb-6 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Select Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-500 uppercase">Filters:</span>
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="All">All Categories</option>
                {categories.filter(c => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Country Filter */}
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="All">All Countries</option>
                {countries.filter(c => c !== "All").map((cnt) => (
                  <option key={cnt} value={cnt}>{cnt}</option>
                ))}
              </select>

              {(searchQuery || selectedCategory !== "All" || selectedCountry !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedCountry("All");
                  }}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <UsersTable
          users={paginatedUsers}
          totalCount={filteredUsers.length}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />

      </div>
    </div>
  );
};

export default UsersPage;