import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard } from './entities/dashboard.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DashboardComponent } from './entities/dashboardComponent.entity';
import { WidgetType } from './entities/widget_type.entity';
import { WidgetTypesService } from './widgetTypes/widgetTypes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dashboard, DashboardComponent, WidgetType]),
    AuthModule,
  ],
  controllers: [DashboardsController],
  providers: [DashboardsService, WidgetTypesService],
  exports: [DashboardsService],
})
export class DashboardsModule {}
