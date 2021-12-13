import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface IAccessTokenResponse {
  access_token: string;
}

interface IOwnerResponse {
  login: string,
  email: string,
  name: string
}

class AuthOwnerService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id : process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      },
    });

    const response = await axios.get<IOwnerResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      },
    });

    const { login, email, name } = response.data;

    let owner = await prismaClient.owner.findFirst({
      where: {
        login_id: login
      }
    })

    if (!owner) {
      owner = await prismaClient.owner.create({
        data: {
          login_id: login,
          email,
          name
        }
      })
    }
    const token = sign(
      {
        owner: {
          name: owner.name,
          login: owner.login_id,
          email: owner.email
        }
      },
      process.env.JWT_SECRET,
      {
        subject: owner.id,
        expiresIn: "2d"
      }
    )

    return { token, owner };
  }
}

export { AuthOwnerService }