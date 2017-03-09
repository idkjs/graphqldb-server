import { GQC } from 'graphql-compose';
import { CheckinTC } from './checkin';
import { BusinessTC } from './business';
import { ReviewTC } from './review';
import { TipTC } from './tip';
import { UserTC } from './user';

export const RootQueryTC = GQC.rootQuery();

RootQueryTC.addFields({
  businessById: BusinessTC.getResolver('findById'),
  businessByIds: BusinessTC.getResolver('findByIds'),
  businessTotal: BusinessTC.getResolver('count'),
  businessConnection: BusinessTC.getResolver('connection'),
  business: BusinessTC.getResolver('findOne'),
  businessList: BusinessTC.getResolver('findMany'),

  review: ReviewTC.getResolver('findOne'),
  // reviewList: ReviewTC.getResolver('findMany'),
  reviewConnection: ReviewTC.getResolver('connection'),

  checkin: CheckinTC.getResolver('findOne'),
  checkinList: CheckinTC.getResolver('findMany'),
  // checkinById: CheckinTC.getResolver('findById'),
  // checkinByIds: CheckinTC.getResolver('findByIds'),
  // checkinOne: CheckinTC.getResolver('findOne'),
  // checkinMany: CheckinTC.getResolver('findMany'),
  // checkinTotal: CheckinTC.getResolver('count'),
  // checkinConnection: CheckinTC.getResolver('connection'),

  tip: TipTC.getResolver('findOne'),
  tipList: TipTC.getResolver('findMany'),

  user: UserTC.getResolver('findOne'),
  userList: UserTC.getResolver('findMany'),
});
