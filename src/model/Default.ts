import { v4 as uuid } from 'uuid'

export default class Default {
  id?: string
  created_at: Date

  constructor() {
    if (!this.id) this.id = uuid()
  }
}
