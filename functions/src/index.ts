import onUser from './events/user'
import onStatus from './events/status'

export const userCreated = onUser.created
export const userDeleted = onUser.deleted
export const statusUpdate = onStatus.updated
