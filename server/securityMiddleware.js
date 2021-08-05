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

const isAdmin = async (req, res, next) => {
	try {
		next()
	} catch (error) {
		next(error)
	}
}

module.exports = {
	requireToken,
	isAdmin,
}
