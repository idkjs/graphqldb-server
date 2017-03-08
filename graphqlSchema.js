// MULTI SCHEMA MODE IN ONE SERVER
// create new GQC from ComposeStorage
import { ComposeStorage } from 'graphql-compose';
import composeWithRelay from 'graphql-compose-relay';

import { BusinessTC } from './models/business';
import { ReviewTC } from './models/review';
import { CheckinTC } from './models/checkin';
import { TipTC } from './models/tip';
import { UserTC } from './models/user';
// import { EventTC } from './models/event';

const GQC = new ComposeStorage();

composeWithRelay(GQC.rootQuery());

const ViewerTC = GQC.get('Viewer');
GQC.rootQuery().addFields({
  viewer: {
    type: ViewerTC.getType(),
    description: 'Data under client context',
    resolve: () => ({}),
  },
});

const fields = {
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

  tip: TipTC.getResolver('findOne'),
  tipList: TipTC.getResolver('findMany'),

  user: UserTC.getResolver('findOne'),
  userList: UserTC.getResolver('findMany'),
};

ViewerTC.addFields(fields);

GQC.rootMutation().addFields({
  createBusiness: BusinessTC('$createOne'),
});

export default GQC.buildSchema();
