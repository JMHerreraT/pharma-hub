import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      region: process.env.NEXT_PUBLIC_AWS_REGION!,
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      loginWith: {
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
} as const;

// Configurar inmediatamente
Amplify.configure(amplifyConfig);

export default amplifyConfig;
