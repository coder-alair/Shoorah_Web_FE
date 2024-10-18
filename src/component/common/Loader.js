import { SidebarContext } from '../../context/SidebarContext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../contents/context/themeContext';

const Loader = () => {
  const { isShow } = useContext(SidebarContext);
  const location = useLocation();
  const {theme}=useTheme();

  return (
    <div
      className={`${isShow && !['/login', '/reset-password', '/forgot-password']?.includes(location?.pathname)
          ? 'left-[246px]'
          : 'left-0'
        } z-30 flex items-center fixed top-0 right-0 bottom-0 bg-opacity-90 justify-center p-5 bg-gray-100`}
    >
      <div className='flex space-x-2 animate-pulse'>
        <div className={`w-3 h-3 ${theme.shoorah_bg_5} rounded-full`}></div>
        <div className={`w-3 h-3 ${theme.shoorah_bg_4} rounded-full`}></div>
        <div className={`w-3 h-3 ${theme.shoorah_bg_5} rounded-full`}></div>
      </div>
    </div>
  );
};

export default Loader;
