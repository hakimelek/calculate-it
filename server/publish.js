Meteor.publish('calculations', function () {
  return Calculations.find({}, {limit: 10, sort: {createdAt: -1}});
});