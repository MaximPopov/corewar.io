import { IDeleteHillMessage } from 'corewar-message-types'
import { Context } from '@azure/functions'
import { IHill } from '../schema/hill'
import { CosmosClient, Container } from '@azure/cosmos'

interface IValidationResult {
    success: boolean
    messages?: string[]
}

//TODO validation:
// https://www.npmjs.com/package/swagger-model-validator
// https://www.npmjs.com/package/swagger-object-validator
const validate = (_input: IDeleteHillMessage): IValidationResult => ({
    success: true
})

const getConnectionStringProperty = (propertyName: string): string =>
    process.env.DB_CONNECTION_STRING.split(';')
        .find(x => x.toLowerCase().startsWith(propertyName))
        .split('=')[1]

const config = {
    endpoint: getConnectionStringProperty('AccountEndpoint'),
    key: getConnectionStringProperty('AccountKey'),
    databaseId: 'hills-db',
    containerId: 'hills',
    partitionKey: { kind: 'Hash', paths: ['/id'] }
}

const getDbContainer = (): Container => {
    const { endpoint, key, databaseId, containerId } = config
    const client = new CosmosClient({ endpoint, key })
    const database = client.database(databaseId)
    return database.container(containerId)
}

export const deleteHill = async (context: Context, input: IDeleteHillMessage, existing: IHill): Promise<void> => {
    if (!existing) {
        context.res = {
            status: 404,
            body: 'Hill not found'
        }
        return
    }

    const validation = validate(input)
    if (!validation.success) {
        context.res = {
            status: 400,
            body: validation.messages
        }
        return
    }

    const id = existing.id

    const container = getDbContainer()

    await container.item(id).delete()

    const message = { id }

    context.res = { body: message }

    context.bindings.bus = {
        body: message
    }

    context.bindings.signalr = [
        {
            target: 'hillDeleted',
            arguments: [message]
        }
    ]
}
