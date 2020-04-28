require('dotenv').config()

const useConfig = ({
    watch: require('./npmWatch'),
    build: require('./npmBuild'),
    start: require('./npmStart')
})[process.env.NODE_ENV];

module.exports = useConfig;