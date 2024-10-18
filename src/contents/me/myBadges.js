import React, { Fragment, useEffect, useState } from "react";
import bronze from "../../assets/svg/badges/bronze_badge.png";
import bronzeDisable from "../../assets/svg/badges/bronze_badge_disable.png";
import silver from "../../assets/svg/badges/silver_badge.png";
import silverDisable from "../../assets/svg/badges/silver_badge_disable.png";

import gold from "../../assets/svg/badges/gold_badge.png";
import goldDisable from "../../assets/svg/badges/gold_badge_disable.png";

import platinum from "../../assets/svg/badges/platinum_badge.png";
import platinumDisable from "../../assets/svg/badges/platinum_badge_disable.png";

import daimond from "../../assets/svg/badges/diamond_badge.png";
import daimondDisable from "../../assets/svg/badges/diamond_badge_disable.png";

import shuru from "../../assets/svg/badges/shoorah_guru_badge.png";
import shuruDisable from "../../assets/svg/badges/shoorah_guru_badge_disable.png";

import { Api } from "../../api";
import lockSvg from "../../assets/svg/lock.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../context/user";

const badges = [
  {
    name: "Bronze",
    number: 1,
    colour: `border-[#8B4513]`,
    image: bronze,
    disableImg: bronzeDisable,
  },
  {
    name: "Silver",
    number: 2,
    colour: "border-[#C0C0C0]",
    image: silver,
    disableImg: silverDisable,
  },
  {
    name: "Gold",
    number: 3,
    colour: "border-[#FFD700]",
    image: gold,
    disableImg: goldDisable,
  },
  {
    name: "Platinum",
    number: 4,
    colour: "border-[#BA55D3]",
    image: platinum,
    disableImg: platinumDisable,
  },
  {
    name: "Daimond",
    number: 5,
    colour: "border-[#32CD32]",
    image: daimond,
    disableImg: daimondDisable,
  },
  {
    name: "Shoorah Guru",
    number: 6,
    colour: "border-[#6167e7]",
    image: shuru,
    disableImg: shuruDisable,
  },
];

const MyBadges = () => {
  const [badgesData, setBadgesData] = useState([]);
  const [loader, setLoader] = useState([]);
  const history = useHistory();
  const { user } = useAuth();

  const getBadgeCounts = () => {
    setLoader(true);
    Api.getBadgeCount(user._id)
      .then((res) => {
        const badgesWithCount = badges.map((badge) => {
          const matchingData = res.data.data.find(
            (item) => item.badgeType === badge.number,
          );
          return {
            ...badge,
            badgeCount: matchingData ? matchingData.badgeCount : 0,
          };
        });
        setBadgesData(badgesWithCount);
        setLoader(false);
      })
      .catch((err) => {
        console.log("error in getting badge counts");
        setLoader(false);
      });
  };

  useEffect(() => {
    if (user) {
      getBadgeCounts();
    }
  }, [user]);

  return (
    <div className="md:mt-[1rem]">
      <div className="my-5 px-5">
        <p className="P22Mackinac text-2xl">My Badges</p>
      </div>
      <div className="mb-10 md:my-10 grid w-[90vw] grid-cols-3 flex-wrap items-center justify-evenly gap-5 md:gap-10 xl:flex">
        {badgesData.map((i) => (
          <div
            onClick={() => {
              history.push(`/my-badges?badge=${i.number}`);
            }}
            className="flex cursor-pointer flex-col items-center justify-center gap-5"
            key={i.number}
          >
            <div
              className={`relative flex aspect-square w-full items-center justify-center rounded-full xl:h-[10rem] xl:w-[10rem] `}
            >
              {i.badgeCount != 0 && (
                <img
                  src={i.image}
                  className={`h-[100%] w-[100%] object-cover`}
                />
              )}
              {i.badgeCount == 0 && (
                <img
                  src={i.disableImg}
                  className={`h-[100%] w-[100%] object-cover`}
                />
              )}
              {i.badgeCount == 0 && (
                <img
                  src={lockSvg}
                  className="absolute bottom-[-8px] z-10 h-[2rem] w-[2rem]  rounded-3xl object-cover grayscale"
                />
              )}
              {i.badgeCount != 0 && (
                <div
                  className={`border border-solid ${i.colour} absolute bottom-[-8px] z-10 rounded-3xl bg-white px-5`}
                >
                  {i.badgeCount}
                </div>
              )}
            </div>
            <div className="P22Mackinac text-sm md:text-lg font-medium lg:font-[600]">
              {i.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBadges;
