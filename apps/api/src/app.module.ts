import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';
import { VisitsModule } from './visits/visits.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    PrismaModule,   
    UsersModule, 
    LeadsModule, 
    VisitsModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
