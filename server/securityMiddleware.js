const {
	models: { User },
} = require('./db')

const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization
		req.user = await User.findByToken(token)
		next()
	} catch (error) {
		next(error)
	}
}

const tokenMatchRequest = async (req, res, next) => {
	try {
		if (req.user.id !== Number(req.params.userId)) {
			return next({
				status: 403,
				message: 'Access not permitted.',
			})
		} else {
			next()
		}
	} catch (error) {
		next(error)
	}
}

const isAdmin = (req, res, next) => {
	try {
		if (!req.user.isAdmin) {
			return next({
				status: 403,
				message: 'Access not permitted.',
			})
		} else {
			next()
		}
	} catch (error) {
		next(error)
	}
}

module.exports = {
	requireToken,
	tokenMatchRequest,
	isAdmin,
}
