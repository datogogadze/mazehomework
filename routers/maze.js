const express = require('express');
const router = express.Router();
const { getOperator } = require('../operators/operators');

let maze;

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

router.post('/find', function (req, res) {
  try {
    const { operator, value } = req.body;
    let oper;
    try {
      oper = getOperator(operator);
    } catch (err) {
      return res.status(400).send(`Fail: ${err.message}`);
    }
    const nums = findValue(maze, { operator: oper, value });
    return res.status(200).send(nums.sort());
  } catch (err) {
    return res.status(502).send(`Fail: ${err.message}`);
  }
});

router.post('/create', function (req, res) {
  try {
    maze = JSON.parse(req.body);
    return res.status(200).send(`Success: ${req.body}`);
  } catch (err) {
    return res.status(400).send(`Fail: ${err.message}`);
  }
});

module.exports = router;
