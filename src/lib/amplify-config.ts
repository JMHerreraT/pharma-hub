import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      region: process.env.NEXT_PUBLIC_AWS_REGION!,
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '',
          redirectSignOut: typeof window !== 'undefined' ? `${window.location.origin}/login` : '',
          responseType: 'code',
        },
        username: true,
        email: true,
      },
    },
  },
  API: {
    REST: {
      pharmaHubApi: {
        endpoint: process.env.NEXT_PUBLIC_API_URL!,
        region: process.env.NEXT_PUBLIC_AWS_REGION!,
      },
    },
  },
};

// Solo configurar en el cliente
if (typeof window !== 'undefined') {
  Amplify.configure(amplifyConfig);
}

export default amplifyConfig;