import { ICategory } from '../../models/Category'
import { OperationType } from '../../shared/interfaces'

export class CategoryDto {
  id: string
  type: OperationType
  name: string

  constructor(model: ICategory) {
    this.id = model.id
    this.type = model.type
    this.name = model.name
  }
}
