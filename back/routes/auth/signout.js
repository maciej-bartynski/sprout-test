const { authcookie } = require('./util')

module.exports = (_, res) => {
    res.clearCookie(authcookie);
    return res
        .status(200)
        .json({
            success: true,
            msg: 'User signed out',
        })
}