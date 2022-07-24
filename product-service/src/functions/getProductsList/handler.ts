import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import products from '../../mocks/products';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<{}> = async (event) => {
  return formatJSONResponse({
    result: products,
  });
};

export const main = middyfy(getProductsList);
