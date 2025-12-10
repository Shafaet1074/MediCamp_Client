import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Faq = () => {
  const faqs = [
    {
      question: "What is Medicamp?",
      answer:
        "Medicamp is a platform providing comprehensive health and wellness camps for users worldwide, allowing you to join and improve your well-being.",
    },
    {
      question: "How can I register?",
      answer:
        "You can register by clicking on the 'Sign Up' button on the homepage and completing the form. It's quick and secure.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, PayPal, and other trusted online payment methods for your convenience.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach our support team via the 'Contact Us' page or email at support@medicamp.com. We're here to help!",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto p-6 md:p-12 bg-gray-50 rounded-3xl shadow-lg mb-20 mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
        Frequently <span className="text-[#26a6eb]">Asked Questions</span>
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none hover:bg-[#55baef]"
            >
              <span className="text-gray-800 hover:text-white font-medium">{faq.question}</span>
              <span className="text-[#26a6eb] hover:text-white text-lg">
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div className="px-6 pb-4 bg-gray-50 text-gray-700">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
