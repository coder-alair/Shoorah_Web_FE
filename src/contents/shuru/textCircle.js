import React, { useEffect, useState } from "react";
import "../../assets/css/textCarsouel.css";
import { useTheme } from "../context/themeContext";

const TextCircle = ({ userMoodRecords }) => {
  const { theme } = useTheme();

  const [userData, setData] = useState([]);

  const findPercentMood = (id) => {
    if (userMoodRecords.length) {
      const a = userMoodRecords.find((i) => {
        return i.moodId == id;
      });
      if (!a) {
        return `0`;
      }
      if (a) {
        return a.roundedPercentage;
      }
    }
    return 0;
  };

  const getAllPercentages = () => {
    const moodIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const moods = [];
    for (const id of moodIds) {
      let obj = findPercentMood(id);
      moods.push(obj);
    }
    setData(moods);
  };

  useEffect(() => {
    getAllPercentages();
  }, [userMoodRecords]);

  const [state, setState] = useState({
    carouselDeg: 17,
    itemDeg: -17,
    centerItem: 0,
    prevItem: 8,
    lastItem: 8,
    nextItem: 1,
    carousel: [
      { shuru: theme.shuruAngry, id: 1, position: 1, name: "Angry" },
      { shuru: theme.shuruAnxious, id: 2, position: 2, name: "Anxious" },
      { shuru: theme.shuruContent, id: 3, position: 3, name: "Content" },
      { shuru: theme.shuruExcited, id: 4, position: 4, name: "Excited" },
      { shuru: theme.shuruStressed, id: 5, position: 5, name: "Stress" },
      { shuru: theme.shuruHappy, id: 6, position: 6, name: "Happy" },
      { shuru: theme.shuruSad, id: 7, position: 7, name: "Sad" },
      { shuru: theme.shuruSurprised, id: 8, position: 8, name: "Surprised" },
      { shuru: theme.shuruTired, id: 9, position: 9, name: "Tired" },
    ],
  });

  const getIdItems = (side) => {
    // true = next, false = prev
    const { nextItem, prevItem, lastItem } = state;

    if (side) {
      setState(
        {
          ...state,
          centerItem: nextItem,
        },
        () => prevNext(state.centerItem),
      );
    } else {
      setState(
        {
          ...state,
          centerItem: prevItem,
        },
        () => prevNext(state.centerItem),
      );
    }

    const prevNext = (itemId) => {
      if (itemId === lastItem) {
        setState({
          ...state,
          nextItem: 0,
          prevItem: lastItem - 1,
        });
      } else if (itemId === 0) {
        setState({
          ...state,
          prevItem: lastItem,
          nextItem: 1,
        });
      } else {
        setState((state) => ({
          ...state,
          nextItem: state.centerItem + 1,
          prevItem: state.centerItem - 1,
        }));
      }
    };
  };

  const next = () => {
    getIdItems(true);
    setState((state) => ({
      ...state,
      carouselDeg: state.carouselDeg - 36,
      itemDeg: state.itemDeg + 36,
    }));
  };

  const prev = () => {
    getIdItems(false);
    setState((state) => ({
      ...state,
      carouselDeg: state.carouselDeg + 36,
      itemDeg: state.itemDeg - 36,
    }));
  };

  const getCssClass = (id) => {
    const { centerItem, nextItem, prevItem } = state;

    if (id === centerItem) {
      return "active";
    } else if (id === nextItem) {
      return "next";
    } else if (id === prevItem) {
      return "prev";
    }
  };

  // 36

  return (
    <>
      <div className="grid w-full grid-cols-3 gap-4 bg-white px-1 py-4 lg:hidden">
        {state.carousel.map((item, index) => (
          <div
            className={`flex w-full flex-col items-center justify-center`}
            key={item.id}
            id={item.id}
          >
            <div
              className={`${theme.shoorah_bg_2} flex aspect-square w-[80%] items-center justify-center rounded-full p-4`}
            >
              <img
                src={
                  theme[
                    "shuru" + item.name + (item.name == "Stress" ? "ed" : "")
                  ]
                }
                className="h-full w-full"
              />
            </div>
            <p className="P22Mackinac mt-2 text-base font-medium">
              {userData[item.id - 1]}%
            </p>
            <p className="P22Mackinac text-md">'{item.name}'</p>
          </div>
        ))}
      </div>
      <div className="absolute hidden h-[100%] w-[80%] lg:block">
        {/* <button onClick={next}>Next</button>
            <button onClick={prev}>Prev</button> */}
        <div
          className="textCarsouel"
          style={{ transform: `rotate(${state.carouselDeg}deg)` }}
        >
          {state.carousel.map((item, index) => (
            <div
              className={`item-textCarsouel flex flex-col ${getCssClass(
                index,
              )}`}
              key={item.id}
              id={item.id}
              style={{ transform: `rotate(${state.itemDeg}deg)` }}
            >
              <p className="P22Mackinac text-lg font-medium">
                {userData[item.id - 1]}%
              </p>
              <p className="P22Mackinac text-md">'{item.name}'</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TextCircle;
