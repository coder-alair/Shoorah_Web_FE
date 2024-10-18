import React, { useEffect, useState } from "react";
import RecentPlayCarsouel from "./recentplaycarsouel";
import { Api } from "../../api";
import { errorToast } from "../../utils/helper";
import Loader from "../../component/common/Loader";
import SoundCard from "../reusable/soundCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CategoryFilter from "../reusable/categoryFilter";
import SearchInputField from "../reusable/searchInput";

const MeditationContainer = () => {
  const [sounds, setSounds] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(1);

  const [searchKey, setSearchkey] = useState("");

  const [filterData, setFilterData] = useState([]);
  const [recentPlays, setRecentPlays] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const history = useHistory();

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

  const getMeditationSounds = async () => {
    // if (!category) {
    //   return;
    // }

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

    if (searchKey) {
      console.log("entered");
      Api.getMeditationSounds(page, 10, searchKey, category?._id)
        .then((res) => {
          if (res.data.meta.code == 1) {
            setLoader(false);
            setSounds(res.data.data);
            setFilterData(res.data.data);
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
    } else {
      Api.getMeditationSounds(page, 10, searchKey, category?._id)
        .then((res) => {
          if (res.data.meta.code == 1) {
            setLoader(false);
            setSounds(res.data.data);
            setFilterData(res.data.data);
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
    }
  };

  function setFilters(searchKey) {
    searchKey = searchKey.trim().toLowerCase();
    let data = sounds.filter((i) =>
      i.contentName.toLowerCase().includes(searchKey),
    );
    setFilterData(data);
  }

  useEffect(() => {
    setFilters(searchKey);
  }, [searchKey]);

  const apiCall = async () => {
    await getMeditationSounds();
    getRecentPlay();
  };

  const getRecentPlay = () => {
    setLoader(true);
    Api.getRecentSoundsByType(3)
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
    console.log("hii");
    apiCall();
  }, [refresh]);

  return (
    <div className="mx-auto h-fit w-[100%] p-4 xl:p-5">
      {loader && <Loader />}
      <div className="mx-auto my-4 flex  w-full flex-col justify-around gap-x-10 gap-y-4 xl:my-[4rem] xl:w-[75%] xl:flex-row xl:px-5 ">
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
            type={`3`}
            data={recentPlays}
            viewMore={false}
            heading={`Recent Plays`}
          />
        </div>

        <div className=" lg:mb-[5rem] w-[100%]">
          <RecentPlayCarsouel
            data={filterData}
            viewMore={true}
            type={`3`}
            url={`meditations`}
            heading={`Newly Added`}
          />
        </div>
      </div>
    </div>
  );
};

export default MeditationContainer;
