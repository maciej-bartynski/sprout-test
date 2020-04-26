const messageValidation = (incomingMsg) => {
    const msg = JSON.parse(incomingMsg);
    let isValid = false;

    if (msg && typeof msg === 'object') {
        msg.body = msg.body ? msg.body : null;
        const hasId = msg.id && typeof msg.id === "string" && msg.id.trim();
        const hasTo = msg.to && msg.to.map && msg.to.length;
        isValid = !!hasId && !!hasTo;
    }

    return isValid ? msg : null;
}

export default messageValidation;
