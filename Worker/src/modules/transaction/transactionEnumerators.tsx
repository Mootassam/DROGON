const transactionEnumerators = {
  status: ['pending', 'canceled', 'success'],
  type: ["deposit", "withdraw", "convert_in", "convert_out"],   // for the kind of transaction
  direction: ['in', 'out'],        // for money flow direction
};

export default transactionEnumerators;
