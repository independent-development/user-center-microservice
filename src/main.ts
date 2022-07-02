import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppModule } from "@/app.module";
import { UserGuard } from "@/guards/user_guard.guard";
import { ErrorExceptionFilter } from "@/filters/error.filter";
import { ResponseInterceptor } from "@/interceptors/response.interceptor";

/** 创建http接口服务 **/
async function bootstrapHttpServer() {
  const app = await NestFactory.create(AppModule);
  await app.setGlobalPrefix("api");
  await app.useGlobalGuards(new UserGuard());
  await app.useGlobalFilters(new ErrorExceptionFilter());
  await app.useGlobalInterceptors(new ResponseInterceptor());
  await app.use(cookieParser());
  await app.listen(3200);
}

/** 创建tcp接口服务 **/
async function bootstrapMicroservice() {
  const app = await NestFactory.createMicroservice(AppModule, {
    options: { host: "0.0.0.0", port: 5050 },
  });
  await app.useGlobalGuards(new UserGuard());
  await app.useGlobalFilters(new ErrorExceptionFilter());
  await app.listen();
}

(async () => {
  await bootstrapHttpServer();
  await bootstrapMicroservice();
})();
