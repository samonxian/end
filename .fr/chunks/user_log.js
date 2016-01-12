module.exports = {
    path: '/user_log',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../src/page/user_log'))
        })
    }
}
