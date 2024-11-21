"use client";

import PageContainer from "@components/PageContainer";

const Services = () => {
  return (
    <PageContainer>
      <section className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Our Services</h1>
        <p className="mb-4">
          At [Your Company Name], we offer a range of services designed to meet
          your automotive needs efficiently and effectively. Explore our key
          services below:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Inventory Management */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Inventory Management</h2>
            <p className="text-gray-700">
              Manage your inventory of brand new and second-hand cars, as well
              as auto parts with ease. Our system allows you to track stock
              levels, update product details, and streamline your inventory
              processes.
            </p>
          </div>

          {/* Sales Tracking */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Sales Tracking</h2>
            <p className="text-gray-700">
              Keep track of your sales performance with our robust tracking
              tools. Analyze sales data, monitor trends, and generate reports to
              make informed decisions and improve your sales strategy.
            </p>
          </div>

          {/* Maintenance Guide */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Maintenance Guide</h2>
            <p className="text-gray-700">
              Access a comprehensive guide to vehicle maintenance. Get tips,
              tutorials, and step-by-step instructions to help you keep your
              cars in top condition and address common issues.
            </p>
          </div>

          {/* E-commerce */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">E-commerce Platform</h2>
            <p className="text-gray-700">
              Browse and purchase brand new cars, second-hand vehicles, and auto
              parts through our integrated e-commerce platform. Enjoy a seamless
              shopping experience with detailed product listings and secure
              checkout options.
            </p>
          </div>

          {/* Chatbot */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Chatbot Support</h2>
            <p className="text-gray-700">
              Interact with our chatbot for instant responses to your queries
              about cars. Get detailed information, recommendations, and support
              through an interactive and user-friendly interface.
            </p>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default Services;
