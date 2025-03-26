'use client'

import BarChart from "./barcart";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
import {
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import useDashboardHook from "@hooks/dashboardhook";
import { useEffect } from "react";
import axios from "axios";

const HomeDashboard = () => {
  const { analytic, getAnalytic } = useDashboardHook();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount || 0);
  };

  const cards = [
    {
      label: "Total Month Order",
      value: analytic?.totalOrdersPerMonth ?? 0,
      icon: <ChartBarSquareIcon className="text-lg" />,
    },
    {
      label: "Today Sale",
      value: formatCurrency(analytic?.totalSalesToday ?? 0),
      icon: <PresentationChartLineIcon className="text-lg" />,
    },
    {
      label: "Pending Order",
      value: analytic?.pendingOrdersCount ?? 0,
      icon: <ClipboardDocumentCheckIcon className="text-lg" />,
    },
    {
      label: "Low Stack Item",
      value: analytic?.lowStockProducts?.length ?? 0,
      icon: <ChevronDoubleDownIcon className="text-lg" />,
    },
  ];

  useEffect(() => {
    const fetchAnalytics = () => {
      const cancelToken = axios.CancelToken.source();
      getAnalytic(cancelToken.token, (status, feedback) => {
        switch (status) {
          case 200:
            console.log('Analytics updated:', feedback);
            break;
          default:
            console.error('Failed to update analytics:', feedback);
        }
      });
      return cancelToken;
    };

    // Initial fetch
    let cancelToken = fetchAnalytics();

    // Add event listeners for page visibility and focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        cancelToken.cancel(); // Cancel any pending request
        cancelToken = fetchAnalytics(); // Fetch fresh data
      }
    };

    const handleFocus = () => {
      cancelToken.cancel(); // Cancel any pending request
      cancelToken = fetchAnalytics(); // Fetch fresh data
    };

    // Set up periodic refresh (every 5 minutes)
    const refreshInterval = setInterval(() => {
      cancelToken.cancel(); // Cancel any pending request
      cancelToken = fetchAnalytics(); // Fetch fresh data
    }, 300000); // 5 minutes

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Cleanup
    return () => {
      cancelToken.cancel();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      clearInterval(refreshInterval);
    };
  }, [getAnalytic]);

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
      <BarChart
        labels={analytic?.yearSales?.map((item) => item.name) ?? 0}
        values={analytic?.yearSales?.map((item) => item.value) ?? 0}
      />
    </div>
  );
};

export default HomeDashboard;
