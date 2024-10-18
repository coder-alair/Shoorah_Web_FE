import React, { useEffect, useState } from "react";
import Navbar from "../layout/navbar";
import SideMenu from "../layout/sideMenu";
import Hero from "../reusable/hero";
import Shoorah1 from "../../assets/images/journalBlue.png";
import Shoorah2 from "../../assets/images/journalPink.png";
import Shoorah3 from "../../assets/images/journalOrange.png";
import Shoorah4 from "../../assets/images/journalShoorah.png";
import Shoorah5 from "../../assets/images/journalGreen.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CONTENT_TYPE } from "../../utils/constants";
import TutorialVideo from "../reusable/tutorialVideo";
import Lottie from "lottie-react";
import gratitudeLottie from "../../assets/lottie/lottie_diamond_shape_shoorah.json";
import affirmationLottie from "../../assets/lottie/lottie_circle.json";
import cleanseLottie from "../../assets/lottie/lottie_hexagon.json";
import goalLottie from "../../assets/lottie/lottie_diamond_shape_desert.json";
import notepadLottie from "../../assets/lottie/lottie_star_shape_ocean.json";

import SoundBar from "../reusable/soundBar";
import { useAudio } from "../context/audiobar";
import { getLocalStorageItem } from "../../utils/helper";

const Journals = () => {
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const { audioNav } = useAudio();

  const tabs = [
    {
      name: "Gratitude",
      lottie: gratitudeLottie,
      url: "/journal/gratitude",
    },
    {
      name: "Affirmations",
      lottie: affirmationLottie,
      url: "/journal/affirmation",
    },
    {
      name: "Cleanse",
      lottie: cleanseLottie,
      url: "/journal/cleanse",
    },
    {
      name: "Goals",
      lottie: goalLottie,
      url: "/journal/goals",
    },
    {
      name: "Notepad",
      lottie: notepadLottie,
      url: "/journal/notepad",
    },
  ];

  useEffect(() => {
    if (!getLocalStorageItem("token") && !getLocalStorageItem("userData")) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="relative pb-[13vh] lg:pb-0">
      <Navbar />
      <SideMenu />
      <Hero show={show} setShow={setShow} heading={`Journal`} subhead={``} />
      <TutorialVideo
        title={`Welcome to Journal`}
        show={show}
        setShow={setShow}
        contentType={CONTENT_TYPE[7]}
        descriptionOne={
          "Use our journal feature to practice the art of gratitude, clear unwanted feelings from your life, set goals and help you feel more calm and content."
        }
        descriptionTwo={
          "Whether you're a journaling novice or you've been doing it for years, we'll guide you gently through the process and help you reap the benefits along the way."
        }
      />

      <div
        className={`my-[1rem] md:my-[3rem] ${
          audioNav ? `mb-[8rem]` : `mb-[2rem]  md:mb-[5rem]`
        }   mx-auto grid w-full grid-cols-2 flex-wrap items-center justify-center  gap-x-6  gap-y-6 px-6 xl:flex xl:w-[75%] xl:gap-x-16 xl:gap-y-20  xl:p-5`}
      >
        {tabs.map((tab) => (
          <div
            onClick={() => history.push(`${tab.url}`)}
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-4 xl:w-1/4 xl:gap-8"
            key={tab.name}
          >
            <div
              style={{
                boxShadow:
                  "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
              }}
              className="flex h-[100%] w-[100%] items-center justify-center rounded-2xl border px-3 py-3 xl:rounded-[3rem]"
            >
              <div className="aspect-square w-full">
                <Lottie animationData={tab.lottie} />
              </div>
            </div>
            <div className="P22Mackinac text-lg font-[500] xl:text-3xl">
              {tab.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journals;
