import BarChart from "./barcart";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
import {
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

const HomeDashboard = () => {
  const cards = [
    {
      label: "Total Sales",
      value: "120,100.00",
      icon: <ChartBarSquareIcon className="text-lg" />,
    },
    {
      label: "Pending Order",
      value: 13,
      icon: <ClipboardDocumentCheckIcon className="text-lg" />,
    },
    {
      label: "Low Stack Item",
      value: 5,
      icon: <ChevronDoubleDownIcon className="text-lg" />,
    },
    {
      label: "Today Sale",
      value: 5,
      icon: <PresentationChartLineIcon className="text-lg" />,
    },
  ];

  const CardStatistic = ({ label, value, icon }) => {
    return (
      <div
        style={{ width: "24%", height: "7rem", alignItems: "start" }}
        className="p-5 bg-white rounded-lg shadow-md flex justify-between"
      >
        <div>
          <p className="text-md text-gray-500">{label}</p>
          <h1 style={{ fontSize: 35 }} className="font-bold text-gray-800">
            {value}
          </h1>
        </div>
        <div className="w-6">{icon}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-5 mb-5">
        {cards.map((card, i) => (
          <CardStatistic key={i} {...card} />
        ))}
      </div>
      <BarChart />
    </div>
  );
};

export default HomeDashboard;
