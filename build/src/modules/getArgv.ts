export default (): any => {
    const argv = process.argv;
    let result = {};

    argv.forEach((arg, index) => {
        if (index > 1) {
            const [argName, argValue] = arg.split("=");

            if (argValue === undefined) {
                result[argName] = true;
            } else {
                result[argName] = argValue;
            }
        }
    });

    return result;
};
