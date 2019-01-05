import {Sequelize} from 'sequelize-typescript'

import * as Config from '../config/config'

import Products from './products'
import Orders from './orders'
import PaymentMethods from './paymentMethods'
import Services from './services'
import OrderServices from './orderServices'

type Env = 'production' | 'development' | 'test'

const env = (process.env.NODE_ENV || 'development') as Env
const config = Config[env]

const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  dialect: config.dialect,
})

sequelize.addModels([PaymentMethods, Products, Services, Orders, OrderServices])

export default sequelize
