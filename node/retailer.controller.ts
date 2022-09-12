import { Retailer } from './retailer.model';

export default class RetailerController {
  public static listRetailers = async () => await Retailer.find();

  public static getRetailer = async (_id: string) =>
    await Retailer.findById(_id);

  public static getRetailersQuantity = async () => await Retailer.count();

  public static createRetailer = async (data: any) =>
    await Retailer.create(data);

  public static updateRetailer = async ({ _id, ...data }: any) =>
    await Retailer.findByIdAndUpdate(
      _id,
      {
        $set: data,
      },
      { new: true },
    );

  public static deleteRetailer = async (_id: string) =>
    await Retailer.findByIdAndDelete(_id);

  public static checkSubdomainIsUnique = async (subdomain: string) => {
    const matchedRetailer = await Retailer.findOne({ subdomain });

    if (!matchedRetailer) {
      return null;
    }

    return {
      _id: matchedRetailer._id,
      subdomain: matchedRetailer.subdomain,
    };
  };

  public static getRetailerBySubdomain = async (subdomain: string) => {
    const retailer = await Retailer.findOne({ subdomain });
    return retailer?.hideFieldsForNonAdminUsers();
  };
}
