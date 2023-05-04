import * as functions from 'firebase-functions'
import { updateState } from '../models/user'

interface StatusType {
  online: boolean;
  visitedAt: number;
}

const updated = functions.database.ref('/status/{uid}').onUpdate(async (change, context) => {
  const eventStatus = change.after.val() as StatusType
  const statusSnapshot = await change.after.ref.once('value')
  const status = statusSnapshot.val() as StatusType

  if (status.visitedAt > eventStatus.visitedAt) return
  await updateState(context.params.uid, eventStatus.online, new Date(eventStatus.visitedAt))
})

export default { updated }
