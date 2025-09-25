"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import Link from "next/link";

export default function AdminLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear session storage
    sessionStorage.removeItem("admin_auth");

    // Clear any other admin-related storage
    localStorage.removeItem("admin_session");

    // Optional: Make a request to clear server-side session if implemented
    // fetch('/api/admin/logout', { method: 'POST' });
  }, []);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleLoginAgain = () => {
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <LogOut className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Logged Out</CardTitle>
              <CardDescription className="text-base">
                You have been successfully logged out of the admin panel
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>✅ Session cleared</p>
              <p>✅ Admin access revoked</p>
              <p>✅ Security credentials removed</p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleGoHome}
                className="w-full h-11 text-base font-medium"
                variant="default">
                <Home className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>

              <Button
                onClick={handleLoginAgain}
                className="w-full h-11 text-base font-medium"
                variant="outline">
                Login Again
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Return to main site
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
