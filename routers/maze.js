const express = require('express');
const router = express.Router();
const {
  validateFindRequest,
  validateCreateRequest,
} = require('./middleware/validators');

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

router.get('/find', validateFindRequest, (req, res) => {
  try {
    const nums = findValue(maze, req.operValue);
    return res.status(200).json({ result: nums.sort() });
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
});

router.post('/create', validateCreateRequest, (req, res) => {
  try {
    maze = req.body.maze;
    return res.status(200).json({ result: 'Success' });
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
});

module.exports = router;
