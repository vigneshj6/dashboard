'use client'
import { useEffect, useState } from "react"
import { GuestTokenFetchFn, embedDashboard } from "@superset-ui/embedded-sdk"
import axios from "axios"

const App = () => {
    const getGuestToken: GuestTokenFetchFn = async () => {
        const a = await axios.post("http://localhost:3005/api/gettoken");
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
            id: "df6b74e9-e320-461d-87f9-733a349e4b63", // given by the Superset embedding UI
            supersetDomain: "http://localhost:8088",
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