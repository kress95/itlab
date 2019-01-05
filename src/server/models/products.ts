import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript'
import Product from '@/src/data/product'

@Table({timestamps: false})
export default class Products extends Model<Products> implements Product {
  @IsUUID(4)
  @PrimaryKey
  @Column({defaultValue: DataType.UUIDV4})
  id!: string

  @Column
  name!: string
}
