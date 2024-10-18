import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Api } from "../../api";
import { errorToast, setLocalStorageItem } from "../../utils/helper";

const handleGoogleSignIn = () => {
  const provider = new GoogleAuthProvider();

  try {
    signInWithPopup(auth, provider)
      .then((res) => {
        const profile = res.user;
        let user = {
          name: profile.displayName,
          email: profile.email,
          profile: "",
          mobile: profile.phoneNumber,
          is_email_verified: profile.emailVerified,
          socialProfile: profile.photoURL,
          password: null,
          loginType: 2,
          gender: ["0"],
        };

        Api.socialLoginWeb(user)
          .then((response) => {
            if (response?.data?.meta?.code === 1) {
              setLocalStorageItem("token", response?.data?.meta?.token);
              setLocalStorageItem(
                "userData",
                JSON.stringify(response?.data?.data),
              );
              setLocalStorageItem(
                "refreshToken",
                response?.data?.meta?.refreshToken,
              );
              window.location.href = "/home";
            } else if (response?.data?.meta?.code === 0) {
              errorToast(response?.data?.meta?.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err.message));
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

const handleFacebookSignIn = async () => {
  const provider = new FacebookAuthProvider();

  try {
    signInWithPopup(auth, provider)
      .then((res) => {
        const profile = res.user;
        console.log(profile);
        // let user = {
        //     name: profile.displayName,
        //     email: profile.email,
        //     profile: "",
        //     mobile: profile.phoneNumber,
        //     is_email_verified: profile.emailVerified,
        //     socialProfile: profile.photoURL,
        //     password: null,
        //     loginType: 2,
        //     gender: ['0']
        // }

        // Api.socialLoginWeb(user)
        //     .then((response) => {
        //         if (response?.data?.meta?.code === 1) {
        //             setLocalStorageItem('token', response?.data?.meta?.token);
        //             setLocalStorageItem('userData', JSON.stringify(response?.data?.data));
        //             setLocalStorageItem('refreshToken', response?.data?.meta?.refreshToken);
        //             window.location.href='/home';
        //         } else if (response?.data?.meta?.code === 0) {
        //             errorToast(response?.data?.meta?.message);
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.error("Facebook Sign-In Error:", error);
  }
};

const handleAppleSignIn = async () => {
  const provider = new OAuthProvider("apple.com");

  try {
    signInWithPopup(auth, provider).then((res) => {
      // The signed-in user info.
      // const user = result.user;
      console.log("hello");
      const profile = res.user;
      let user = {
        name: profile.displayName,
        email: profile.email,
        profile: "",
        mobile: profile.phoneNumber,
        is_email_verified: profile.emailVerified,
        socialProfile: profile.photoURL,
        password: null,
        loginType: 2,
        gender: ["0"],
      };

      Api.socialLoginWeb(user)
        .then((response) => {
          if (response?.data?.meta?.code === 1) {
            setLocalStorageItem("token", response?.data?.meta?.token);
            setLocalStorageItem(
              "userData",
              JSON.stringify(response?.data?.data),
            );
            setLocalStorageItem(
              "refreshToken",
              response?.data?.meta?.refreshToken,
            );
            window.location.href = "/home";
          } else if (response?.data?.meta?.code === 0) {
            errorToast(response?.data?.meta?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (error) {
    // Handle the error
    console.log("APPLE", error);
  }
};

export { handleGoogleSignIn, handleFacebookSignIn, handleAppleSignIn };
