import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, CacheModule } from "@nestjs/common";

import { AppController } from "@/app.controller";
import { UserController } from "@/modules/version1/user.controller";

import { UserAccountEntity } from "@/providers/user_account_entity.providers";

import { AuthService } from "@/services/version1/auth.service";
import config from "@/configs/";

@Module({
  imports: [
    CacheModule.register(config.cache_module_config),
    TypeOrmModule.forRoot({
      ...config.mysql_module_config,
      entities: [UserAccountEntity],
    }),
    TypeOrmModule.forFeature([UserAccountEntity]),
  ],
  controllers: [AppController, UserController],
  providers: [AuthService],
})
export class AppModule {}
