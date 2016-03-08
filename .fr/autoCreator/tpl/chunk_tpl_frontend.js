module.exports = {
    path: 'r2g/{filename}',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('frontend/view/{filename}'))
        })
    }
}
