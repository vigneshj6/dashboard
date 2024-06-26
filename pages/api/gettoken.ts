// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { error } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
import Config from './config.json'

type Data = {
  token: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const loginResult = await axios.post(Config.SUPERSET_URL+"/api/v1/security/login",{
        "password": "admin",
        "provider": "db",
        "refresh": true,
        "username": "admin"
    });
    console.log(loginResult.data);
    const guestTokenResult = await axios.post(Config.SUPERSET_URL+"/api/v1/security/guest_token",
    {
        "user": {
          "username": "admin",
          "first_name": "Superset",
          "last_name": "Admin"
        },
        "rls": [
        ],
        "resources": [{
          "type": "dashboard",
          "id": Config.DASHBOARD_NUMBER
        }]
    }
    ,
      {
        headers: {Authorization: "Bearer " +loginResult.data.access_token}
      })
    console.log(guestTokenResult.data);
    res.status(200).json(guestTokenResult.data)
}
