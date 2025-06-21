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
import { CreateWidgetTypeDto } from './widgetTypes/dto/create-widget-type.dto';
import { WidgetTypesService } from './widgetTypes/widgetTypes.service';

@Controller('dashboards')
export class DashboardsController {
  constructor(
    private readonly dashboardsService: DashboardsService,
    private readonly widgetTypesService: WidgetTypesService,
  ) {}

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

  @Post('widget-types')
  @UseGuards(JwtAuthGuard)
  async createWidgetType(@Body() createWidgetTypeDto: CreateWidgetTypeDto) {
    const widgetType =
      await this.widgetTypesService.createWidgetType(createWidgetTypeDto);

    return {
      ok: true,
      message: 'Widget type created successfully',
      data: widgetType,
    };
  }

  @Get('widget-types')
  @UseGuards(JwtAuthGuard)
  async getAllWidgetTypes() {
    const widgetTypes = await this.widgetTypesService.getAllWidgetTypes();

    return {
      ok: true,
      data: widgetTypes,
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
