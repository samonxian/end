module.exports = {
    path: '/get_mobile_info',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../src/page/get_mobile_info'))
        })
    }
}
