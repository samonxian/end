module.exports = {
    path: '/get_relay_info',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../src/page/get_relay_info'))
        })
    }
}
