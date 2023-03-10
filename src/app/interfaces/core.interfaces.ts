export enum OPERATION_TYPES {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export type OperationType = 'income' | 'expense'

export interface ICategory {
  id: string
  type: OperationType
  name: string
}
