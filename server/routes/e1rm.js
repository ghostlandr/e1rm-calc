const axios = require('axios');
const router = require('express').Router();

router.route('/').post((req, res) => {
  axios
    .post(`https://ghostlander-e1rm.builtwithdark.com/e1rm`, {
      body: req.body,
    })
    .then((resp) => res.json(resp.data));
});

module.exports = router;
