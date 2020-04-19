export default (_, res) => {
    return res
        .status(200)
        .json({
            success: true,
            msg: 'This is test route',
            data: 'Receiving this is proof of successfully unmounted testing router'
        })
}