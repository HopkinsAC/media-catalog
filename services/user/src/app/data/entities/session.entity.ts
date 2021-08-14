import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('sessions')
export class Session extends BaseEntity {
  @Column('varchar', { length: 36 })
  userId: string;

  @Column('datetime')
  expiresAt: string;
}
