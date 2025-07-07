const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { randomUUID } = require('crypto');

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'Users';

exports.handler = async (event) => {
    const { httpMethod, pathParameters, body } = event;
    const path = event.path;
    
    try {
        switch (httpMethod) {
            case 'GET':
                if (path.endsWith('/users')) {
                    return await getAllUsers();
                } else if (path.match(/\/users\/[^/]+$/)) {
                    return await getUserById(pathParameters.userID);
                }
                break;
            case 'POST':
                if (path.endsWith('/users')) {
                    return await createUser(JSON.parse(body));
                }
                break;
            case 'PUT':
                if (path.match(/\/users\/[^/]+$/)) {
                    return await updateUser(pathParameters.userID, JSON.parse(body));
                }
                break;
            case 'DELETE':
                if (path.match(/\/users\/[^/]+$/)) {
                    return await deleteUser(pathParameters.userID);
                }
                break;
        }
        
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Not Found' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
};

async function getAllUsers() {
    const result = await dynamodb.send(new ScanCommand({ TableName: TABLE_NAME }));
    return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    };
}

async function getUserById(userID) {
    const result = await dynamodb.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { userID }
    }));
    
    if (!result.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'User not found' })
        };
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
    };
}

async function createUser(userData) {
    const userID = randomUUID();
    const user = { userID, ...userData };
    
    await dynamodb.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: user
    }));
    
    return {
        statusCode: 201,
        body: JSON.stringify(user)
    };
}

async function updateUser(userID, userData) {
    const updateExpression = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    Object.keys(userData).forEach(key => {
        updateExpression.push(`#${key} = :${key}`);
        expressionAttributeValues[`:${key}`] = userData[key];
        expressionAttributeNames[`#${key}`] = key;
    });

    try {
        const result = await dynamodb.send(new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { userID: String(userID) },
            UpdateExpression: `SET ${updateExpression.join(', ')}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ConditionExpression: 'attribute_exists(userID)',
            ReturnValues: 'ALL_NEW'
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes)
        };
    } catch (error) {
        console.error("Update error", error);
        if (error.name === 'ConditionalCheckFailedException') {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' })
            };
        }
        throw error;
    }
}


async function deleteUser(userID) {
    await dynamodb.send(new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { userID }
    }));
    
    return {
        statusCode: 204,
        body: ''
    };
}