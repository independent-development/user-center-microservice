import { InjectRepository } from "@nestjs/typeorm";
/*  prettier-ignore */
import { Controller, Post, Body, Request ,Response, Get } from '@nestjs/common';

import { UserAccountEntity } from "@/providers/user_account_entity.providers";
import { AuthService } from "@/services/version1/auth.service";

@Controller("/v1/user")
export class UserController {
  constructor(
    private auth: AuthService,
    @InjectRepository(UserAccountEntity) private user_account,
  ) {}

  @Post("login")
  async login(@Request() request, @Response({ passthrough: true }) response) {
    const { username, password } = request.body;
    const user_info = await this.user_account.findOneBy({ username });
    if (!user_info) {
      throw new Error("无效的凭据!");
    }
    if (user_info.password !== password) {
      throw new Error("无效的凭据!");
    }
    /** 在缓存中记录用户的信息 **/
    const jwt_string = await this.auth.cacheUserInfoAndReturnAuth(
      username,
      user_info,
    );
    /** 向前端注入cookie **/
    await response.cookie("API_TOKEN", jwt_string, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    /** 返回令牌 **/
    return jwt_string;
  }

  @Post("logout")
  async logout(@Request() request, @Response({ passthrough: true }) response) {
    const { API_TOKEN } = request.cookies;
    /** 根据令牌从缓存获取用户信息 **/
    const auth_info = await this.auth.getAutoInfoByToken(API_TOKEN);
    /** 从缓存删除用户信息 **/
    await this.auth.del(auth_info.username);
    /** 清理前端的cookie **/
    await response.clearCookie("API_TOKEN");
    return true;
  }

  @Post("registry")
  async registry(@Body() request_body) {
    try {
      const { username, password, mobile_phone, e_mail } = request_body;
      /*  prettier-ignore */
      await this.user_account.insert({username,password,mobile_phone,e_mail});
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get("detail")
  async detail(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const auth_info = await this.auth.getAutoInfoByToken(API_TOKEN);
    const user_info = await this.user_account.findOneBy({
      user_id: auth_info.user_id,
      username: auth_info.username,
    });
    return user_info;
  }
}
