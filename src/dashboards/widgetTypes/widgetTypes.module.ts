import { Module } from '@nestjs/common';
import { WidgetTypesService } from './widgetTypes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WidgetType } from '../entities/widget_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WidgetType])],
  providers: [WidgetTypesService],
  exports: [WidgetTypesService],
})
export class WidgetTypesModule {}
