import { gql } from 'apollo-server-express';

const Retailer = gql`
  type RetailerTheme {
    name: String
    colorScheme: String
    logo: String
    favicon: String
    metadata: JSON
  }

  type InformationCard {
    barColor: String
    headline: String
    content: String
    linkText: String
    linkUrl: String
  }

  type Retailer {
    _id: String!
    name: String!
    subdomain: String!
    projectApiLogin: String!
    projectApiKey: String!
    projectClientId: String!
    supportEmail: String!
    returnPolicyDays: Int!
    theme: RetailerTheme!
    informationHeadline: String!
    informationCards: [InformationCard]!
    personalInfoStepDisabled: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type SubdomainCheckResponse {
    _id: String
    subdomain: String
  }

  input RetailerThemeInput {
    name: String
    colorScheme: String
    logo: String
    favicon: String
    metadata: JSON
  }

  input InformationCardInput {
    barColor: String
    headline: String
    content: String
    linkText: String
    linkUrl: String
  }

  input CreateRetailerInput {
    name: String!
    subdomain: String!
    projectApiLogin: String!
    projectApiKey: String!
    projectClientId: String!
    supportEmail: String!
    returnPolicyDays: Int!
    theme: RetailerThemeInput!
    informationHeadline: String!
    informationCards: [InformationCardInput]!
    personalInfoStepDisabled: Boolean!
  }

  input UpdateRetailerInput {
    _id: String!
    name: String!
    subdomain: String!
    projectApiLogin: String!
    projectApiKey: String!
    projectClientId: String!
    supportEmail: String!
    returnPolicyDays: Int
    theme: RetailerThemeInput!
    informationHeadline: String!
    informationCards: [InformationCardInput]!
    personalInfoStepDisabled: Boolean!
  }

  extend type Query {
    listRetailers: [Retailer]!
    getRetailer(_id: String!): Retailer
    getRetailerBySubdomain(subdomain: String!): Retailer
  }

  extend type Mutation {
    createRetailer(data: CreateRetailerInput!): Retailer!
    updateRetailer(data: UpdateRetailerInput!): Retailer!
    deleteRetailer(_id: String!): Retailer!
    checkSubdomainIsUnique(subdomain: String!): SubdomainCheckResponse
  }
`;

export default () => [Retailer];
