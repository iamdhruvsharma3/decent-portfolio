"use client";

import { useRouter } from "next/navigation";

interface AdminAccessProps {
  children: React.ReactNode;
  className?: string;
  redirectTo?: string;
}

export function AdminAccess({
  children,
  className,
  redirectTo = "/dashboard",
}: AdminAccessProps) {
  const router = useRouter();

  const handleClick = () => {
    // Redirect to admin login page with the intended destination
    const loginUrl = `/admin/login?redirect=${encodeURIComponent(redirectTo)}`;
    router.push(loginUrl);
  };

  return (
    <div
      className={className}
      onClick={handleClick}
      style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
}
