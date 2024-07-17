"use client";
import { useState } from "react";

const guides = [
  {
    id: 1,
    title: "Engine Overheating",
    summary: "Learn how to diagnose and fix engine overheating issues.",
    content:
      "Full guide on diagnosing and fixing engine overheating. This includes checking coolant levels, inspecting the radiator, and more.",
  },
  {
    id: 2,
    title: "Brake Maintenance",
    summary: "Steps to ensure your brakes are working properly.",
    content:
      "Detailed guide on brake maintenance. This includes checking brake pads, brake fluid levels, and inspecting the brake system for wear and tear.",
  },
  {
    id: 3,
    title: "Oil Change",
    summary: "How to perform an oil change on your vehicle.",
    content:
      "Step-by-step guide on how to change your car's oil, including what type of oil to use and how often to change it.",
  },
  // Add more guides as needed
];

const Guide = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  const openModal = (guide) => {
    setSelectedGuide(guide);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedGuide(null);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          Car Troubleshooting and Maintenance Guide
        </h1>
        <div className="flex flex-wrap">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="card bg-gray-100 border border-gray-300 rounded-lg p-4 m-2 w-64 cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => openModal(guide)}
            >
              <h2 className="text-xl font-semibold">{guide.title}</h2>
              <p>{guide.summary}</p>
            </div>
          ))}
        </div>

        {modalIsOpen && selectedGuide && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              <h2 className="text-2xl font-bold mb-4">{selectedGuide.title}</h2>
              <p>{selectedGuide.content}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Guide;
