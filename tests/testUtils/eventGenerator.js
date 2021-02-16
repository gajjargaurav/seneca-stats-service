const APIGatewayRequest = ({
    body,
    method,
    path = '',
    headers,
    query,
    stageVariables = null,
}) => {
    const request = {
        body: body || null,
        headers: headers ? headers : {},
        multiValueHeaders: {},
        httpMethod: method,
        isBase64Encoded: false,
        path: path || null, 
        query: query || null,
        multiValueQueryStringParameters: null,
        stageVariables,
        requestContext: {
            accountId: '',
            apiId: '',
            httpMethod: method,
            identity: {
                accessKey: '',
                accountId: '',
                apiKey: '',
                apiKeyId: '',
                caller: '',
                cognitoAuthenticationProvider: '',
                cognitoAuthenticationType: '',
                cognitoIdentityId: '',
                cognitoIdentityPoolId: '',
                principalOrgId: '',
                sourceIp: '',
                user: '',
                userAgent: '',
                userArn: '',
            },
            path,
            stage: '',
            requestId: '',
            requestTimeEpoch: 3,
            resourceId: '',
            resourcePath: '',
        },
        resource: '',
    };
    return request;
};

module.exports = APIGatewayRequest;
