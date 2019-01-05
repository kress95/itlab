import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript'
import PaymentMethod from '@/src/data/paymentMethod'

@Table({timestamps: false})
export default class PaymentMethods extends Model<PaymentMethods>
  implements PaymentMethod {
  @IsUUID(4)
  @PrimaryKey
  @Column({defaultValue: DataType.UUIDV4})
  id!: string

  @Column
  name!: string
}
