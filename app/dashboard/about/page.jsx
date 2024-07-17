const About = () => {
  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to [Your Company Name]! We are dedicated to providing you with
        the best solutions for managing and tracking your automotive needs. Our
        web app is designed to offer a comprehensive suite of tools to assist
        with various aspects of automotive sales, maintenance, and inventory
        management.
      </p>

      <h2 className="text-xl font-semibold mb-2">Our Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          **Inventory System**: Efficiently manage your inventory of brand new,
          second-hand cars, and auto parts.
        </li>
        <li>
          **Sale Tracking**: Keep track of your sales and monitor performance
          metrics.
        </li>
        <li>
          **Maintenance Guide**: Access a comprehensive guide for maintaining
          your vehicles and addressing common issues.
        </li>
        <li>
          **E-commerce Platform**: Browse and purchase brand new cars,
          second-hand vehicles, and auto parts through our integrated e-commerce
          system.
        </li>
        <li>
          **Chatbot Interaction**: Get instant responses and detailed
          information about cars through our interactive chatbot.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
      <p className="mb-4">
        Our mission is to streamline automotive management and enhance the user
        experience through innovative technology and dedicated support. We aim
        to provide a user-friendly platform that meets all your automotive needs
        in one place.
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p>
        If you have any questions or need support, feel free to reach out to us
        at{" "}
        <a href="mailto:support@yourcompany.com" className="text-blue-500">
          support@yourcompany.com
        </a>
        .
      </p>
    </section>
  );
};

export default About;
