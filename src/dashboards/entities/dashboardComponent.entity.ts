import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dashboard } from './dashboard.entity';
import { WidgetType } from './widget_type.entity';

@Entity()
export class DashboardComponent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  width: number;

  @Column({ type: 'int' })
  height: number;

  @Column({ type: 'int' })
  x: number;

  @Column({ type: 'int' })
  y: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  // Relations - Many to one with dashboard
  @ManyToOne(() => Dashboard, (dashboard) => dashboard.dashboardComponents)
  dashboard: Dashboard;

  // Relations - Many to one with widget type
  @ManyToOne(() => WidgetType, (widgetType) => widgetType.dashboardComponents)
  widgetType: WidgetType;
}
