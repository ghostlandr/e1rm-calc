const axios = require('axios');
const router = require('express').Router();

router.route('/').get((req, res) => {
  const url = `https://ghostlander-e1rm.builtwithdark.com/user?userId=${req.query.userId}`;
  axios.get(url).then((resp) => res.send(resp.data));
});

module.exports = router;
