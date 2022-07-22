import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
import { store }  from "./store";
import {Provider} from "react-redux";
import { useMediaQuery } from 'react-responsive';
import 'react-notifications/lib/notifications.css';

import {NotificationContainer} from 'react-notifications';

function Index() {
  const [loading, setLoading] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  var colorMode = null;

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  colorMode = localStorage.getItem('color-theme');
  console.log("color mode : ", colorMode);
  console.log("isTabletOrMobile : ", isTabletOrMobile);

  return <>
  {
    loading ? 
    <div className="loader" id="loading_icon_div"
      style={{ background:         
        isTabletOrMobile === true ? 
        (colorMode == null || colorMode == "light")? 
          `url('/images/loader-light.gif') 30% 30% no-repeat #ffffff `
          :
          `url('/images/loader-dark.gif') 30% 30% no-repeat #ffffff `
        :
        (colorMode == null || colorMode == "light")? 
          `url('/images/loader-light.gif') 50% 50% no-repeat #ffffff `
          :
          `url('/images/loader-dark.gif') 50% 50% no-repeat #000000 `
      }}
    ></div> 
    : 
    <Provider store={store}>
      <AppRoutes/>
      <NotificationContainer/>
    </Provider>
  }
  </>;
}

export default Index

ReactDOM.render( 
  <React.StrictMode >
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);