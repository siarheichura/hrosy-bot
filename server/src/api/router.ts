import { Router } from 'express'
import { controller } from './controllers'
import { authMiddleware } from './middlewares'
import {
  addCategoryValidator,
  addUpdateWalletValidator,
  deleteWalletValidator,
  updateWalletValidator
} from './validators'

export const router = Router()

// wallets
router.get('/wallets', authMiddleware, controller.getWallets)
router.post('/wallets', authMiddleware, addUpdateWalletValidator, controller.addWallet)
router.put('/wallets/:id', authMiddleware, updateWalletValidator, controller.updateWallet)
router.delete('/wallets/:id', authMiddleware, deleteWalletValidator, controller.deleteWallet)

// operations
router.get('/operations/:type/:start/:end', authMiddleware, controller.getOperations)
router.get('/operations/:id', authMiddleware, controller.getOperation)
router.post('/operations', authMiddleware, controller.addOperation)
router.put('/operations/:id', authMiddleware, controller.updateOperation)
router.delete('/operations/:id', authMiddleware, controller.deleteOperation)

// categories
router.get('/categories', authMiddleware, controller.getCategories)
router.post('/categories', authMiddleware, addCategoryValidator, controller.addCategory)
router.put('/categories/:id', authMiddleware, controller.updateCategory)
router.delete('/categories/:id', authMiddleware, controller.deleteCategory)

// statistics
router.get('/statistics/:type/:walletId/:start/:end', authMiddleware, controller.getStatistics)

// transfers
router.get('/transfers/:start/:end', authMiddleware, controller.getTransfers)
router.post('/transfers', authMiddleware, controller.addTransfer)
router.put('/transfers/:id', authMiddleware, controller.updateTransfer)
router.delete('/transfers/:id', authMiddleware, controller.deleteTransfer)

// currencies
router.get('/currencies', authMiddleware, controller.getAllCurrencies)

// ZOD EXAMPLE
// const operationSchema = z.object({
//   body: z.object({
//     user: z.string({ required_error: 'userId is required' }),
//     wallet: z.string({ required_error: 'walletId is required' }),
//     type: z.string({ required_error: 'type (expense / income) is required' }),
//     category: z.string({ required_error: 'type (expense / income) is required' }),
//     // type: OperationType
//     // category: string
//     // sum: number
//     // currency: string
//     // comment: string
//     // createdAt: Date
//     fullName: z.string({ required_error: 'Full name is required' }),
//     email: z.string({ required_error: 'Email is required' }).email('Not a valid email')
//   })
// })
//
// const validate =
//   (schema: AnyZodObject) =>
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         await schema.parseAsync({
//           body: req.body,
//           query: req.query,
//           params: req.params
//         })
//         return next()
//       } catch (error) {
//         return res.status(400).json(error)
//       }
//     }
