import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsService } from './components.service';
import { DashboardComponent } from '../entities/dashboardComponent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DashboardComponent])],
  providers: [ComponentsService],
  exports: [ComponentsService],
})
export class ComponentsModule {}
