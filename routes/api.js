// ROUTE: --> /api
const router = require( 'express' ).Router();

router.get( '/', ( req, res ) => {
    console.log('API: ', '/api/');
    res.json({
        message: 'test'
    });
} );




/* MODULE EXPORTS */
module.exports = router;
