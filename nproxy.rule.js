module.exports = [
    // 1. replace single file with local one
    
    {
		pattern: /http\:\/\/(.*)\/diagram\/publiccamera/, 
        responder: "/Users/Sam/project/end/.backend.interface/publiccamera.js",
    },
];
