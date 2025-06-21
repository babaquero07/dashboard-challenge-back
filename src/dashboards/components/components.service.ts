import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardComponent } from '../entities/dashboardComponent.entity';
import { DashboardComponentDto } from './dto/dashboard-component.dto';
import { DashboardsService } from '../dashboards.service';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(DashboardComponent)
    private dashboardComponentRepository: Repository<DashboardComponent>,

    private dashboardsService: DashboardsService,
  ) {}

  async createComponent(
    dashboardId: number,
    createComponentDto: DashboardComponentDto,
  ) {
    const { widgetTypeId, ...componentData } = createComponentDto;

    const dashboard = await this.dashboardsService.findOne(dashboardId);

    try {
      const component = this.dashboardComponentRepository.create({
        ...componentData,
        dashboard: { id: dashboard.id },
        widgetType: { id: widgetTypeId },
      });
      await this.dashboardComponentRepository.save(component);

      return component;
    } catch (error) {
      console.log('🚀 ~ ComponentsService ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }
}
