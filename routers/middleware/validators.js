const { getOperator } = require('../../operators/operators');

const validateArray = maze => {
  maze.forEach(x => {
    if (Array.isArray(x)) {
      validateArray(x);
    } else {
      if (typeof x != 'number') {
        throw new Error('Only numbers accepted');
      }
    }
  });
};

const validateFindRequest = (req, res, next) => {
  try {
    const { operator, value } = req.query;
    if (operator === undefined || value === undefined) {
      throw new Error(
        'Request should contain "operator" and "value" properties'
      );
    }
    req.operValue = {
      operator: getOperator(operator),
      value: parseInt(value),
    };
    next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const validateCreateRequest = (req, res, next) => {
  try {
    if (req.body.maze === undefined) {
      throw new Error('Request should contain "maze" property');
    }
    if (!Array.isArray(req.body.maze)) {
      throw new Error('Maze should be an array');
    }
    validateArray(req.body.maze);
    next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  validateFindRequest,
  validateCreateRequest,
};
