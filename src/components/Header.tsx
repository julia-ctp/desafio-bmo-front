"use client";

import { Menu} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoBMO } from "@/assets";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: "/feed", label: "Feed" },
    { id: 3, href: "/login", label: "Login" },
    { id: 4, href: "/#contato", label: "Contato" },
  ];

  return (
    <header className="flex sticky items-center justify-between px-10 py-1 mb-3 bg-background w-full shadow-xs ">
      <Link href={"/"}>
        <Image
          src={logoBMO}
          height={65}
          width={65}
          alt="Logo BMO"
          className="w-18 sm:w-20 lg:w-22"
        />
      </Link>
      <nav className="hidden sm:flex items-center gap-1 md:gap-3">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`px-4 py-1.5 rounded-md cursor-pointer ${
              pathname === link.href
                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="sm:hidden"
            aria-label="Open Menu"
          >
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 animate-collapsible-down"
          align="start"
        >
          <DropdownMenuGroup>
            {navLinks.map((link) => (
              <DropdownMenuItem key={link.id} asChild>
                <Link
                  href={link.href}
                  className={`px-2 py-1 rounded-md cursor-pointer ${
                    pathname === link.href
                      ? "bg-primary text-primary-foreground hover:bg-primary/80"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu> 

    </header>
  );
}

