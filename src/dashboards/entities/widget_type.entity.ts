import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DashboardComponent } from './dashboardComponent.entity';

@Entity()
export class WidgetType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

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

  // Relations - One to many with dashboard components
  @OneToMany(
    () => DashboardComponent,
    (dashboardComponent) => dashboardComponent.widgetType,
  )
  dashboardComponents: DashboardComponent[];
}
