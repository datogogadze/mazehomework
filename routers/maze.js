const express = require('express');
const router = express.Router();
const { getOperator } = require('../operators/operators');

let maze = [];

const findValue = (maze, operValue) => {
  const { operator, value } = operValue;
  let nums = [];
  maze.forEach(x => {
    if (Array.isArray(x)) {
      nums = nums.concat(findValue(x, operValue));
    } else {
      if (operator.compare(x, value)) {
        nums.push(x);
      }
    }
  });
  return nums;
};

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

router.post('/find', function (req, res) {
  try {
    const { operator, value } = req.body;
    let oper;
    try {
      if (operator === undefined || value === undefined) {
        throw new Error(
          'Request should contain "operator" and "value" properties'
        );
      }
      if (typeof value != 'number') {
        throw new Error('Value should be a number');
      }
      oper = getOperator(operator);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
    const nums = findValue(maze, { operator: oper, value });
    return res.status(200).json({ result: nums.sort() });
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
});

router.post('/create', function (req, res) {
  try {
    if (req.body.maze === undefined) {
      throw new Error('Request should contain "maze" property');
    }
    maze = req.body.maze;
    if (!Array.isArray(maze)) {
      throw new Error('Maze should be an array');
    }
    validateArray(maze);
    return res.status(200).json({ result: 'Success' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
