"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AdminLogoutProps {
  className?: string;
}

export function AdminLogout({ className }: AdminLogoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("admin_auth");

    // Redirect to logout page
    router.push("/admin/logout");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="sm"
      className={className}>
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
}
