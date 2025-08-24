// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FaqSection = () => {
  const faqs = [
    {
      q: "কিভাবে আমি ট্যুর বুক করতে পারি?",
      a: "আপনি আপনার পছন্দের প্যাকেজ নির্বাচন করে 'Book Now' বাটনে ক্লিক করলেই বুকিং ফর্ম পাবেন। সেখানে প্রয়োজনীয় তথ্য দিয়ে সাবমিট করুন।",
    },
    {
      q: "পেমেন্ট সিস্টেম কিভাবে কাজ করে?",
      a: "আমাদের ওয়েবসাইটে নিরাপদ Stripe পেমেন্ট ইন্টিগ্রেশন রয়েছে। সফল পেমেন্টের পর আপনার বুকিং স্ট্যাটাস পরিবর্তিত হয়ে যাবে।",
    },
    {
      q: "ট্যুর গাইড কিভাবে সিলেক্ট করব?",
      a: "বুকিং করার সময় আপনি ড্রপডাউন থেকে আপনার পছন্দের গাইড সিলেক্ট করতে পারবেন।",
    },
    {
      q: "ডিসকাউন্ট কি সব প্যাকেজে পাওয়া যাবে?",
      a: "না, শুধুমাত্র নির্দিষ্ট অফারকৃত প্যাকেজে বিশেষ ডিসকাউন্ট দেওয়া হয়।",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-14 bg-gray-50 mb-20">
      <h2 className="text-3xl text-[#007777] font-bold text-center mb-8">❓ Frequently Asked Questions</h2>

      <div className="max-w-7xl mx-auto px-4 space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-lg"
            >
              {item.q}
              <span className="ml-4">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-6 pb-4 text-gray-600">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
