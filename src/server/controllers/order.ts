import Products from '@/src/server/models/products'
import Orders from '@/src/server/models/orders'
import db from '@server/models'
import OrderServices from '@server/models/orderServices'
import PaymentMethods from '@server/models/paymentMethods'
import Services from '@server/models/services'
import {Request} from 'express'
import {Response} from 'express-serve-static-core'
import {AppState} from '@data/appState'

/**
 * Retorna todas as Orders e todos os campos válidos do sistema.
 */
export async function list(req: Request, res: Response) {
  return res.json({
    constraints: {
      paymentMethods: await PaymentMethods.findAll(),
      products: await Products.findAll(),
      services: await Services.findAll(),
    },
    orders: await Orders.findAll({
      include: [Services],
      order: [['date', 'DESC']],
    }),
  } as AppState)
}

/**
 * Insere uma Order.
 */
export async function create(req: Request, res: Response) {
  const b = req.body

  db.transaction(async t => {
    const order = await Orders.create(
      {
        clientName: b.clientName,
        date: b.date,
        value: b.value,
        productId: b.productId,
        paymentMethodId: b.paymentMethodId,
      },
      {transaction: t},
    )

    const orderId = order.id

    return Promise.all(
      b.services.map((serviceId: string) =>
        OrderServices.create({orderId, serviceId}, {transaction: t}),
      ),
    )
  })
}

/**
 * Modifica uma Order.
 */
export async function update(req: Request, res: Response) {
  const b = req.body

  return Orders.update(
    {
      clientName: b.clientName,
      date: b.date,
      value: b.value,
      productId: b.productId,
      paymentMethodId: b.paymentMethodId,
    },
    {where: {id: req.params.id}},
  )
}

/**
 * Remove uma Order.
 */
export async function remove(req: Request, res: Response) {
  return Orders.destroy({where: {id: req.params.id}})
}
