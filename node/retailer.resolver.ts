import RetailerController from './retailer.controller';

export const resolvers = {
  Query: {
    listRetailers: async () => await RetailerController.listRetailers(),
    getRetailer: async (_: any, { _id }: { _id: string }) =>
      await RetailerController.getRetailer(_id),
    getRetailerBySubdomain: async (
      _: any,
      { subdomain }: { subdomain: string },
    ) => await RetailerController.getRetailerBySubdomain(subdomain),
  },
  Mutation: {
    createRetailer: async (_: any, { data }: { data: any }) =>
      await RetailerController.createRetailer(data),
    updateRetailer: async (_: any, { data }: { data: any }) =>
      await RetailerController.updateRetailer(data),
    deleteRetailer: async (_: any, { _id }: { _id: string }) =>
      await RetailerController.deleteRetailer(_id),
    checkSubdomainIsUnique: async (
      _: any,
      { subdomain }: { subdomain: string },
    ) => await RetailerController.checkSubdomainIsUnique(subdomain),
  },
};
