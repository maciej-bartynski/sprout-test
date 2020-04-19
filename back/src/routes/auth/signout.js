import constants from './util'
const { authcookie } = constants;

export default (_, res) => {
    res.clearCookie(authcookie);
    return res
        .status(200)
        .json({
            success: true,
            msg: 'User signed out',
        })
}