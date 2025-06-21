import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createDashboardDto: CreateDashboardDto,
    @GetUser() user: { id: number; email: string },
  ) {
    const { id: userId } = user;
    const data = await this.dashboardsService.create(
      createDashboardDto,
      userId,
    );

    return {
      ok: true,
      message: 'Dashboard created successfully',
      data,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllByUser(@GetUser() user: { id: number; email: string }) {
    const { id: userId } = user;

    const dashboards = await this.dashboardsService.findAllByUser(userId);

    return {
      ok: true,
      data: dashboards,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const dashboard = await this.dashboardsService.findOne(+id);

    return {
      ok: true,
      data: dashboard,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardsService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardsService.remove(+id);
  }
}
