import mapCustomerConfig from './servpack.mapping';

function useValidation(customerConfig) {
    const values = mapCustomerConfig(customerConfig);
    Object.keys(values).forEach(key => {
        const data = values[key];
        data.resolveValue.bind(data)();
        const errorMessage = data.validate.bind(data)();
        if (errorMessage) throw new Error(errorMessage);
    });
    return values;
}

export default useValidation;