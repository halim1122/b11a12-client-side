// WhyTravelWithUs.jsx
import React from "react";
import { FaGlobeAsia, FaWallet, FaShieldAlt, FaCameraRetro, FaLeaf, FaBusAlt, FaMapMarkedAlt, FaClock } from "react-icons/fa";

const features = [
  {
    icon: <FaGlobeAsia className="text-4xl text-[#007777]" />,
    title: "Expert Tour Guides",
    description: "Get guided by local professionals with years of experience.",
  },
  {
    icon: <FaWallet className="text-4xl text-[#007777]" />,
    title: "Best Price Guarantee",
    description: "We offer the best rates for every destination, always.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-[#007777]" />,
    title: "Secure & Flexible",
    description: "Your data is safe with us. Flexible booking and cancellations.",
  },
  {
  icon: <FaClock className="text-4xl text-[#007777]" />,
  title: "24/7 Customer Support",
  description: "Our support team is available round-the-clock to assist you anytime.",
},
{
  icon: <FaMapMarkedAlt className="text-4xl text-[#007777]" />,
  title: "Tailored Itineraries",
  description: "Customize your trips based on your interests and preferences.",
},
{
  icon: <FaBusAlt className="text-4xl text-[#007777]" />,
  title: "Comfortable Transport",
  description: "Enjoy safe, modern, and comfortable transport throughout your journey.",
},
{
  icon: <FaLeaf className="text-4xl text-[#007777]" />,
  title: "Eco-Friendly Tours",
  description: "We promote sustainable tourism with minimum environmental impact.",
},
{
  icon: <FaCameraRetro className="text-4xl text-[#007777]" />,
  title: "Memorable Experiences",
  description: "Capture unforgettable moments with unique experiences on every trip.",
}
];

const WhyTravelWithUs = () => {
  return (
    <section className="bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">✨ Why Travel With Us?</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {features.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTravelWithUs;
