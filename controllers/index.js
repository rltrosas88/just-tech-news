//1.6 step 8
const router = require('express').Router();

const apiRoutes = require('./api/');

//14.1.4 step SIX 
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// router.use((req, res) => {
//     res.status(404).end();
// });

module.exports = router;