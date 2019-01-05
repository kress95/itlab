import Service from './service'

export default interface Order {
  id?: string
  clientName: string
  date: Date
  value: number
  productId: string
  paymentMethodId: string
  services: Service[]
}
