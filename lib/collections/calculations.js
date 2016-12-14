Calculations = new Mongo.Collection('calculations');

var Schemas = {};

Schemas.Calculation = new SimpleSchema({
  expression: {
    type: String,
    optional: true
  },
  result: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  sessionId: {
    type: String,
    optional: true
  },
  sessionColor: {
    type: String,
    optional: true
  }
});

Calculations.attachSchema(Schemas.Calculation);
