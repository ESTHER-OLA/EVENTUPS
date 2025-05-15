"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import AppLogo from "../components/app-logo";
import { disableNavWithNavbar } from "../lib/utils/disableComponents";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const isActive = (path) => {
    return pathname === path;
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {!disableNavWithNavbar.includes(path) && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <AppLogo />
              <Link href="/" className="font-bold text-xl hidden md:block">
                TechConnect
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                href="#events"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/find-events")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Find Events
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/about") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                About
              </Link>
              <Link
                href="/faqs"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/faqs") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                FAQs
              </Link>
              <Link
                href="/retrieve-tickets"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/retrieve-tickets")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Retrieve Tickets
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.avatar || ""}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-chart-5 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t">
              <div className="container py-4 flex flex-col space-y-4">
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/") ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  href="#events"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/find-events")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={toggleMenu}
                >
                  Find Events
                </Link>
                <Link
                  href="/about"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/about")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  href="/faqs"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/faqs") ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={toggleMenu}
                >
                  FAQs
                </Link>
                <Link
                  href="/retrieve-tickets"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/retrieve-tickets")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={toggleMenu}
                >
                  Retrieve Tickets
                </Link>
                <div className="flex flex-col gap-2 pt-2 border-t">
                  {isAuthenticated ? (
                    <>
                      <Link href="/profile" onClick={toggleMenu}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={toggleMenu}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={toggleMenu}>
                        <Button className="w-full bg-gradient-to-r from-chart-5 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
}
