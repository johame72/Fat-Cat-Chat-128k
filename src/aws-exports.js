// src\aws-exports.js

const awsmobile = {
    aws_project_region: 'us-east-2',
    aws_cognito_identity_pool_id: 'us-east-2:486708928239',
    aws_cognito_region: 'us-east-2',
    aws_user_pools_id: 'us-east-2_8gWr2Sm1S',
    aws_user_pools_web_client_id: '4o65502p3gehi2npe77p93js9e',
    oauth: {
        domain: 'https://fat-cat-chat-128k.auth.us-east-2.amazoncognito.com',
        scope: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
        redirectSignIn: 'https://master.d2p0e8psp9klk1.amplifyapp.com',
        redirectSignOut: 'https://master.d2p0e8psp9klk1.amplifyapp.com',
        responseType: 'code'
    },
    federationTarget: 'COGNITO_USER_POOLS',
};

export default awsmobile;
