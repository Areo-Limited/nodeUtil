export declare type EnvVarMap = Map<string, "string" | "number" | "boolean" | "json">;
export interface EnvVarList {
    production: EnvVarMap;
    development: EnvVarMap;
}
export declare const checkNodeEnv: () => void;
export declare class EnvironmentVariableError extends Error {
    environment: string;
    constructor(message: string);
}
export declare class EnvVarCheck {
    envVariableList: EnvVarList;
    constructor(envVariableList: EnvVarList);
    /**
     * Check whether the environment variables are legit based on the provided expected environment variables
     * @param expectedEnv
     * @returns True means the environment variables are legit, false otherwise.
     */
    protected checkEnvLegit(expectedEnv: EnvVarMap): boolean;
    /**
     * Check whether the environment variables are legit based on the environment
     * @public
     * @function checkEnvVar
     * @return True means the environment variables are legit, false otherwise.
     */
    checkEnvVar(): boolean;
}
