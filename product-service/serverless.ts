import type { AWS } from '@serverless/typescript';

import getProduct from '@functions/getProduct';
import getProductsList from '@functions/getProductsList';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-plugin-swagger-ui'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    region: 'eu-west-1',
  },
  // import the function via paths
  functions: { getProduct, getProductsList },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    swaggerUi: {
      exportType: 'oas30',
      accepts: 'application/json',
      extensions: 'integrations',
      swaggerUiDirectoryName: '.swagger-ui',
      swaggerUiConfig: {
        dom_id: '#swagger-ui',
        deepLinking: 'true',
        presets: [
          'SwaggerUIBundle.presets.apis',
          'SwaggerUIStandalonePreset',
        ],
        layout: 'StandaloneLayout',
      },
    },
  },
};

module.exports = serverlessConfiguration;
