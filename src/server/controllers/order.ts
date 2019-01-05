import Appliances from '@server/models/appliances'
import Orders from '@server/models/orders'
import PaymentMethods from '@server/models/paymentMethods'
import Voltages from '@server/models/voltages'
import {Request} from 'express'
import {Response} from 'express-serve-static-core'

export async function constraints(req: Request, res: Response) {
  return res.json({
    paymentMethods: await PaymentMethods.findAll(),
    appliances: await Appliances.findAll(),
    voltages: await Voltages.findAll(),
  })
}

export async function list(req: Request, res: Response) {
  return res.json({
    orders: await Orders.findAll(),
  })
}

export async function create(req: Request, res: Response) {
  throw 'Not yet implemented.'
}

export async function edit(req: Request, res: Response) {
  throw 'Not yet implemented.'
}

export async function remove(req: Request, res: Response) {
  throw 'Not yet implemented.'
}
