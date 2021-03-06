import * as moment from "moment";
import * as jwt from "jsonwebtoken";
import { Inject, Injectable, CACHE_MANAGER } from "@nestjs/common";

import config from "@/configs";

@Injectable()
export class AuthService {
  constructor(@Inject(CACHE_MANAGER) private redis_cache) {}

  async get(username, params?) {
    return await this.redis_cache.get(`user:${username}`, params);
  }

  async set(username, value, params?) {
    return await this.redis_cache.set(`user:${username}`, value, params);
  }

  async del(username) {
    return await this.redis_cache.del(`user:${username}`);
  }

  /** 缓存用户信息并返回令牌信息 **/
  async cacheUserInfoAndReturnAuth(username, user_info) {
    try {
      const login_time = moment().format("YYYY-MM-DD HH:mm:ss");
      const jwt_string = await jwt.sign(
        { user_id: user_info.user_id, username },
        config.jwt_secret,
        { expiresIn: "1 days" },
      );
      await this.set(username, { login_time, ...user_info });
      return jwt_string;
    } catch (error) {
      console.log("error", error);
    }
  }

  /** 根据token令牌获取用户详情 **/
  async getAutoInfoByToken(api_token) {
    const auth_info = await jwt.verify(api_token, config.jwt_secret);
    return auth_info;
  }

  /** 验证jwt令牌 **/
  async jwt_verify(API_TOKEN) {
    const is_verify = await jwt.verify(API_TOKEN, config.jwt_secret);
    if (is_verify) {
      return true;
    }
    return false;
  }
}
