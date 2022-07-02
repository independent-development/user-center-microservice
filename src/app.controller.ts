import { MessagePattern } from "@nestjs/microservices";
import { Inject, Controller, Get, CACHE_MANAGER } from "@nestjs/common";

@Controller("/api/v1/")
export class AppController {
  constructor(@Inject(CACHE_MANAGER) private redis_cache) {}

  @Get("hello")
  hello() {
    this.redis_cache.set("test", "hello words");
    return "hello words";
  }

  @MessagePattern("test")
  async test() {
    return "this is the test";
  }
}
