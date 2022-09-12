import { and } from 'graphql-shield';
import {
  isAuthenticatedUser,
  isAdminUser,
  hasManageRetailersPermission,
} from '@modules/permissions/rules';

export const permissions = {
  Query: {
    listRetailers: and(
      isAuthenticatedUser,
      isAdminUser,
      hasManageRetailersPermission,
    ),
    getRetailer: and(
      isAuthenticatedUser,
      isAdminUser,
      hasManageRetailersPermission,
    ),
  },
  Mutation: {
    createRetailer: and(
      isAuthenticatedUser,
      isAdminUser,
      hasManageRetailersPermission,
    ),
    updateRetailer: and(
      isAuthenticatedUser,
      isAdminUser,
      hasManageRetailersPermission,
    ),
    deleteRetailer: and(
      isAuthenticatedUser,
      isAdminUser,
      hasManageRetailersPermission,
    ),
    checkSubdomainIsUnique: and(
      isAuthenticatedUser,
      isAdminUser,
      hasManageRetailersPermission,
    ),
  },
};
