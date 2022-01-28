class EqualsOperator {
  compare(a, b) {
    return a == b;
  }
}

class GreaterOperator {
  compare(a, b) {
    return a > b;
  }
}

const operators = {
  equals: new EqualsOperator(),
  greater: new GreaterOperator(),
};

const getOperator = operator => {
  const oper = operators[operator];
  if (!oper) {
    throw new Error('Operator not found');
  }
  return oper;
};

module.exports = {
  getOperator,
};
