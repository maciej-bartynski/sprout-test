import { optionsProd, optionsDev, optionsSeed } from './rollup.options/options';
import external from './rollup.options/external';
import plugins from './rollup.options/plugins';

const options = {
    prod: optionsProd,
    dev: optionsDev,
    seed: optionsSeed
}[process.env.ROLLUP_OPTIONS]

export default {
    ...options,
    external,
    plugins
}