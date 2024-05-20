'use client'
import { useEffect, useState } from "react"
import { GuestTokenFetchFn, embedDashboard } from "@superset-ui/embedded-sdk"
import axios from "axios"
import Config from './api/config.json'

const App = () => {

    console.log(process.env.SUPERSET_URL);
    const superset = process.env.SUPERSET_URL+"/";
    const getGuestToken: GuestTokenFetchFn = async () => {
        const a = await axios.post(Config.APP_HOST+"/api/gettoken");
        console.log(a);
        return a.data.token;
    }
    useEffect(() => {
        const dashboard = document.getElementById("superset-dashboard-container");
        dashboard!.style.width = '100%';
        dashboard!.style.height = '100%'
        const iframe = {
            width: '100%',
            height: '100%',
            border: 'none'
          }

        embedDashboard(
        {
            id: Config.DASHBOARD_ID, // given by the Superset embedding UI
            supersetDomain: Config.SUPERSET_URL,
            mountPoint: document.getElementById("superset-dashboard-container")!, // html element in which iframe render
            fetchGuestToken : getGuestToken,
            dashboardUiConfig: {
              hideTitle: true,
              hideChartControls: true,
              hideTab: true,
              filters: {
                expanded: false,
              }
            }
        }
          );
      }, []);
    
      return <div id="superset-dashboard-container" />;
}

export default App