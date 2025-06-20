import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DashboardComponent } from './dashboardComponent.entity';

@Entity()
export class Dashboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

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

  // Relations - Many to one with user
  @ManyToOne(() => User, (user) => user.dashboards)
  user: User;

  // Relations - One to many with dashboard components
  @OneToMany(
    () => DashboardComponent,
    (dashboardComponent) => dashboardComponent.dashboard,
  )
  dashboardComponents: DashboardComponent[];
}
