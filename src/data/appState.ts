import PaymentMethod from './paymentMethod'
import Product from './product'
import Service from './service'
import Order from './order'

export interface Constraints {
  paymentMethods: PaymentMethod[]
  products: Product[]
  services: Service[]
}

export interface AppState {
  constraints?: Constraints
  orders: Order[]
}

export default AppState
