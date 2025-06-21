import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WidgetType } from '../entities/widget_type.entity';
import { CreateWidgetTypeDto } from './dto/create-widget-type.dto';

@Injectable()
export class WidgetTypesService {
  constructor(
    @InjectRepository(WidgetType)
    private widgetTypeRepository: Repository<WidgetType>,
  ) {}

  async createWidgetType(createWidgetTypeDto: CreateWidgetTypeDto) {
    try {
      const widgetType = this.widgetTypeRepository.create(createWidgetTypeDto);
      await this.widgetTypeRepository.save(widgetType);

      return widgetType;
    } catch (error) {
      console.log('🚀 ~ WidgetTypesService ~ createWidgetType ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }

  async getAllWidgetTypes() {
    try {
      const widgetTypes = await this.widgetTypeRepository.find();
      return widgetTypes;
    } catch (error) {
      console.log(
        '🚀 ~ WidgetTypesService ~ getAllWidgetTypes ~ error:',
        error,
      );
      throw new InternalServerErrorException(error);
    }
  }
}
