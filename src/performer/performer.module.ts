import { Module } from '@nestjs/common';
import { PerformerService } from './performer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformerEntity } from './performer.entity';
import { PerformerController } from './performer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PerformerEntity])],
  providers: [PerformerService],
  controllers: [PerformerController]
})
export class PerformerModule {}
