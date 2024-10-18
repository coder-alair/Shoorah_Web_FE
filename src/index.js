import React, { memo, useEffect } from 'react';
import { render } from 'react-dom';
import { Toaster } from 'react-hot-toast';
import './assets/css/index.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Routes from './routes';
import { SidebarProvider } from './context/SidebarContext';
import { ThemeProvider } from './contents/context/themeContext';
import { AudioProvider } from './contents/context/audiobar';

import { UserProvider } from './contents/context/user';
import { Api } from './api';
import { WebSoundProvider } from './contents/context/webSound';



const MainApp = memo(() => {


  return (
    <UserProvider>
      <WebSoundProvider>
        <AudioProvider>
          <ThemeProvider>
            <SidebarProvider>
              <Routes />
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </AudioProvider>
      </WebSoundProvider>
    </UserProvider>
  );
});

const rootElement = document.getElementById('root');

render(<MainApp />, rootElement);
