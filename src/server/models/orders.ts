import {
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  BelongsToMany,
  PrimaryKey,
  Table,
  Length,
} from 'sequelize-typescript'

import Products from './products'
import OrderServices from './orderServices'
import PaymentMethods from './paymentMethods'
import Services from './services'
import Order from '@data/order'

@Table({timestamps: false})
export default class Orders extends Model<Orders> implements Order {
  @IsUUID(4)
  @PrimaryKey
  @Column({defaultValue: DataType.UUIDV4})
  id!: string

  @Column
  clientName!: string

  @Column
  date!: Date

  @Column(DataType.DECIMAL)
  @Length({min: 0})
  value!: number

  @ForeignKey(() => Products)
  @Column
  productId!: string

  @ForeignKey(() => PaymentMethods)
  @Column
  paymentMethodId!: string

  @BelongsToMany(() => Services, () => OrderServices)
  services!: Services[]
}
