export type LoggerLevel = "info" | "info-segment" | "error";

export function print(level: LoggerLevel, ...message: any[]) {
    switch (level) {
        case "error":
            console.error(...message);
            break;
        case "info":
            console.log(...message);
            break;
        case "info-segment":
            process.stdout.write(`${message.join(" ")}`);
            break;
    }
}

export function info(...message) {
    return print("info", ...message);
}

export function error(...message) {
    return print("error", ...message);
}