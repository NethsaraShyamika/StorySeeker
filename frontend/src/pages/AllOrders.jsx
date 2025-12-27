import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import api from "../api/axios";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaUser,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFileExport,
  FaFilter,
  FaPrint,
  FaChartBar,
  FaSync,
  FaCalendar,
  FaTimes,
  FaShoppingCart,
  FaClock,
  FaTruck,
  FaBan,
  FaEye,
  FaSearch,
} from "react-icons/fa";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState(null);
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);
  const [orderDetailsDiv, setOrderDetailsDiv] = useState("hidden");
  const [orderDetailsData, setOrderDetailsData] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const headers = useMemo(
    () => ({
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    []
  );

  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.get(
        "/get-all-orders",
        { headers }
      );
      setAllOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setAllOrders([]);
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchOrders, 30000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh, fetchOrders]);

  const analytics = useMemo(() => {
    const total = allOrders.length;
    const pending = allOrders.filter((o) => o.status === "pending").length;
    const delivered = allOrders.filter((o) => o.status === "delivered").length;
    const cancelled = allOrders.filter((o) => o.status === "cancelled").length;
    const totalRevenue = allOrders
      .filter((o) => o.status === "delivered")
      .reduce((sum, o) => sum + (o.book?.[0]?.price || 0), 0);
    return { total, pending, delivered, cancelled, totalRevenue };
  }, [allOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await api.put(
        `/update-order-status/${orderId}`,
        { status: newStatus },
        { headers }
      );
      if (response.status === 200) {
        setAllOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        setEditingRow(null);
      }
    } catch (error) {
      alert("Failed to update order status");
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedOrders.length === 0) return alert("Please select orders");
    try {
      await Promise.all(
        selectedOrders.map((orderId) =>
          api.put(
            `/update-order-status/${orderId}`,
            { status: newStatus },
            { headers }
          )
        )
      );
      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          selectedOrders.includes(order._id)
            ? { ...order, status: newStatus }
            : order
        )
      );
      setSelectedOrders([]);
      alert(`${selectedOrders.length} orders updated`);
    } catch (error) {
      alert("Failed to update orders");
    }
  };

  const exportToCSV = () => {
    const csvHeaders = [
      "Order ID",
      "Title",
      "Author",
      "Price",
      "Status",
      "Customer",
      "Email",
      "Date",
    ];
    const rows = filteredOrders.map((order) => {
      const book = order.book?.[0];
      return [
        order._id,
        book?.title || "N/A",
        book?.author || "N/A",
        book?.price || "N/A",
        order.status || "N/A",
        order.user?.username || "N/A",
        order.user?.email || "N/A",
        new Date(order.createdAt).toLocaleDateString() || "N/A",
      ];
    });
    const csv = [
      csvHeaders.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === filteredOrders.length
        ? []
        : filteredOrders.map((order) => order._id)
    );
  };

  const filteredOrders = useMemo(() => {
    let filtered = allOrders;
    if (statusFilter !== "all")
      filtered = filtered.filter((order) => order.status === statusFilter);
    if (dateFilter.start)
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) >= new Date(dateFilter.start)
      );
    if (dateFilter.end)
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) <= new Date(dateFilter.end)
      );
    if (filtering) {
      filtered = filtered.filter((order) => {
        const book = order.book?.[0];
        const s = filtering.toLowerCase();
        return (
          book?.title?.toLowerCase().includes(s) ||
          book?.author?.toLowerCase().includes(s) ||
          order.user?.username?.toLowerCase().includes(s) ||
          order.user?.email?.toLowerCase().includes(s) ||
          order.status?.toLowerCase().includes(s)
        );
      });
    }
    return filtered;
  }, [allOrders, statusFilter, dateFilter, filtering]);

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: () => (
          <input
            type="checkbox"
            checked={
              selectedOrders.length === filteredOrders.length &&
              filteredOrders.length > 0
            }
            onChange={toggleSelectAll}
            className="w-4 h-4 cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedOrders.includes(row.original._id)}
            onChange={() => toggleOrderSelection(row.original._id)}
            className="w-4 h-4 cursor-pointer"
          />
        ),
        size: 50,
        enableSorting: false,
      },
      {
        accessorKey: "index",
        header: "Sr.",
        cell: ({ row }) => (
          <div className="text-center font-medium">{row.index + 1}</div>
        ),
        size: 60,
        enableSorting: false,
      },
      {
        accessorKey: "book.title",
        header: "Title",
        cell: ({ row }) => {
          const book = row.original.book?.[0];
          return (
            <Link
              to={`/view-book-details/${book?._id}`}
              className="hover:text-blue-400 transition-colors font-medium truncate block"
            >
              {book?.title || "No title"}
            </Link>
          );
        },
        size: 200,
      },
      {
        accessorKey: "book.author",
        header: "Author",
        cell: ({ row }) => {
          const book = row.original.book?.[0];
          return <div className="truncate">{book?.author || "N/A"}</div>;
        },
        size: 150,
      },
      {
        accessorKey: "book.price",
        header: "Price",
        cell: ({ row }) => {
          const book = row.original.book?.[0];
          return (
            <div className="font-semibold">
              {book?.price ? `RS. ${book.price}` : "N/A"}
            </div>
          );
        },
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const order = row.original;
          const isEditing = editingRow === order._id;
          if (isEditing) {
            return (
              <div className="flex items-center gap-2">
                <select
                  defaultValue={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="bg-zinc-700 text-white rounded px-3 py-1.5 text-sm border border-zinc-600 focus:border-blue-500 focus:outline-none"
                >
                  {["pending", "delivered", "cancelled"].map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  className="text-green-500 hover:text-green-400"
                  onClick={() => setEditingRow(null)}
                >
                  <FaCheck />
                </button>
              </div>
            );
          }
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingRow(order._id)}
                className="hover:scale-110 transition-transform text-xl"
              >
                {order.status === "pending"
                  ? "⌛"
                  : order.status === "delivered"
                  ? "🚚"
                  : order.status === "cancelled"
                  ? "❌"
                  : ""}
              </button>
              <span
                className={`capitalize font-medium ${
                  order.status === "pending"
                    ? "text-yellow-400"
                    : order.status === "delivered"
                    ? "text-green-500"
                    : order.status === "cancelled"
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {order.status || "Pending"}
              </span>
            </div>
          );
        },
        size: 180,
      },
      {
        accessorKey: "user.username",
        header: "Customer",
        cell: ({ row }) => (
          <div className="truncate">{row.original.user?.username || "N/A"}</div>
        ),
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              className="text-lg hover:text-blue-500"
              onClick={() => {
                setOrderDetailsDiv("fixed");
                setOrderDetailsData(row.original);
              }}
              title="View Details"
            >
              <FaEye />
            </button>
            <button
              className="text-lg hover:text-orange-500"
              onClick={() => {
                setUserDiv("fixed");
                setUserDivData(row.original.user);
              }}
              title="View User"
            >
              <FaUser />
            </button>
          </div>
        ),
        size: 100,
        enableSorting: false,
      },
    ],
    [editingRow, selectedOrders, filteredOrders.length]
  );

  const table = useReactTable({
    data: filteredOrders,
    columns,
    state: { sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  if (loading)
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen p-4 md:p-8 text-zinc-100 print:p-0">
      <div className="mb-8 print:mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 print:hidden">
          <h1 className="text-3xl md:text-5xl font-bold">All Orders</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 text-sm"
            >
              <FaChartBar />
              {showAnalytics ? "Hide" : "Show"} Analytics
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm ${
                autoRefresh ? "bg-green-600" : "bg-zinc-700"
              }`}
            >
              <FaSync className={autoRefresh ? "animate-spin" : ""} />
              Auto-Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2 text-sm"
            >
              <FaFileExport />
              Export CSV
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center gap-2 text-sm"
            >
              <FaPrint />
              Print
            </button>
          </div>
        </div>

        {showAnalytics && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 print:hidden">
            <div className="bg-linear-to-br from-blue-600 to-blue-700 p-4 rounded-lg">
              <FaShoppingCart className="text-2xl mb-2" />
              <div className="text-2xl font-bold">{analytics.total}</div>
              <div className="text-sm">Total Orders</div>
            </div>
            <div className="bg-linear-to-br from-yellow-600 to-yellow-700 p-4 rounded-lg">
              <FaClock className="text-2xl mb-2" />
              <div className="text-2xl font-bold">{analytics.pending}</div>
              <div className="text-sm">Pending</div>
            </div>
            <div className="bg-linear-to-br from-green-600 to-green-700 p-4 rounded-lg">
              <FaTruck className="text-2xl mb-2" />
              <div className="text-2xl font-bold">{analytics.delivered}</div>
              <div className="text-sm">Delivered</div>
            </div>
            <div className="bg-linear-to-br from-red-600 to-red-700 p-4 rounded-lg">
              <div className="text-2xl font-bold">{analytics.cancelled}</div>
              <div className="text-sm">Cancelled</div>
            </div>
            <div className="bg-linear-to-br from-purple-600 to-purple-700 p-4 rounded-lg">
              <FaChartBar className="text-2xl mb-2" />
              <div className="text-2xl font-bold">
                RS. {analytics.totalRevenue}
              </div>
              <div className="text-sm">Revenue</div>
            </div>
          </div>
        )}

        <div className="space-y-4 print:hidden">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg flex items-center gap-2"
            >
              <FaFilter />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="bg-zinc-800 p-4 rounded-lg space-y-4 border border-zinc-700">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaCalendar className="inline mr-2" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={dateFilter.start}
                    onChange={(e) =>
                      setDateFilter({ ...dateFilter, start: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaCalendar className="inline mr-2" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={dateFilter.end}
                    onChange={(e) =>
                      setDateFilter({ ...dateFilter, end: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setDateFilter({ start: "", end: "" });
                  setFiltering("");
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 text-sm"
              >
                <FaTimes />
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {selectedOrders.length > 0 && (
          <div className="mt-4 bg-blue-600/20 border border-blue-600 p-4 rounded-lg flex flex-wrap items-center gap-4 print:hidden">
            <span className="font-medium">
              {selectedOrders.length} selected
            </span>
            <button
              onClick={() => handleBulkStatusUpdate("pending")}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm"
            >
              Mark Pending
            </button>
            <button
              onClick={() => handleBulkStatusUpdate("delivered")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
            >
              Mark Delivered
            </button>
            <button
              onClick={() => handleBulkStatusUpdate("cancelled")}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
            >
              Mark Cancelled
            </button>
            <button
              onClick={() => setSelectedOrders([])}
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="mb-4 text-zinc-400 text-sm print:hidden">
        Showing {filteredOrders.length} of {allOrders.length} orders
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-zinc-800 rounded-lg p-12 text-center print:hidden">
          <FaShoppingCart className="text-6xl text-zinc-600 mx-auto mb-4" />
          <p className="text-xl text-zinc-400">No orders found</p>
        </div>
      ) : (
        <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg print:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-zinc-700">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-4 text-left text-sm font-semibold text-zinc-300 bg-zinc-900 print:bg-gray-200 print:text-black"
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={`flex items-center gap-2 ${
                              header.column.getCanSort() ? "cursor-pointer" : ""
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span className="text-zinc-500 print:hidden">
                                {header.column.getIsSorted() === "asc" ? (
                                  <FaSortUp />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <FaSortDown />
                                ) : (
                                  <FaSort />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-zinc-700 hover:bg-zinc-900 print:hover:bg-transparent ${
                      selectedOrders.includes(row.original._id)
                        ? "bg-blue-900/30 print:bg-transparent"
                        : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-4 text-sm print:text-black"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 border-t border-zinc-700 bg-zinc-900 gap-4 print:hidden">
            <div className="text-sm text-zinc-400">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()} | Total: {filteredOrders.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1.5 bg-zinc-700 rounded hover:bg-zinc-600 disabled:opacity-50 text-sm"
              >
                First
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1.5 bg-zinc-700 rounded hover:bg-zinc-600 disabled:opacity-50 text-sm"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1.5 bg-zinc-700 rounded hover:bg-zinc-600 disabled:opacity-50 text-sm"
              >
                Next
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1.5 bg-zinc-700 rounded hover:bg-zinc-600 disabled:opacity-50 text-sm"
              >
                Last
              </button>
            </div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="px-3 py-1.5 bg-zinc-700 rounded text-sm"
            >
              {[5, 10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {userDiv === "fixed" && userDivData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full shadow-2xl border border-zinc-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <FaUser className="text-blue-400" />
                User Details
              </h2>
              <button
                onClick={() => setUserDiv("hidden")}
                className="text-3xl hover:text-red-500"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-zinc-900 p-3 rounded">
                <p className="text-zinc-400 text-xs uppercase mb-1">Name</p>
                <p className="text-lg font-medium">
                  {userDivData.username || "N/A"}
                </p>
              </div>
              <div className="bg-zinc-900 p-3 rounded">
                <p className="text-zinc-400 text-xs uppercase mb-1">Email</p>
                <p className="text-lg font-medium">
                  {userDivData.email || "N/A"}
                </p>
              </div>
              <div className="bg-zinc-900 p-3 rounded">
                <p className="text-zinc-400 text-xs uppercase mb-1">Address</p>
                <p className="text-lg font-medium">
                  {userDivData.address || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {orderDetailsDiv === "fixed" && orderDetailsData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-800 rounded-lg p-6 max-w-2xl w-full shadow-2xl border border-zinc-700 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <FaShoppingCart className="text-blue-400" />
                Order Details
              </h2>
              <button
                onClick={() => setOrderDetailsDiv("hidden")}
                className="text-3xl hover:text-red-500"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-zinc-900 p-4 rounded">
                <p className="text-zinc-400 text-sm mb-2">Order ID</p>
                <p className="font-mono text-sm">{orderDetailsData._id}</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded">
                <p className="text-zinc-400 text-sm mb-2">Book</p>
                <p className="text-lg font-medium">
                  {orderDetailsData.book?.[0]?.title || "N/A"}
                </p>
                <p className="text-zinc-400">
                  by {orderDetailsData.book?.[0]?.author || "N/A"}
                </p>
              </div>
              <div className="bg-zinc-900 p-4 rounded">
                <p className="text-zinc-400 text-sm mb-2">Price</p>
                <p className="text-xl font-bold">
                  RS. {orderDetailsData.book?.[0]?.price || "N/A"}
                </p>
              </div>
              <div className="bg-zinc-900 p-4 rounded">
                <p className="text-zinc-400 text-sm mb-2">Status</p>
                <p
                  className={`text-lg font-medium capitalize ${
                    orderDetailsData.status === "pending"
                      ? "text-yellow-400"
                      : orderDetailsData.status === "delivered"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {orderDetailsData.status}
                </p>
              </div>
              <div className="bg-zinc-900 p-4 rounded">
                <p className="text-zinc-400 text-sm mb-2">Customer</p>
                <p className="font-medium">
                  {orderDetailsData.user?.username || "N/A"}
                </p>
                <p className="text-zinc-400 text-sm">
                  {orderDetailsData.user?.email || "N/A"}
                </p>
              </div>
              <div className="bg-zinc-900 p-4 rounded">
                <p className="text-zinc-400 text-sm mb-2">Order Date</p>
                <p>
                  {new Date(orderDetailsData.createdAt).toLocaleString() ||
                    "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
