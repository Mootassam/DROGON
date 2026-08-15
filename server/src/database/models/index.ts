const models = [
  require('./tenant').default,
  require('./auditLog').default,
  require('./settings').default,
  require('./user').default,
  require('./category').default,
  require('./transaction').default,
  require('./social').default,
  require('./vip').default,
  require('./product').default,
  require('./records').default,
  require("./company").default,
  require("./stakeProgram").default, // Load this BEFORE stacking
  require("./stacking").default,
  require("./depositNetwork").default,
  require("./depositMethod").default,
  require("./wallet").default,
  require("./Transfer").default,    // stacking depends on stakeProgram
];

export default function init(database) {
  for (let model of models) {
    model(database);
  }

  return database;
}

export async function createCollections(database) {
  for (let model of models) {
    await model(database).createCollection();
  }

  return database;
}