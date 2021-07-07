//1.6 step 8
const router = require('express').Router();

const apiRoutes = require('./api/');
//14.1.4 step SIX 
const homeRoutes = require('./home-routes.js');
// 14.5.3 step THREE merge the dashboard router module into the rest of the app
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/dashboard', dashboardRoutes);

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// router.use((req, res) => {
//     res.status(404).end();
// });

module.exports = router;