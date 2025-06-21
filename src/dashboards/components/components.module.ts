import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsService } from './components.service';
import { DashboardComponent } from '../entities/dashboardComponent.entity';
import { DashboardsService } from '../dashboards.service';

@Module({
  imports: [TypeOrmModule.forFeature([DashboardComponent])],
  providers: [ComponentsService, DashboardsService],
  exports: [ComponentsService],
})
export class ComponentsModule {}
