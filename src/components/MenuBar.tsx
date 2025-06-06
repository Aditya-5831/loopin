import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Bell, Bookmark, Home, Mail } from "lucide-react";

interface MenuBarProps {
  className?: string;
}

const MenuBar = ({ className }: MenuBarProps) => {
  return (
    <div className={cn("", className)}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 text-black"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 text-black"
        title="Notifications"
        asChild
      >
        <Link href="/notifications">
          <Bell />
          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 text-black"
        title="Messages"
        asChild
      >
        <Link href="/messages">
          <Mail />
          <span className="hidden lg:inline">Messages</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 text-black"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>
    </div>
  );
};

export default MenuBar;
