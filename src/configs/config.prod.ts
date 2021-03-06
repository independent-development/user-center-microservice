import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as redisStore from "cache-manager-redis-store";

export const jwt_secret = "local_jwt_secret";
export const cache_module_config = {
  store: redisStore,
  host: "redis-prod-mian-001.jnmb39.0001.apse1.cache.amazonaws.com",
  port: 6379,
  ttl: 60 * 60 * 1000,
};
export const mysql_module_config: TypeOrmModuleOptions = {
  port: 3306,
  type: "mysql",
  host: "yogaho-database.cluster-cmlqabuz16ur.ap-southeast-1.rds.amazonaws.com",
  username: "yogaho_admin",
  password: "glyz205070410",
  synchronize: true,
};
