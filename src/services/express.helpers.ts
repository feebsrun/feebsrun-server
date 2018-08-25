// Express helper to send a success to the client
export function handleSuccess(result){
    return this.send(result);
};

// Express helper to send an error to the client
export function handleError(err){
    console.error('Error executing route: ', err);
    console.log(this);
    return this.status(500).send(err);
};