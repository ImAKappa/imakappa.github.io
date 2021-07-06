export class Logger {
  static log(statement: string, vars?: {}, classOrFuncName?: string) {
    let logOutput = `[${classOrFuncName ?? "Log"}]: ` + statement + '\n';
    for (let key in vars) {
      logOutput += '\t' + `${key}: ${vars[key]}` + '\n';
    }
    console.log(logOutput);
  }
}