import servpackValidate from 'applicationValidators/servpackValidator';
import sockpackValidate from 'applicationValidators/sockpackValidator';

const applicationValidator = async (servpackConfig, sockpackConfig) => {
    const serverRestModuleAPI = await servpackValidate(servpackConfig);
    const wSocServerModuleAPI = await sockpackValidate(sockpackConfig, serverRestModuleAPI)
    return {
        ...serverRestModuleAPI,
        ...wSocServerModuleAPI
    }
}

export default applicationValidator;