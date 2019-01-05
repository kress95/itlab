import {
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  BelongsToMany,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

import Appliances from './appliances'
import PaymentMethods from './paymentMethods'
import Voltages from './voltages'
import OrderVoltages from './orderVoltages'

@Table({timestamps: false})
export default class Orders extends Model<Orders> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string

  @Column
  clientName!: string

  @Column
  date!: Date

  @Column(DataType.DECIMAL)
  value!: number

  @ForeignKey(() => Appliances)
  @Column
  applianceId!: string

  @ForeignKey(() => PaymentMethods)
  @Column
  paymentMethodId!: string
}
