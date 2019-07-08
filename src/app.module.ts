import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolsModule } from './tools/tools.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vuttr:vuttr@cluster0-mndeo.mongodb.net/vuttr?retryWrites=true&w=majority',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
      },
    ),
    ToolsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
