const awsmobile = {
    aws_project_region: 'us-east-2',
    aws_cognito_identity_pool_id: 'us-east-2:486708928239',
    aws_cognito_region: 'us-east-2',
    aws_user_pools_id: 'us-east-2_0vlNeBEx2',
    aws_user_pools_web_client_id: '45j8c0avi4s74puc19hbuh5anh',
    oauth: {
        domain: 'chatgpt4-128k.auth.us-east-2.amazoncognito.com',
        scope: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
        redirectSignIn: 'https://master.d2p0e8psp9klk1.amplifyapp.com',
        redirectSignOut: 'https://master.d2p0e8psp9klk1.amplifyapp.com',
        responseType: 'code'
    },
    federationTarget: 'COGNITO_USER_POOLS',
};

export default awsmobile;
