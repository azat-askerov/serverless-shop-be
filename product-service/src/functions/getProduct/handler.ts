import { formatErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import products from '../../mocks/products';

const getProductHandler: ValidatedEventAPIGatewayProxyEvent<{}> = async (event) => {
  const { productId } = event.pathParameters;

  if (products[productId]) {
    return formatJSONResponse({
      result: products[productId],
    });
  } else {
    return formatErrorResponse('No such a product found!', 404);
  }
};

export const main = middyfy(getProductHandler);
