export function generateActionType(prefix: string) {
    return {
        request: `${prefix}_REQUEST`,
        success: `${prefix}_SUCCESS`,
        failure: `${prefix}_FAILURE`
    };
}