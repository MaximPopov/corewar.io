import { AzureFunction, Context } from '@azure/functions'
import { IChallengeResultMessage, IHillUpdatedMessage } from 'corewar-message-types'
import { DATABASE_NAME, COLLECTION_NAME } from '../common/constants'
import { IHill } from '../common/IHill'
import Repository from 'corewar-repository'

const challengeResult: AzureFunction = async function(
    _: Context,
    message: IChallengeResultMessage
): Promise<IHillUpdatedMessage> {
    const { id, result } = message.body

    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    const hill = await repo.getById<IHill>(id)

    const warriors = result.warriors
        .sort((a, b) => a.score - b.score)
        .map(warrior => warrior.warrior.data.redcode)
        .slice(0, hill.rules.size)

    const nextHill = {
        ...hill,
        warriors
    }

    await repo.upsert(nextHill)

    return {
        body: {
            ...nextHill
        }
    }
}

export default challengeResult
