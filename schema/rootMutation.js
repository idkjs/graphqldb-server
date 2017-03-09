import { GQC } from 'graphql-compose';
import { CheckinTC } from './checkin';
import { BusinessTC } from './business';

export const RootMutationTC = GQC.rootMutation();

RootMutationTC.addFields({
  createBusiness: BusinessTC.get('$createOne'),

  ...testYourLuck({
    checkinCreate: CheckinTC.get('$createOne'), // same as CheckinTC.getResolver('createOne')
    checkinUpdateById: CheckinTC.getResolver('updateById'),
    checkinUpdateOne: CheckinTC.getResolver('updateOne'),
    checkinUpdateMany: CheckinTC.getResolver('updateMany'),
    ...worksOnlyByMondays({
      checkinRemoveById: CheckinTC.getResolver('removeById'),
      checkinRemoveOne: CheckinTC.getResolver('removeOne'),
      checkinRemoveMany: CheckinTC.getResolver('removeMany'),
    }),
  }),
});

// Just an example, how to add additional logic to resolvers
// So your mutation may be executed, may not. Depends on random value.
function testYourLuck(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => (rp) => {
      if (Math.random() > 0.5) {
        throw new Error('No luck, try again.');
      }
      return next(rp);
    });
  });
  return resolvers;
}

function worksOnlyByMondays(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => (rp) => {
      if ((new Date()).getDay() !== 1) {
        throw new Error('Nope, come at Monday.');
      }
      return next(rp);
    });
  });
  return resolvers;
}
