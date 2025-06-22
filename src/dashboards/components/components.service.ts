import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardComponent } from '../entities/dashboardComponent.entity';
import { DashboardComponentDto } from './dto/dashboard-component.dto';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(DashboardComponent)
    private dashboardComponentRepository: Repository<DashboardComponent>,
  ) {}

  async createComponent(dashboardComponents: DashboardComponentDto[]) {
    try {
      const components = this.dashboardComponentRepository.create(
        dashboardComponents.map((component) => ({
          ...component,
          dashboard: { id: component.dashboardId },
          widgetType: { id: component.widgetTypeId },
        })),
      );
      await this.dashboardComponentRepository.save(components);
    } catch (error) {
      console.log('🚀 ~ ComponentsService ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateComponents(dashboardComponents: DashboardComponentDto[]) {
    try {
      for (const componentDto of dashboardComponents) {
        // Buscar el componente específico por dashboardId y widgetTypeId
        const existingComponent = await this.dashboardComponentRepository
          .createQueryBuilder('component')
          .leftJoinAndSelect('component.dashboard', 'dashboard')
          .leftJoinAndSelect('component.widgetType', 'widgetType')
          .where('dashboard.id = :dashboardId', {
            dashboardId: componentDto.dashboardId,
          })
          .andWhere('widgetType.id = :widgetTypeId', {
            widgetTypeId: componentDto.widgetTypeId,
          })
          .getOne();

        if (existingComponent) {
          await this.dashboardComponentRepository.update(existingComponent.id, {
            title: componentDto.title,
            width: componentDto.width,
            height: componentDto.height,
            x: componentDto.x,
            y: componentDto.y,
          });
        }
      }
    } catch (error) {
      console.log('🚀 ~ ComponentsService ~ updateComponents ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }
}
