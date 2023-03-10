/* eslint-disable no-inline-comments */
import { useLazyQuery } from "@apollo/client";

import { GET_ACCOUNT_SIGNIN_MESSAGE } from "../../graphql/queries/GET_ACCOUNT_SIGNIN_MESSAGE";

export const useAccountSigninMessage = () => {
  const [
    _getAccountSigninMessage,
    { loading: getAccountLoading, error: getAccountError, data },
  ] = useLazyQuery(GET_ACCOUNT_SIGNIN_MESSAGE);

  const getAccountSigninMessage = ({ address, chainId }) => {
    return _getAccountSigninMessage({
      variables: {
        address,
        chainId,
      },
      skip: !address || !chainId,
    });
  };

  /** Variables */
  const loading = getAccountLoading;

  const error = getAccountError;

  return {
    getAccountSigninMessage,
    loading: loading,
    error: error,
    message: data?.AccountQuery?.getAccountSigninMessage,
  };
};
