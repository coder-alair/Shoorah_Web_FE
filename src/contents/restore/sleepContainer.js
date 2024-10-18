import React, { useEffect, useState } from "react";
import SoundCard from "../reusable/soundCard";
import RecentPlayCarsouel from "./recentplaycarsouel";
import InfiniteScroll from "react-infinite-scroll-component";
import { errorToast } from "../../utils/helper";
import { Api } from "../../api";
import Loader from "../../component/common/Loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CategoryFilter from "../reusable/categoryFilter";
import SearchInputField from "../reusable/searchInput";

const SleepContainer = () => {
  const [loader, setLoader] = useState(false);
  const [sleep, setSleep] = useState([]);
  const [page, setPage] = useState(1);
  const [filterSleep, setFilterSleep] = useState([]);
  const history = useHistory();
  const [recentPlays, setRecentPlays] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [searchKey, setSearchkey] = useState("");
  const [refresh, setRefresh] = useState(1);

  const handleSearchKey = (e) => {
    e.target.value = e.target.value.replace(/^\s+/g, "");
    setSearchkey(e.target.value);
  };

  const getCategoriesByContentId = () => {
    Api.getCategoryById(3)
      .then((res) => {
        if (res.status == 200) {
          if (res?.data?.meta?.code == 1) {
            setCategories(res?.data?.data);
            // setCategory(res?.data?.data[0]);
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

  useEffect(() => {
    getCategoriesByContentId();
  }, []);

  const apiCall = async () => {
    await getSleepSounds();
    getRecentPlay();
  };

  function setFilters(searchKey) {
    searchKey = searchKey.trim().toLowerCase();
    let sleeps = sleep.filter((i) =>
      i.contentName.toLowerCase().includes(searchKey),
    );
    setFilterSleep(sleeps);
  }

  useEffect(() => {
    setFilters(searchKey);
  }, [searchKey]);

  const getSleepSounds = async () => {
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
    Api.getSleepSounds(page, 10, searchKey)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setLoader(false);
          setSleep(res.data.data);
          setFilterSleep(res.data.data);
          // setPage(prevPage => prevPage + 1);
        } else {
          setLoader(false);
          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const getRecentPlay = () => {
    setLoader(true);
    Api.getRecentSoundsByType(4)
      .then((res) => {
        if (res.data.meta.code == 1) {
          setRecentPlays(res.data.data);
          setLoader(false);
        } else {
          setLoader(false);
          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    apiCall();
  }, [category, searchKey]);

  useEffect(() => {
    if (refresh > 1) {
      apiCall();
    }
  }, [refresh]);

  return (
    <div className="mx-auto h-fit w-[100%] p-4 xl:p-5">
      {loader && <Loader />}

      <div className="mx-auto my-4 flex w-full flex-col justify-around gap-x-10 gap-y-4 xl:my-[4rem]  xl:w-[75%] xl:flex-row xl:px-5 ">
        <CategoryFilter
          apiCall={apiCall}
          setRefresh={setRefresh}
          refresh={refresh}
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
        <SearchInputField
          placeholder={`Search sounds here`}
          searchKey={searchKey}
          setSearchKey={setSearchkey}
          handleSearchKey={handleSearchKey}
        />
      </div>

      <div className="mt-6 flex flex-col gap-2 ">
        <div className="w-[100%]">
          <RecentPlayCarsouel
            type={`4`}
            data={recentPlays}
            viewMore={false}
            heading={`Recent Plays`}
          />
        </div>

        <div className=" md:mb-[8rem] w-[100%]">
          <RecentPlayCarsouel
            data={sleep}
            type={`4`}
            viewMore={true}
            url={`sleeps`}
            heading={`Newly Added`}
          />
        </div>
      </div>
    </div>
  );
};

export default SleepContainer;
