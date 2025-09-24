"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  email?: string;
  location?: string;
  website?: string;
  submittedAt: string;
  approved: boolean;
  featured: boolean;
  ipAddress?: string;
}

export default function AdminGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/admin/entries");
      const data = await response.json();
      setEntries(data.entries);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (entryId: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/admin/toggle-approval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId, approved: !currentStatus }),
      });

      if (response.ok) {
        await fetchEntries(); // Refresh the list
      }
    } catch (error) {
      console.error("Error toggling approval:", error);
    }
  };

  const deleteEntry = async (entryId: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      const response = await fetch("/api/admin/delete-entry", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId }),
      });

      if (response.ok) {
        await fetchEntries(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  if (loading) {
    return <div className="p-8">Loading entries...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Guestbook Admin</h1>

        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <h2 className="font-semibold mb-2">Summary</h2>
          <p>Total Entries: {entries.length}</p>
          <p>Approved: {entries.filter((e) => e.approved).length}</p>
          <p>Pending: {entries.filter((e) => !e.approved).length}</p>
        </div>

        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`p-6 border rounded-lg ${
                entry.approved
                  ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                  : "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
              }`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{entry.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.email} • {entry.location} •{" "}
                    {new Date(entry.submittedAt).toLocaleString()}
                  </p>
                  {entry.ipAddress && (
                    <p className="text-xs text-muted-foreground">
                      IP: {entry.ipAddress}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => toggleApproval(entry.id, entry.approved)}
                    variant={entry.approved ? "outline" : "default"}
                    size="sm">
                    {entry.approved ? "Unapprove" : "Approve"}
                  </Button>
                  <Button
                    onClick={() => deleteEntry(entry.id)}
                    variant="destructive"
                    size="sm">
                    Delete
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                <p className="text-sm">{entry.message}</p>
              </div>

              {entry.website && (
                <p className="mt-2 text-sm">
                  Website:{" "}
                  <a
                    href={entry.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline">
                    {entry.website}
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
