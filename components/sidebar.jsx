// Sidebar.js
'use client'
import React from "react";
import Link from "next/link";
import {
  ArchiveBoxIcon,
  ChartPieIcon,
  ShoppingCartIcon,
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Icon } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import SignOut from "./signout";

const Sidebar = ({ isOpen, isMini }) => {
  const router = useRouter();
  const menuItems = [
    {
      icon: <ChartPieIcon className="h-5 w-5" />,
      label: "Dashboard",
      to: "/",
    },
    {
      icon: <ShoppingCartIcon className="h-5 w-5" />,
      label: "Products",
      to: "/products",
    },
    {
      icon: <ArchiveBoxIcon className="h-5 w-5" />,
      label: "Inventory",
      to: "/inventory",
    },
    {
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
      label: "Order",
      to: "/order",
    },
    {
      icon: <BanknotesIcon className="h-5 w-5" />,
      label: "Transactions",
      to: "/transaction",
    },
    {
      icon: <UserGroupIcon className="h-5 w-5" />,
      label: "Customer",
      to: "/customer",
    },
    {
      icon: <ChartBarIcon className="h-5 w-5" />,
      label: "Reports",
      to: "/reports",
    },
    {
      icon: <DocumentMagnifyingGlassIcon className="h-5 w-5" />,
      label: "Guide",
      to: "/guide",
    },
    {
      icon: <BanknotesIcon className="h-5 w-5" />,
      label: "Payment",
      to: "/payment",
    },
  ];

  const LinkWithIcon = ({ icon, label, to }) => {
    return (
      <Link
        href={`/dashboard${to}`}
        className="block py-2 px-4 hover:bg-orange-100"
      >
        <div className="flex gap-2 text-gray-600 hover:text-[#FF6F00] items-center">
          {icon}
          {!isMini && <p className="font-medium">{label}</p>}
        </div>
      </Link>
    );
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-300 text-black transition-all duration-300 z-20 ${
        isMini ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.svg"
              alt="LOGO!"
              width={30}
              height={30}
              className="object-contain"
            />
            {!isMini && <h1 className="logo_text font-bold">IMTIAZ</h1>}
          </Link>
        </div>
        
        <nav className="flex-1 mt-6">
          <ul>
            {menuItems.map((menuItem, i) => (
              <LinkWithIcon key={i} {...menuItem} />
            ))}
          </ul>
        </nav>

        <div className="p-4">
          <SignOut isMini={isMini} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
