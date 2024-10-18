import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import CategoryFilter from "../reusable/categoryFilter";
import SearchInputField from "../reusable/searchInput";
import { useTheme } from "../context/themeContext";
import { Api } from "../../api";
import { errorToast, successToast } from "../../utils/helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Loader from "../../component/common/Loader";
import { CONTENT_TYPE } from "../../utils/constants";
import TextCard from "../reusable/textCard";
import AffirmationCard from "../reusable/affirmationCard";

const ShoorahAffirmations = () => {
  const [title, setTitle] = useState("");
  let [searchKey, setSearchkey] = useState("");
  const { theme } = useTheme();
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [shoorahAffirmations, setShoorahAffirmations] = useState([]);
  const [refresh, setRefresh] = useState(1);

  const handleSearchKey = (e) => {
    e.target.value = e.target.value.replace(/^\s+/g, "");
    setSearchkey(e.target.value);
  };

  const handleChange = (e) => {
    if (!e.target.value.replace(/\s/g, "").length) {
      setTitle("");
      return;
    }
    setTitle(e.target.value);
    debouncedTitle(e.target.value);
  };

  const debouncedTitle = debounce(async (value) => {
    setTitle(value);
  }, 10);

  const userActivity = () => {
    let payload = {
      featureType: 1
    }
    Api.userActivityStatus(payload).then((res) => {
      if (res.data.meta.code == 1) {
        console.log("success")
      } else {
        console.log("error");
      }
    }).catch((err) => {
      console.error(err);
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      affirmationId: "",
      title: title,
      imageUrl: null,
      isSaved: true,
      description: "description",
      isImageDeleted: false,
    };

    if (title.length > 0) {
      Api.addAffirmation(payload).then((res) => {
        setLoader(true);
        if (res.status == 200) {
          if (res?.data?.meta?.uploadURL) {
            axios
              .put(res?.data?.meta?.uploadURL)
              .then((res) => {
                if (res.status == 200) {
                  setTitle("");
                  successToast("Your affirmation is added successfully !");
                  history.replace("/journal/affirmation");
                  userActivity();
                  setLoader(false);
                }
              })
              .catch((err) => {
                setTitle("");
                errorToast("Something went wrong with image upload !");
                setLoader(false);
              });
          } else {
            if (res?.data?.meta?.code == 1) {
              setTitle("");
              successToast("Your Affirmation is added successfully.");
              history.replace("/journal/affirmation");
              userActivity();
              setLoader(false);
            } else {
              setTitle("");
              errorToast(res?.data?.meta?.message);
              setLoader(false);
            }
          }
        }
      });
    } else {
      errorToast("Title is required");
    }
  };

  const handleDraft = async (e) => {
    e.preventDefault();
    const payload = {
      affirmationId: "",
      title: title,
      imageUrl: null,
      isSaved: false,
      description: "description",
      isImageDeleted: false,
    };

    if (title.length > 0) {
      Api.addAffirmation(payload).then((res) => {
        setLoader(true);
        if (res.status == 200) {
          if (res?.data?.meta?.uploadURL) {
            axios
              .put(res?.data?.meta?.uploadURL)
              .then((res) => {
                if (res.status == 200) {
                  setTitle("");
                  successToast("Your affirmation is drafted successfully !");
                  history.replace("/journal/affirmation");
                  setLoader(false);
                }
              })
              .catch((err) => {
                setTitle("");
                errorToast("Something went wrong with image upload !");
                setLoader(false);
              });
          } else {
            if (res?.data?.meta?.code == 1) {
              setTitle("");
              successToast("Your Affirmation is drafted successfully.");
              history.replace("/journal/affirmation");
              setLoader(false);
            } else {
              setTitle("");
              errorToast(res?.data?.meta?.message);
              setLoader(false);
            }
          }
        }
      });
    } else {
      errorToast("Title is required");
    }
  };

  const getCategoriesByContentId = () => {
    Api.getCategoryById(2)
      .then((res) => {
        if (res.status == 200) {
          if (res?.data?.meta?.code == 1) {
            setCategories(res?.data?.data);
            setCategory(res?.data?.data[0]);
          } else {
            errorToast(res?.data?.meta?.message);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast("Something went wrong!");
      });
  };

  const getShoorahAffirmation = () => {
    setLoader(true);
    let search = searchKey.toLowerCase();
    if (
      search.startsWith("#") ||
      search.startsWith("(") ||
      search.startsWith(")") ||
      search.startsWith("$")
    ) {
      errorToast(`Special Character not allowed`);
      setLoader(false);
      return;
    }
    Api.getShoorahAffirmation(category._id, 1, 50, searchKey)
      .then((res) => {
        if (res.data.meta.code === 1) {
          setShoorahAffirmations(res.data.data);
          setLoader(false);
        } else {
          setLoader(false);

          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    getCategoriesByContentId();
  }, []);

  useEffect(() => {
    if (category) {
      getShoorahAffirmation();
    }
  }, [category, searchKey]);

  useEffect(() => {
    if (refresh > 1) {
      getShoorahAffirmation();
    }
  }, [refresh]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-4 py-3 xl:px-10">
      {loader && <Loader />}

      <p className="P22Mackinac  w-full text-center text-xl lg:mt-[2rem] lg:px-[5rem] lg:text-3xl">
        Harness the power of positive thinking, manifest your desires, and
        cultivate a mindset of success.
      </p>

      <form onSubmit={handleSubmit} className=" mt-6 w-full xl:mt-[2rem]">
        <input
          id="title"
          name="title"
          value={title}
          maxLength={100}
          type="text"
          onChange={handleChange}
          placeholder="Enter your own Affirmation..."
          style={{
            boxShadow:
              "0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.10)",
          }}
          className={`P22Mackinac placeholder:P22Mackinac relative block w-[100%] appearance-none rounded-2xl border border-gray-300 py-5 pb-12 pl-10 text-base placeholder-[#000] placeholder:text-md placeholder:font-[500] placeholder:tracking-wider xl:rounded-[3rem] xl:text-lg ${theme.shoorah_border_focus_5} focus:outline-none ${theme.shoorah_border_ring_focus_5}`}
        />
        <div className=" mx-auto  mt-4 flex w-[100%]  justify-around gap-4 xl:mt-[3rem] xl:flex-row xl:gap-10 ">
          <button
            onClick={handleDraft}
            className={`w-1/2 border border-transparent bg-[#fff] ${theme.shoorah_bg_hover_6}  P22Mackinac rounded-[3rem] py-2 text-base font-medium text-[#000] shadow-sm hover:text-white focus:outline-none sm:py-3 xl:py-5  xl:text-xl ${theme.shoorah_border_5} `}
          >
            Draft
          </button>
          <button
            type="submit"
            name="submit"
            className={`w-1/2 border border-transparent ${theme.shoorah_bg_5} ${theme.shoorah_bg_hover_6} P22Mackinac rounded-[3rem] py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2  sm:py-5 xl:text-xl ${theme.shoorah_border_ring_focus_5} focus:ring-offset-2`}
          >
            Save
          </button>
        </div>
      </form>

      <p className="P22Mackinac mt-6 w-full text-center text-xl xl:mt-[4rem] xl:text-[3rem]">
        Explore Shoorah Affirmations
      </p>

      <div className="mx-auto mt-4 flex w-[100%] flex-col justify-around gap-4 xl:mt-[1rem] xl:flex-row xl:gap-10  ">
        <CategoryFilter
          apiCall={getShoorahAffirmation}
          setRefresh={setRefresh}
          refresh={refresh}
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
        <SearchInputField
          placeholder={`Search Affirmations here`}
          searchKey={searchKey}
          setSearchKey={setSearchkey}
          handleSearchKey={handleSearchKey}
        />
      </div>

      <div className=" mt-4 min-h-[40rem] w-full">
        {shoorahAffirmations.map((item, index) => (
          <div key={item.id}>
            <AffirmationCard
              index={index}
              data={item}
              id={item.id}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoorahAffirmations;
