export class ConsoleApp {
    private handlers: Handler[] = [];

    public addCommand(commandName: string, handler: (argv: Argv) => void) {
        this.handlers.push({
            key: commandName,
            handler,
        });
    }

    public run() {
        const argv = this.getArgv();
        let commandName: string = "none";

        Object.keys(argv).forEach((v, index) => {
            if (index === 0) {
                commandName = v;
            }
        });

        const handlers = this.handlers.filter((handlerData) => {
            return handlerData.key === commandName;
        });

        handlers.forEach((handler) => {
            handler.handler(argv);
        });
    }

    private getArgv(): { [key: string]: string | true } {
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
    }
}

export type Argv = { [key: string]: string | boolean };
export type Handler = { key: string; handler: (argv: Argv) => void };
