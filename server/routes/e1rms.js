const axios = require('axios');
const router = require('express').Router();

router.route('/').get((req, res) => {
  console.log(req.query.userId);
  const url = `https://ghostlander-e1rm.builtwithdark.com/e1rms?userId=${req.query.userId}`;
  axios
    .get(url)
    .then((resp) => {
      console.log(resp.data);
      return res.json(resp.data);
    })
    .catch((err) => console.error(err));
  //   res.write(req.query.userId);
});

router.route('/').post((req, res) => {
  console.log(req.data);
});

module.exports = router;
