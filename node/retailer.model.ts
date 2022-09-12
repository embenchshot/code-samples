import mongoose from 'mongoose';
import diffHistory from 'mongoose-diff-history/diffHistory';
import * as R from 'ramda';

import { InformationCard } from '@project/shared-models/retailer/retailer.model';

export interface RetailerModel extends mongoose.Document {
  name: string;
  subdomain: string;
  projectApiLogin: string;
  projectApiKey: string;
  projectClientId: string;
  supportEmail: string;
  returnPolicyDays: number;
  theme: {
    name: string;
    colorScheme: string;
    logo: string;
    favicon: string;
    metadata: Record<string, string>;
  };
  informationHeadline: string;
  informationCards: InformationCard[];
  personalInfoStepDisabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  hideFieldsForNonAdminUsers: () => RetailerModel;
}

export const RetailerSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    subdomain: { type: String, unique: true, required: true },
    projectApiLogin: { type: String, default: '' },
    projectApiKey: { type: String, default: '' },
    projectClientId: { type: String, default: '' },
    supportEmail: { type: String, default: '' },
    returnPolicyDays: { type: Number, default: 30 },
    theme: {
      name: { type: String, default: '' },
      colorScheme: { type: String, default: '' },
      logo: { type: String, default: '' },
      favicon: { type: String, default: '' },
      metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    informationHeadline: { type: String, default: '' },
    informationCards: { type: Array, of: Object, default: [] },
    personalInfoStepDisabled: { type: Boolean, default: false },
  },
  { timestamps: true },
);

RetailerSchema.plugin(diffHistory.plugin);

RetailerSchema.methods.hideFieldsForNonAdminUsers = function () {
  if (!this) {
    return null;
  }

  const retailer = this.toObject() as RetailerModel;

  const nextRetailer = R.omit(
    ['projectApiLogin', 'projectApiKey', 'projectClientId'],
    retailer,
  );

  return nextRetailer;
};

export const Retailer = mongoose.model<RetailerModel>(
  'Retailer',
  RetailerSchema,
  'Retailer',
);
