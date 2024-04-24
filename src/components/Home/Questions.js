import React, { useState, useEffect } from "react";

const questionsData = [
  {
    question: "What is the purpose of this website/platform?",
    answer:
      "This platform aims to help students planning to study abroad by providing a direct connection to those with real-world immigration and study abroad experiences. It allows you to get informed about the ground realities, doubts, and queries that consultants may not cover, ensuring you can make well-informed decisions about your international education plans.",
  },
  {
    question: "Who can use this platform?",
    answer:
      "This platform is open to students planning to go abroad for studies, people considering immigration to settle abroad, as well as current international students and immigrants willing to volunteer their time to help others by answering questions and addressing doubts.",
  },
  {
    question: "How does the chat/messaging system work?",
    answer:
      "The chat system allows you to select and connect with volunteers who might have relevant study abroad or immigration experiences in your country/region of interest. You can freely ask your questions and queries, and the volunteers will provide answers based on their first-hand knowledge. However, as this is a free service, please note that response times may vary.",
  },
  {
    question: "Is there any cost or fee to use this service?",
    answer:
      "Currently, this is a free service. The primary objective is to help students and prospective immigrants by addressing their doubts and questions. We encourage you to share this website with others so that we can continue growing and reaching more people in need of such assistance.",
  },
  {
    question:
      "Who will I be chatting with - current students abroad or immigrants?",
    answer:
      "On our platform, you will have the opportunity to chat with both current international students as well as individuals who have already completed their education abroad and chosen to immigrate. While the majority (over 80%) of our volunteers are currently enrolled students, we are actively working to onboard more immigrant volunteers to diversify perspectives.",
  },
  {
    question:
      "Can I specify what country/city I want to connect with people from?  ",
    answer:
      "Absolutely. Our platform provides dropdown menus that allow you to specify the country and even narrow it down to the city you are interested in connecting with people from. This ensures you receive relevant insights aligned with your study abroad or immigration target location.",
  },
  {
    question: "How are chat partners matched based on my criteria?",
    answer:
      "You will have access to brief profiles of the available chat partners, providing an overview of their background and experiences. Based on these profiles, you can decide whom you would like to initiate a chat with. Additionally, you have the flexibility to engage with multiple chat partners simultaneously.",
  },
  {
    question: "Is it just one-on-one chats or can it be group chats?",
    answer:
      "The chat interactions on our platform are designed to be one-on-one conversations. This allows for more personalized and focused discussions tailored to your specific queries and needs. However, you are not limited to a single chat partner; you can engage with multiple volunteers concurrently.",
  },
  {
    question:
      "Can I ask to be matched with someone studying a specific major/program?",
    answer: `While our platform does not currently offer a direct matching system based on specific academic majors or programs, you can inquire about the college or university your chat partner is attending once the conversation begins. However, we advise against requesting overly personal information that may make volunteers uncomfortable, such as phone numbers, addresses, or current locations. Please be respectful of privacy boundaries.
        What measures are in place to ensure online safety?Your online safety and privacy are of utmost importance to us. All chat data on our platform is securely stored on encrypted servers, ensuring that your conversations remain confidential and inaccessible to unauthorized parties.
        `,
  },
  {
    question: "Will my personal information be visible to chat partners?",
    answer: `To protect your privacy, only your name and profile photo (if you choose to add one) will be visible to the chat partners you connect with. No other personal information will be shared or disclosed without your explicit consent.`,
  },
  {
    question: "How can I report any concerns or issues I experience?",
    answer: `We take any concerns or issues raised by our users very seriously. If you encounter any problems or have any feedback regarding your experience on our platform, please do not hesitate to reach out to us through our "Contact Us" channel. Our team will promptly address your concerns and take appropriate actions.`,
  },
  {
    question: "What are the rules/guidelines for appropriate chat behavior?",
    answer: `To ensure a safe and respectful environment for all users, we have established the following guidelines for appropriate chat behavior:
        Do not ask for or share any personal information, such as phone numbers, addresses, or current locations, without explicit consent from the other party.
        We encourage you to cross-check and verify information provided by volunteers with multiple sources, including online resources, as their answers may be based on personal experiences and perspectives.
        Please be understanding if volunteers take some time to respond, as they are generously offering their assistance on a voluntary basis.
        For your own safety, refrain from sharing any personal information with volunteers during your conversations.
        By adhering to these guidelines, we can maintain a positive and productive environment for everyone on our platform.
        `,
  },
  {
    question: "Can I send images, documents, or links during the chat?",
    answer: `Yes, our platform allows you to share images and documents during your conversations with volunteers. However, we kindly request that you refrain from sharing any inappropriate or offensive content. Similarly, please do not ask volunteers to provide such material, as it goes against our platform's guidelines.`,
  },
  {
    question: "Is there a way to search old chat histories?",
    answer: ` Absolutely. Once you log in to your account on our platform, you will have access to your previous chat histories. These conversations will be saved for a period of 180 days, allowing you to refer back to them as needed.`,
  },
  {
    question: "How do I update my profile information and preferences?",
    answer: `When you first sign up on our platform, you will have the option to provide basic profile information. Subsequently, you can update and modify your profile details and preferences directly through your account settings at any time.`,
  },
  {
    question:
      "Are there any other resources or forums available on the platform?",
    answer: `In addition to our chat feature, our platform offers a range of complementary resources. You will find monthly news updates relevant to the study abroad and immigration domains. Furthermore, we have a dedicated scholarship section where you can explore and apply for various scholarship opportunities.`,
  },
  {
    question: "How can I provide feedback or suggestions for improvement?",
    answer: `We value your feedback and suggestions, as they help us continuously improve our platform and services. If you have any comments, concerns, or ideas for enhancement, please do not hesitate to reach out to us through our "Contact Us" channel. Our team is committed to addressing your feedback promptly and making necessary improvements.`,
  },

  // Add more questions here
];

export default function Questions() {
  const [showAnswers, setShowAnswers] = useState(new Array(5).fill(false)); // Initially show only 5 questions
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("");

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAnswer = (index) => {
    setShowAnswers((prevState) => {
      const newShowAnswers = [...prevState];
      newShowAnswers[index] = !newShowAnswers[index];
      return newShowAnswers;
    });
  };

  const handleViewMore = () => {
    setShowAllQuestions(true);
  };

  const handleViewLess = () => {
    setShowAllQuestions(false);
  };

  return (
    <div className={`bg-gray-100 py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-3xl mx-auto">
        <h1
          className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center `}
        >
          Frequently Asked Questions
        </h1>

        <ul className="space-y-4">
          {(showAllQuestions ? questionsData : questionsData.slice(0, 5)).map(
            (data, index) => (
              <li key={index} className={`bg-white rounded-lg shadow-md`}>
                <div
                  className={`flex justify-between items-center cursor-pointer p-4 `}
                  onClick={() => toggleAnswer(index)}
                >
                  <span className="text-lg md:text-xl font-semibold">
                    {data.question}
                  </span>
                  <span className="text-gray-600">
                    {showAnswers[index] ? "▲" : "▼"}
                  </span>
                </div>
                {showAnswers[index] && (
                  <div className="p-4 text-sm md:text-base">{data.answer}</div>
                )}
              </li>
            )
          )}
        </ul>

        {!showAllQuestions ? (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleViewMore}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              View More
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleViewLess}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              View Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
