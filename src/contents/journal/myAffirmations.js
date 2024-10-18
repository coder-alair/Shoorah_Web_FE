import React, { useEffect, useState } from "react";
import TextCard from "../reusable/textCard";
import { debounce } from "lodash";
import { useTheme } from "../context/themeContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Api } from "../../api";
import { errorToast, successToast } from "../../utils/helper";
import Loader from "../../component/common/Loader";
import AffirmationCard from "../reusable/affirmationCard";

const MyAffirmations = () => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [affirmation, setAffirmation] = useState([]);
  const { theme } = useTheme();
  const [bookmarkAffirmation, setBookmarkAffirmation] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [filterDrafts, setFilterDrafts] = useState([]);
  let [refresh, setRefresh] = useState(1);

  useEffect(() => {
    apiCall();
  }, [refresh]);

  const apiCall = () => {
    getAffirmation();
    getDrafts();
    getBookmarkedAffirmation();
  };

  const getAffirmation = () => {
    setLoader(true);

    Api.getAffirmations(true, 1, 50)
      .then((res) => {
        if (res?.data?.meta?.code == 1) {
          setAffirmation(res.data.data);
          setFilterData(res.data.data);
          setLoader(false);
        } else {
          setLoader(false);
          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });
  };

  const getDrafts = () => {
    setLoader(true);

    Api.getAffirmations(false, 1, 50)
      .then((res) => {
        if (res?.data?.meta?.code === 9) {
          setLoader(false);
          errorToast(res.data.meta.message);
        } else {
          setDrafts(res.data.data);
          setFilterDrafts(res.data.data);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });
  };

  const getBookmarkedAffirmation = () => {
    setLoader(true);

    Api.getMyBookmarks(2)
      .then((res) => {
        if (res?.data?.meta?.code == 1) {
          setBookmarkAffirmation(res.data.data);
          setLoader(false);
        } else {
          setLoader(false);
          errorToast(res.data.meta.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });
  };

  const handleDelete = (id) => {
    Api.deleteAffirmation(id)
      .then((res) => {
        if (res?.data?.meta?.code === 9) {
          setLoader(false);
          errorToast(res.data.meta.message);
        } else {
          successToast("Affirmation Deleted Successfully");
          apiCall();
          setRefresh(refresh + 1);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });
  };

  return (
    <div className="mx-auto min-h-fit w-full">
      {loader && <Loader />}
      <div className="mx-auto w-full px-4 lg:mt-8 xl:px-0">
        {drafts.length ? (
          <p className="P22Mackinac mt-4 text-xl xl:my-10 xl:mt-0 xl:px-10 xl:text-3xl">
            Drafts
          </p>
        ) : null}

        <div className="py-2 xl:px-10">
          {drafts.map((item, index) => (
            <div key={item.affirmationId}>
              <TextCard
                apiCall={apiCall}
                title={item.title}
                url={"/journal/edit-affirmation"}
                index={index}
                data={item}
                image={item.imageUrl}
                id={item.affirmationId}
                handleDel={handleDelete}
                date={item.createdOn}
                del={true}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full px-4 lg:mt-8 xl:px-0">
        {affirmation.length ? (
          <p className="P22Mackinac mt-4 text-xl xl:my-10 xl:mt-0 xl:px-10 xl:text-3xl">
            My Affirmations
          </p>
        ) : null}

        <div className="py-2 xl:px-10 ">
          {affirmation.map((item, index) => (
            <div key={item.affirmationId}>
              <TextCard
                apiCall={apiCall}
                title={item.title}
                url={"/journal/edit-affirmation"}
                index={index}
                data={item}
                image={item.imageUrl}
                id={item.affirmationId}
                handleDel={handleDelete}
                date={item.createdOn}
                del={true}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </div>
          ))}
          {bookmarkAffirmation.map((item, index) => (
            <div key={item.contentId}>
              <AffirmationCard
                bookmarked={true}
                index={index}
                data={item}
                id={item.contentId}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <div className='w-full mx-auto'>

                {bookmarkAffirmation.length ? <p className='text-3xl px-10 P22Mackinac my-10'>My Bookmarked Affirmations</p> : null}

                <div className='px-10 py-2'>
                    {bookmarkAffirmation.map((item, index) =>
                        <div key={item.contentId}>
                            <AffirmationCard bookmarked={true} index={index} data={item} id={item.contentId} setRefresh={setRefresh} refresh={refresh} />
                        </div>
                    )}
                </div>

            </div> */}

      {!affirmation.length && !bookmarkAffirmation.length && (
        <div className="mb-10 mt-5 h-[10vh] ">
          <p className="P22Mackinac ml-5 text-2xl">No Affirmation</p>
        </div>
      )}
    </div>
  );
};

export default MyAffirmations;
