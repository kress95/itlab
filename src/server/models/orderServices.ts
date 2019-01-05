import {
  Column,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

import Orders from './orders'
import Services from './services'

@Table({timestamps: false})
export default class OrderServices extends Model<OrderServices> {
  @IsUUID(4)
  @PrimaryKey
  @ForeignKey(() => Orders)
  @Column
  orderId!: string

  @IsUUID(4)
  @PrimaryKey
  @ForeignKey(() => Services)
  @Column
  serviceId!: string
}
