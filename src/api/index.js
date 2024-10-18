import axios from "axios";
import {
  cleanLocalStorage,
  errorToast,
  getJWTToken,
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/helper";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://staging-api.shoorah.io/api/v1";

const GetApi = (tag = "", isHeader = false) => {
  return axios
    .get(BASE_URL + tag, {
      headers: isHeader
        ? {
          Authorization: getJWTToken(),
          deviceType: 3,
        }
        : {},
    })
    .then((data) => {
      if (data.status === 200) {
        return data;
      } else {
        return data;
      }
    })
    .catch(async (e) => {
      ErrorHandler(e);
    });
};

const PostApi = (tag = "", reqBody, isHeader = false, flag) => {
  let flagCheck = flag
    ? "multipart/form-data; boundary=----WebKitFormBoundaryueI4YvrqiXxUgVGA"
    : "application/json";

  return axios
    .post(BASE_URL + tag, reqBody, {
      headers: isHeader
        ? {
          "Content-Type": flagCheck,
          accept: "application/json",
          devicetoken: "device",
          devicetype: 3,
          Authorization: getJWTToken(),
        }
        : {},
    })
    .then((data) => {
      if (data.status === 200) {
        return data;
      } else {
        return data;
      }
    })
    .catch(async (e) => {
      ErrorHandler(e);
    });
};

const DeleteApi = (tag = "", isHeader = false) => {
  return axios
    .delete(BASE_URL + tag, {
      headers: isHeader
        ? {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: getJWTToken(),
          deviceToken: "device",
          deviceType: 3,
        }
        : {},
    })
    .then((data) => {
      if (data.status === 200) {
        return data;
      } else {
        return data;
      }
    })
    .catch(async (e) => {
      ErrorHandler(e);
    });
};

const PutApi = (tag = "", reqBody, isHeader) => {
  const headers = {
    accept: "application/json",
    Authorization: getJWTToken(),
    deviceType: 3,
  };
  return axios
    .put(BASE_URL + tag, reqBody !== null && reqBody, {
      headers: isHeader ? headers : {},
    })
    .then((data) => {
      if (data.status === 200) {
        return data;
      } else {
        return data;
      }
    })
    .catch(async (e) => {
      ErrorHandler(e);
    });
};

const ErrorHandler = async (e) => {
  if (e.response?.data?.message) {
    if (e.response?.data?.code === 498) {
      RefreshToken();
    } else if (e.response?.data?.code === 401) {
      errorToast(e.response?.data?.message);
      cleanLocalStorage();
      window.location.href = "/login";
    } else {
      errorToast(e.response?.data?.message);
    }
  } else {
    errorToast("Something went wrong");
  }
};

const RefreshToken = async () => {
  await axios
    .post(
      `${BASE_URL}/refresh-token`,
      {},
      { headers: { "refresh-token": getLocalStorageItem("refreshToken") } },
    )
    .then(async (response) => {
      if (response.data.meta.code === 1) {
        setLocalStorageItem("token", response.data.meta.token);
        window.location.reload();
      }
    })
    .catch(async (error) => {
      if (error.response.data.code === 401) {
        await Api.logoutUser();
        cleanLocalStorage();
        window.location.href = "/login";
      } else {
        cleanLocalStorage();
        window.location.href = "/login";
      }
    });
};

export const Api = {
  //LRF FLOW APIs
  login: (reqBody) => PostApi("/login", reqBody, true),
  forgotPassword: (reqBody) => PostApi("/forgot-password-user", reqBody, true),
  resetPassword: (reqBody) => PostApi("/reset-password", reqBody, true),
  changePassword: (reqBody) => PostApi("/change-password", reqBody, true),

  addEditDeviceToken: () => PostApi("/device-token", {}, true),

  // logout
  logoutUser: () => DeleteApi(`/device-token`, {}, true),

  // web api's

  // rituals

  getUserRituals: () => GetApi(`/my-rituals`, true),
  getRitualStatus: () => GetApi(`/my-rituals-status`, true),
  updateUserRituals: (reqBody) => PostApi(`/my-rituals-status`, reqBody, true),
  getShooraRituals: (page, perPage, categoryId, searchKey) =>
    GetApi(
      `/rituals?page=${page}&perPage=${perPage}${categoryId ? `&categoryId=${categoryId}` : ""
      }${searchKey ? `&searchKey=${searchKey}` : ``}`,
      true,
    ),
  addToMyRituals: (reqBody) => PostApi(`/my-rituals`, reqBody, true),
  deleteMyRitual: (id) => DeleteApi(`/my-rituals?ritualId=${id}`, true),

  getTutorialByType: (id) =>
    GetApi(`/tutorial-video?contentType=${id}`, {}, true),

  getSoundById: (contentType, id) =>
    GetApi(`/sound/${contentType}/${id}`, true),

  getBadgeCount: (id) => GetApi(`/badge-count?userId=${id}`, true),

  // trending
  getTrendings: () => GetApi(`/trendings`, true),
  getTrendingsByContentType: (contentType) =>
    GetApi(`/getTrendingByContentType?contentType=${contentType}`, true),
  addToTrendings: (reqBody) => PostApi(`/trendings`, reqBody, true),

  // bookmarks
  getMyBookmarks: (typeId) => GetApi(`/bookmarks?contentType=${typeId}`, true),
  getAllMyBookmarks: (page, perPage) =>
    GetApi(`/all-bookmarks?page=${page}&perPage=${perPage}`, true),
  removeMyBookmark: (bookmarkId) =>
    DeleteApi(`/bookmarks?bookmarkId=${bookmarkId}`, true),
  saveAffirmationToBookmarks: (reqBody) => PostApi(`/bookmarks`, reqBody, true),
  saveToBookmarks: (reqBody) => PostApi(`/bookmarks`, reqBody, true),

  // gratitude
  addGratitude: (reqBody) => PostApi(`/my-gratitude`, reqBody, true),
  getGratitudeList: (isSaved, page, perPage, searchKey) =>
    GetApi(
      `/my-gratitude?isSaved=${isSaved}&page=${page}&perPage=${perPage} ${searchKey ? `&searchKey=${searchKey}` : ``
      }`,
      true,
    ),
  deleteGratitude: (id) =>
    DeleteApi(`/my-gratitude?userGratitudeId=${id}`, true),

  // affirmation
  getTodayAffirmation: () => GetApi(`/today-affirmation`, true),
  addAffirmation: (reqBody) => PostApi(`/user-affirmation`, reqBody, true),
  deleteAffirmation: (id) =>
    DeleteApi(`/user-affirmation?affirmationId=${id}`, true),
  getAffirmations: (isSaved, page, perPage, searchKey) =>
    GetApi(
      `/user-affirmation?isSaved=${isSaved}&page=${page}&perPage=${perPage} ${searchKey ? `&searchKey=${searchKey}` : ``
      }`,
      true,
    ),

  // notifications
  getAllNotifications: (page, perPage, searchKey) =>
    GetApi(
      `/notification?page=${page}&perPage=${perPage}&searchKey=${searchKey}`,
      true,
    ),

  deleteNotification: (notificationId) =>
    DeleteApi(`/notification?notificationId=${notificationId}`, true),
  getUnreadNotificationCount: () => GetApi("/unread-notification-count", true),

  // sound list
  getSoundList: () => GetApi(`/restore/sounds`, true),

  // auth
  socialLoginWeb: (reqBody) => PostApi(`/social-login-web`, reqBody, true),
  userEmailPhoneLogIn: (reqBody) =>
    PostApi(`/userEmailPhoneLogIn`, reqBody, true),

  userEmailPhoneSignUp: (reqBody) => PostApi(`/signup`, reqBody, true),
  userEmailPhoneSignUpOtp: (reqBody) => PostApi(`/verify-otp`, reqBody, true),

  // cleanse

  getCleanseList: (isSaved, page, perPage, searchKey) =>
    GetApi(
      `/cleanse?isSaved=${isSaved}&page=${page}&perPage=${perPage} ${searchKey ? `&searchKey=${searchKey}` : ``
      }`,
      true,
    ),
  addCleanse: (reqBody) => PostApi(`/cleanse`, reqBody, true),
  deleteCleanse: (id) => DeleteApi(`/cleanse?cleanseId=${id}`, true),

  // notepad
  getNotesList: (isSaved, page, perPage, searchKey) =>
    GetApi(
      `/notes?isSaved=${isSaved}&page=${page}&perPage=${perPage} ${searchKey ? `&searchKey=${searchKey}` : ``
      }`,
      true,
    ),
  addNote: (reqBody) => PostApi(`/notes`, reqBody, true),
  deleteNote: (notesId) => DeleteApi(`/notes?notesId=${notesId}`, true),

  // Goals
  getGoals: (page, perPage, isCompleted, searchKey) =>
    GetApi(
      `/goals?page=${page}&perPage=${perPage}&isCompleted=${isCompleted}${searchKey ? `&searchKey=${searchKey}` : ``
      }`,
      true,
    ),
  addGoal: (reqBody) => PostApi(`/goals`, reqBody, true),
  getDraftGoals: () => GetApi(`/draft-goals`, true),
  deleteGoal: (id) => DeleteApi(`/goals?goalId=${id}`, true),

  // Badges
  badgeCount: (userId) => GetApi(`/badge-count?userId=${userId}`, true),
  badgeInfo: (type) => GetApi(`/badge/${type}`, true),

  // mood
  addEditMood: (reqBody) => PostApi(`/mood`, reqBody, true),
  getTodayMood: () => GetApi(`/today-mood`, true),
  getMoodData: (reportType, startDate) =>
    GetApi(
      `/mood?${startDate ? `reportFromDate=${startDate}` : ""
      }&reportType=${reportType}`,
      true,
    ),
  downloadMoodData: (typeId, reportFromDate, reportToDate) =>
    GetApi(
      `/mood-report?${typeId !== 3
        ? `reportType=${typeId}`
        : `reportType=${typeId}&reportFromDate=${reportFromDate}&reportToDate=${reportToDate} `
      }`,
      true,
    ),
  addEditProfessionalMood: (reqBody) =>
    PostApi(`/professional-mood`, reqBody, true),
  getTodayProfessionalMood: () => GetApi(`/today-professional-mood`, true),
  getProfessionalMoodData: (reportType, startDate) =>
    GetApi(
      `/professional-mood?${startDate ? `reportFromDate=${startDate}` : ""
      }&reportType=${reportType}`,
      true,
    ),
  downloadProfessionalMoodData: (typeId) =>
    GetApi(`/professional-mood-report?reportType=${typeId}`, true),

  // user detail
  updateUserProfile: (reqBody) => PutApi(`/user`, reqBody, true),
  updateUserWebProfile: (reqBody) => PutApi(`/user-update`, reqBody, true),

  getUserProfile: (id) => GetApi(`/user/${id}`, true),
  deleteLoggedInUser: () => DeleteApi(`/delete-account`, true),
  getCurrentPlan: () => GetApi(`/user-subscription-status`, true),

  // focuses
  getFocusNamesList: (type) => GetApi(`/focus/${type}`, true),
  addEditFocus: (reqBody) => PostApi(`/user-interest`, reqBody, true),
  getMyFocuses: (type) => GetApi(`/myfocuses/${type}`, true),

  // terms
  getCmsPage: (page) => GetApi(`/cms?cmsAlias=${page}`, true),

  // user sos clicks
  sosClick: (type) => PostApi(`/user/sos/${type}`, {}, true),

  // meditation and sound
  getRecentSoundsByType: (type) =>
    GetApi(`/recently-played?contentType=${type}`, true),
  getMeditationSounds: (page, perPage, searchKey, categoryId) => {
    return GetApi(
      `/restore/meditations?page=${page}&perPage=${perPage}${categoryId ? `&categoryId=${categoryId}` : ""
      }${searchKey ? `&searchKey=${searchKey}` : ``}`,
      true,
    );
  },
  getSleepSounds: (page, perPage, searchKey, categoryId) =>
    GetApi(
      `/restore/sounds?page=${page}&perPage=${perPage} ${searchKey ? `&searchKey=${searchKey}` : ``
      }${categoryId ? `&categoryId=${categoryId}` : ``}`,
      true,
    ),

  // explore
  getExploreList: () => GetApi(`/explore`, true),

  // shoorah pods
  getShoorahPods: (page, perPage, searchKey, categoryId) =>
    GetApi(
      `/shoorah-pods?page=${page}&perPage=${perPage}&${categoryId ? `categoryId=${categoryId}` : ""
      }${searchKey ? `&searchKey=${searchKey}` : ``}`,
      true,
    ),

  // shuru chat bot
  shuruGetMood: () => GetApi(`/get-mood`, true),
  shuruSetMood: (reqBody) => PostApi(`/set-mood`, reqBody, true),
  shuruGetMoodRecord: (page_number, limit, start_date, end_date) =>
    GetApi(
      `/mood-record?page_number=${page_number}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`,
      true,
    ),
  shuruGetHistory: (page_number, limit, start_date, end_date) =>
    GetApi(
      `/get-history?page_number=${page_number}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`,
      true,
    ),
  shuruGetTimeSpent: (page_number, limit, start_date, end_date) =>
    GetApi(
      `/time-spent?page_number=${page_number}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`,
      true,
    ),
  shuruGetUserMood: (page_number, limit, start_date, end_date) =>
    GetApi(
      `/get-user-mood?page_number=${page_number}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`,
      true,
    ),
  shuruChatSession: (page_number, limit, start_date, end_date) =>
    GetApi(
      `/chat-session?page_number=${page_number}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`,
      true,
    ),
  shuruGetSession: () => GetApi(`/get-session`, true),
  shuruAsk: (reqBody) => PostApi(`/ask`, reqBody, true),
  downloadShuruReport: (typeId, reportFromDate, reportToDate) =>
    GetApi(
      `/shuru-mood-report?${typeId !== 3
        ? `reportType=${typeId}`
        : `reportType=${typeId}&reportFromDate=${reportFromDate}&reportToDate=${reportToDate} `
      }`,
      true,
    ),

  getUserConsistency: () => GetApi("/user-consistency", true),
  addToRecentPlay: (reqBody) => PostApi(`/recently-played`, reqBody, true),

  getShoorahAffirmation: (categoryId, page, perPage, searchKey) =>
    GetApi(
      `/shoorah-affirmation?categoryId=${categoryId}&page=${page}&perPage=${perPage}${searchKey ? `&searchKey=${searchKey}` : ``
      }`,
      true,
    ),
  getDraftRituals: (page, perPage) =>
    GetApi(`/user-ritual-drafts?page=${page}&perPage=${perPage}`, true),
  addEditCustomRitual: (reqBody) => PostApi(`/user-ritual`, reqBody, true),
  getCategoryById: (id) => GetApi(`/getCategoriesByContentId/${id}`, true),
  userUpdate: (reqBody) => PutApi(`/user-update`, reqBody, true),

  // purchase api
  buySubscription: (reqBody) => PostApi(`/get-stripe-payment`, reqBody, true),
  freeSubscription: (reqBody) => PostApi(`/free-subscription`, reqBody, true),


  //onboard status
  putOnboardStatus: (reqBody) => PutApi(`/onboard-steps`, reqBody, true),

  // user activity status
  userActivityStatus: (reqBody) => PostApi(`/user-activity-count`, reqBody, true),


  // unread notifications
  unreadNotifications: () => GetApi(`/unread-notification-count`, true),


};
