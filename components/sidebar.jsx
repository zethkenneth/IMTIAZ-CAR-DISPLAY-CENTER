// Sidebar.js
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import {
  ArchiveBoxIcon,
  ChartPieIcon,
  DevicePhoneMobileIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
  ArrowLeftEndOnRectangleIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Sidebar = ({ isMini }) => {
  const router = useRouter();
  const menuItems = [
    {
      icon: <ChartPieIcon className="h-5 w-5" />,
      label: "Dashboard",
      to: "/",
    },
    {
      icon: <WrenchScrewdriverIcon className="h-5 w-5" />,
      label: "Services",
      to: "/services",
    },
    {
      icon: <ArchiveBoxIcon className="h-5 w-5" />,
      label: "Inventory",
      to: "/inventory",
    },
    {
      icon: <DocumentMagnifyingGlassIcon className="h-5 w-5" />,
      label: "Guide",
      to: "/guide",
    },
    {
      icon: <InformationCircleIcon className="h-5 w-5" />,
      label: "About",
      to: "/about",
    },
  ];

  const LinkWithIcon = ({ icon, label, to }) => {
    return (
      <Link
        to={`/dashboard${to}`}
        className="block py-2 px-4 hover:bg-orange-100"
      >
        <div class="flex gap-2 text-gray-600 hover:text-[#FF6F00]">
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
            src="assets/images/logo.svg"
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
        <button
          onClick={() => router.push("/")}
          className="w-full bg-red-700 flex items-center justify-center p-2 rounded-full text-white hover:bg-gray-600"
        >
          {!isMini && "Signout"}
          <ArrowLeftEndOnRectangleIcon className="h-7 w-7 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
