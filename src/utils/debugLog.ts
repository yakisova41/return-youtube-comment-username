export function debugLog(message: string, value: string = ""): void {
  console.log(`[rycu] ${message} %c${value}`, "color:cyan;");
}

export function debugErr(message: string): void {
  console.error(`[rycu] ${message}`);
}
