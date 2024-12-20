// Sidebar.js
'use client'
import React from "react";
import  Link  from "next/link"; // Assuming you're using react-router for navigation
import {
  ArchiveBoxIcon,
  ChartPieIcon,
  ShoppingCartIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Icon } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import SignOut from "./signout";

const Sidebar = ({ isMini }) => {
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
      icon: <ArchiveBoxIcon className="h-5 w-5" />,
      label: "order",
      to: "/order",
    },
    {
      icon: <ArchiveBoxIcon className="h-5 w-5" />,
      label: "transaction",
      to: "/transaction",
    },
    {
      icon: <DocumentMagnifyingGlassIcon className="h-5 w-5" />,
      label: "Guide",
      to: "/guide",
    },
  ];

  const LinkWithIcon = ({ icon, label, to }) => {
    return (
      <Link
        href={`/dashboard${to}`}
        className="block py-2 px-4 hover:bg-orange-100"
      >
        <div className="flex gap-2 text-gray-600 hover:text-[#FF6F00]">
          {icon}
          {!isMini && <p className="font-medium">{label}</p>}
        </div>
      </Link>
    );
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-300 text-black transition-transform shadow-md  ${
        isMini ? "w-16" : "w-64"
      }`}
    >
      <div className={`mt-4 flex flex-col justify-between gap-20`}>
        <Link href="/" className="flex gap-2 flex-start ml-5">
          <Image
            src="/assets/images/logo.svg"
            alt="LOGO!"
            width={30}
            height={30}
            className="object-contain"
          />
          {!isMini && <h1 className="logo_text"> IMTIAZ </h1>}
        </Link>
        <nav className="mt-lg">
          <ul>
            {menuItems.map((menuItem, i) => (
              <LinkWithIcon key={i} {...menuItem} />
            ))}
          </ul>
        </nav>
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full p-5 flex justify-center`}
      >
        <SignOut isMini={isMini} />
      </div>
    </div>
  );
};

export default Sidebar;
