import { AzureFunction, Context } from '@azure/functions'
import { IUpdateHillMessage, IHillUpdatedMessage } from 'corewar-message-types'
import Repository from 'corewar-repository'
import { DATABASE_NAME, COLLECTION_NAME } from '../common/constants'

const updateHill: AzureFunction = async function(
    _: Context,
    message: IUpdateHillMessage
): Promise<IHillUpdatedMessage> {
    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    repo.upsert(message.body)

    return {
        body: {
            ...message.body
        }
    }
}

export default updateHill
