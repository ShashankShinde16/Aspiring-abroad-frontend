import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import MainScreen from "./mainScreen";
import Volunteers from "./Volunteers";
import Questions from "./Questions";
import Footer from "./footer";
import DialogButton from "./dialogButton";
import DialogBox from "./DialogBox";
import Graph from "./Graph";
import ContactPage from "./ContactPage";
import { Helmet } from "react-helmet";
import wavy from "../../assets/wavy.jpeg";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  useEffect(() => {
    let intervalId;

    if (showChat) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(() => {
        toggleChat();
      }, 20000);
    }

    return () => clearInterval(intervalId);
  }, [showChat]);

  const backgroundImage = {
    backgroundImage: `url(${wavy})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    top: 0,
  };

  return (
    <div>
      <Helmet>
        <title>Study Abroad Programs - Aspiring Abroad</title>
        <meta
          name="description"
          content="Explore our comprehensive study abroad programs and discover opportunities to pursue your education internationally. Learn about scholarships, application procedures, and more at Aspiring Abroad."
        />
        <meta
          name="keywords"
          content="study abroad,Study abroad programs, international education, scholarships, foreign study, overseas education"
        />
        <link rel="preload" href={wavy} as="image" />
      </Helmet>

      <MainScreen />

      <chatButton/>
      <Graph />

      <Volunteers />
      {/* <div className="text-5xl sm:text-9xl font-bold relative" style={{ backgroundImage: `url('https://img.freepik.com/free-photo/top-view-monochromatic-pattern_23-2148770327.jpg?t=st=1713784480~exp=1713788080~hmac=f957d226452a10b675ba666592a5782a958d219f10dc1f2eed70000265aa7e45&w=1800')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}> */}

      <header className="text-center">
        <div className="text-5xl sm:text-9xl font-bold relative bg-gray-200 ">
          <div
            to="/"
            style={backgroundImage}
            className="text-transparent bg-clip-text bg- block py-3 "
          >
            Aspiring Dreams
          </div>
        </div>
      </header>

      <Questions />
      <ContactPage />
      <Footer />
      {!isLoggedIn &&
        (showChat ? (
          <div>
            <DialogBox onClose={toggleChat} />
            <DialogButton onClick={toggleChat} />
          </div>
        ) : (
          <DialogButton onClick={toggleChat} />
        ))}
    </div>
  );
}
