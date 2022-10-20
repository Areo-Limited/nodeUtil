import { isJson } from "json";

export type EnvVarMap = Map<string, 
                            "string" | "number" | "boolean" | "json">

export interface EnvVarList{
    production: EnvVarMap
    development: EnvVarMap
}

export const checkNodeEnv = () => {
    if (process.env["NODE_ENV"] === undefined)
        throw new Error("NODE_ENV environment variable is not set.")
}

export class EnvironmentVariableError extends Error{
    environment: string
    constructor(message: string){
        super(message);
        checkNodeEnv();
        this.environment = process.env["NODE_ENV"]!;
    }
}

export class EnvVarCheck{
    envVariableList: EnvVarList
    constructor(
        envVariableList: EnvVarList
    ){
        this.envVariableList = envVariableList;
    }
    /**
     * Check whether the environment variables are legit based on the provided expected environment variables
     * @param expectedEnv 
     * @returns True means the environment variables are legit, false otherwise.
     */
    protected checkEnvLegit(expectedEnv: EnvVarMap): boolean{
        for (const key of expectedEnv.keys()){
            const value = expectedEnv.get(key);
            if (process.env[key] === undefined) throw new EnvironmentVariableError(
                `The environment variable ${key} is missing in the environment.`
            )
            
            const typeOfEnv = isJson(process.env[key])? "json" : typeof(value);

            if (typeOfEnv !== value) {
                throw new EnvironmentVariableError(
                    `The environment variable ${key} is not in the correct type. The expected type is ${value} but not ${typeOfEnv}`
                )
            }
        }
        return true;
    }
    /**
     * Check whether the environment variables are legit based on the environment
     * @public
     * @function checkEnvVar
     * @return True means the environment variables are legit, false otherwise.
     */
    public checkEnvVar(): boolean{
        switch(process.env["NODE_ENV"]){
            case "development":
                return this.checkEnvLegit(this.envVariableList.development);
            case "production":
                return this.checkEnvLegit(this.envVariableList.production);
            default:
                checkNodeEnv();
                throw new EnvironmentVariableError("The Node Environment(NODE_ENV) in the environment is not supported")
        }
    }
}

