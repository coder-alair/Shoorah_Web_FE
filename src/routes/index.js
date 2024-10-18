import React, { lazy, memo, Suspense, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import RoutesFile from "../routes/RouteFile";
import Loader from "../component/common/Loader";
import PropTypes from "prop-types";
import Login from "../container/Login";
// import SoundBar from '../contents/reusable/soundBar';
import { useAudio } from "../contents/context/audiobar";
import { useTheme } from "../contents/context/themeContext";
import { Api } from "../api";
import { useWebSound } from "../contents/context/webSound";
import shoorah from "../assets/audio/shoorah.mp3";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const NotFound = lazy(() => import("../container/404NotFound"));

const RoutesList = memo(() => {
  const { theme } = useTheme();
  const { setTheme, SoundBar, audioNav, audio } = useAudio();
  const {
    setIsPlaying,
    isPlaying,
    SoundBar: WebSound,
    audio: sound,
  } = useWebSound();

  useEffect(() => {
    setTheme(theme);
  }, []);

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  return (
    <div className=" lg:mb-0">
      <Router>
        {audioNav && <SoundBar sound={audio} />}
        {window.location.pathname == "/personalize" && (
          <WebSound sound={sound} />
        )}
        <Suspense fallback={<Loader />}>
          <Switch>
            {RoutesFile.map((itm, key) =>
            (
              <Route
                key={key}
                exact={itm.exact}
                path={itm.path}
                name={itm.name}
                component={itm.component}
              />
            ),
            )}
            <Route exact path="/">
              <Redirect to="/login" component={Login} />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
});

RoutesList.propTypes = {
  isShow: PropTypes.any,
  setShow: PropTypes.any,
};

export default RoutesList;
