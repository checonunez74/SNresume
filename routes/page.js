const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const controllers = require('../controllers')

/**
 * This is an example route which renders the "home" template
 * using the home.json file to populate template data.
 */

router.get('/', (req, res) => {
  const data = req.config // {cdn:<STRING>, global:<OBJECT>}

	// fetches the home.json config file which
	// populates the home.mustache template data
	turbo.pageConfig('home', process.env.TURBO_API_KEY, process.env.TURBO_ENV)
	.then(homeConfig => {

		const skillStr = homeConfig.section2.skills
		const skillArray = skillStr.split(',')
		homeConfig.section2['skills'] = skillArray.map(skill => {
			// wordpress:90
			const skillPart = skill.split(':')
			if (skillPart.length > 1){
				const skillObj = {}
				skillObj['name'] = skillPart[0]
				skillObj['pct'] = skillPart[1]
				return skillObj
			}
		})

		data['page'] = homeConfig // populate data object with home.json data
		data['preloaded'] = JSON.stringify({
			page: data.page,
			global: data.global
		})

    res.render('home', data) // render home.mustache
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})

module.exports = router
