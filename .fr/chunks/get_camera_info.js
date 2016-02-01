module.exports = {
    path: '/get_camera_info',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../src/page/get_camera_info'))
        })
    }
}
