import * as functions from 'firebase-functions'
import { createUser, deleteUser } from '../models/user'

const created = functions.auth.user().onCreate((user) => {
  console.log('Created', user.email)
  return createUser(user)
})

const deleted = functions.auth.user().onDelete((user) => {
  console.log('Deleted', user.email)
  return deleteUser(user)
})

export default { created, deleted }
