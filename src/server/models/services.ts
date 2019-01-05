import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript'

import Service from '@data/service'
import Orders from './orders'
import OrderServices from './orderServices'

@Table({timestamps: false})
export default class Services extends Model<Services> implements Service {
  @IsUUID(4)
  @PrimaryKey
  @Column({defaultValue: DataType.UUIDV4})
  id!: string

  @Column
  name!: string

  @BelongsToMany(() => Orders, () => OrderServices)
  orders!: Orders[]
}
