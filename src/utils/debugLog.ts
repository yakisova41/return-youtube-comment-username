export function debugLog(message: string | Error, value: string = ""): void {
  console.log(`[rycu] ${message} %c${value}`, "color:cyan;");
}

export function debugErr(message: string | Error): void {
  console.error(`[rycu] ${message}`);
}
