import { User } from "@/api/user.types";
import { ChevronLeft, ChevronRight, Inbox, Calendar, MapPin, Mail } from "lucide-react";

interface UsersTableProps {
  users: User[];
  totalCount: number;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const UsersTable = ({
  users,
  totalCount,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
}: UsersTableProps) => {

  // Loading skeleton placeholder state
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200"></div>
        </div>
        <div className="divide-y divide-slate-100 px-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-5 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-slate-200"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 w-1/4 rounded bg-slate-200"></div>
                <div className="h-3 w-1/3 rounded bg-slate-200"></div>
              </div>
              <div className="h-4 w-16 rounded bg-slate-200"></div>
              <div className="h-4 w-20 rounded bg-slate-200"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Visual state for empty records or filter results
  if (!users.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Inbox className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-slate-900">No records match your criteria</h3>
        <p className="mt-1 text-xs text-slate-500">
          Try expanding or clearing your filters to discover records.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="max-w-full table-auto border-collapse text-left text-slate-600">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">Contact info</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Age Segment</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Interests</th>
              <th className="px-6 py-4">Registered</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white text-sm">
            {users.map((user) => {
              const userInitials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

              return (
                <tr
                  key={user.id}
                  className="group transition-colors hover:bg-slate-50/50"
                >
                  {/* Name column featuring custom avatar display */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-700 text-xs">
                        {userInitials || "U"}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {user.first_name} {user.last_name}
                        </div>

                      </div>
                    </div>
                  </td>

                  {/* Email & Mobile combined details */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Mail className="h-3 w-3 shrink-0" />
                        {user.email}
                      </span>
                      {user.mobile && (
                        <span className="block text-xs text-slate-400">
                          {user.mobile}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Location Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-1.5 text-xs">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <div>
                        <div className="text-slate-700">
                          {user.city || "N/A"}, {user.state || "N/A"}
                        </div>
                        <div className="text-slate-400 text-[11px]">{user.country}</div>
                      </div>
                    </div>
                  </td>

                  {/* Age Group Badge */}
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100">
                      {user.age_group}
                    </span>
                  </td>

                  {/* Category Badge */}
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800 border border-slate-200">
                      {user.category || "General"}
                    </span>
                  </td>

                  {/* Interests Column with wrapping protection */}
                  <td className="px-6 py-4">
                    <div className="flex max-w-[200px] flex-wrap gap-1">
                      {Array.isArray(user.interests) ? (
                        user.interests.slice(0, 3).map((interest) => (
                          <span
                            key={interest}
                            className="inline-flex rounded bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200/50"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        user.interests && (
                          <span className="inline-flex rounded bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200/50">
                            {user.interests}
                          </span>
                        )
                      )}
                      {Array.isArray(user.interests) && user.interests.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-medium self-center pl-1">
                          +{user.interests.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Registration Date Column */}
                  <td className="px-6 py-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {new Date(user.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls Section */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-150 bg-slate-50 px-6 py-4 sm:flex-row">
        <div className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
          <span className="font-semibold text-slate-700">
            {Math.min(currentPage * itemsPerPage, totalCount)}
          </span>{" "}
          of <span className="font-semibold text-slate-700">{totalCount}</span> filtered entries
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <div className="flex items-center gap-1.5 px-3">
            <span className="text-xs text-slate-500">Page</span>
            <span className="text-xs font-semibold text-slate-800">{currentPage}</span>
            <span className="text-xs text-slate-500">of</span>
            <span className="text-xs font-semibold text-slate-800">{totalPages}</span>
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;