import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';

// import { DatabaseModule } from './database/database.module';
import { RoleModule } from './module/role/role.module';
import { PostModule } from './module/post/post.module';
import { PostMediaModule } from './module/post-media/post-media.module';
import { CommentModule } from './module/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    RoleModule,
    PostModule,
    PostMediaModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
