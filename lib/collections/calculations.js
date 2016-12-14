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
  }
});

Calculations.attachSchema(Schemas.Calculation);
