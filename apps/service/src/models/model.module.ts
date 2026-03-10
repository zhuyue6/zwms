import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { RedisService } from "./redis.service";
import { PageService } from "./page.service";
import { ModelService } from "./model.service";

@Global()
@Module({
  exports: [
    PrismaService,
    RedisService,
    PageService,
    ModelService,
  ],
  providers: [
    PrismaService,
    RedisService,
    PageService,
    ModelService,
  ],
})
export class ModelModule {

}