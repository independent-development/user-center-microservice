import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as redisStore from "cache-manager-redis-store";

export const jwt_secret = "local_jwt_secret";
export const cache_module_config = {
  store: redisStore,
  host: "localhost",
  port: 6379,
  ttl: 60 * 60 * 1000,
};
export const mysql_module_config: TypeOrmModuleOptions = {
  port: 3306,
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  synchronize: true,
};
