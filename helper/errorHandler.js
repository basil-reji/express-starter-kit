const getErrors = (err) =>{
    err = err.errors
    let errors = {}
    for (const [path, errorObj] of Object.entries(err)){
        errors[path] = errorObj['properties']['message']
    }

    return errors;
}

const getErrorMessages = (err) =>{
    err = err.errors
    let errors = []
    for (const [path, errorObj] of Object.entries(err)){
        errors.push(errorObj['properties']['message'])
    }

    return errors;
}

module.exports = {
    getErrors,
    getErrorMessages
}