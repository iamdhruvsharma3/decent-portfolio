"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if this is a protected route
    const isProtectedRoute =
      pathname.startsWith("/dashboard") ||
      (pathname.startsWith("/admin") &&
        pathname !== "/admin/login" &&
        pathname !== "/admin/logout");

    if (!isProtectedRoute) {
      setIsAuthenticated(true);
      return;
    }

    // For protected routes, verify authentication
    const checkAuth = async () => {
      const token = sessionStorage.getItem("admin_auth");

      if (!token) {
        // No token, redirect to login
        const loginUrl = `/admin/login?redirect=${encodeURIComponent(pathname)}`;
        router.push(loginUrl);
        return;
      }

      try {
        // Verify token with server
        const response = await fetch("/api/admin/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (result.success) {
          setIsAuthenticated(true);
        } else {
          // Invalid token, clear it and redirect to login
          sessionStorage.removeItem("admin_auth");
          const loginUrl = `/admin/login?redirect=${encodeURIComponent(pathname)}`;
          router.push(loginUrl);
        }
      } catch {
        // Verification failed, redirect to login
        sessionStorage.removeItem("admin_auth");
        const loginUrl = `/admin/login?redirect=${encodeURIComponent(pathname)}`;
        router.push(loginUrl);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading state for protected routes while checking auth
  if (isAuthenticated === null) {
    const isProtectedRoute =
      pathname.startsWith("/dashboard") ||
      (pathname.startsWith("/admin") &&
        pathname !== "/admin/login" &&
        pathname !== "/admin/logout");

    if (isProtectedRoute) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Authenticating...</p>
          </div>
        </div>
      );
    }
  }

  // Render children once authenticated or for public routes
  return <>{children}</>;
}
