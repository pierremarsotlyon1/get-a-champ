class BaseMetier {
    generateResponse(status, message) {
        return {
            status: status,
            message: message
        };
    }
}

export default BaseMetier;