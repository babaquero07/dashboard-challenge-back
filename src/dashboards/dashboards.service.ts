import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dashboard } from './entities/dashboard.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardRepository: Repository<Dashboard>,
  ) {}

  async create(createDashboardDto: CreateDashboardDto, userId: number) {
    try {
      const dashboard = this.dashboardRepository.create({
        ...createDashboardDto,
        user: { id: userId },
      });
      await this.dashboardRepository.save(dashboard);

      return dashboard;
    } catch (error) {
      console.log('🚀 ~ DashboardsService ~ create ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAllByUser(userId: number) {
    try {
      const dashboards = await this.dashboardRepository.find({
        where: {
          user: { id: userId },
        },
      });

      return dashboards;
    } catch (error) {
      console.log('🚀 ~ DashboardsService ~ findAllByUser ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
