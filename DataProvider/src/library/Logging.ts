export default class Logging {
    public static log = (args: any) => this.info(args);
    public static info = (args: any) => console.log(`[${new Date().toLocaleString()}] [INFO]`, typeof args === 'string' ? args : args);
    public static warning = (args: any) => console.log(`[${new Date().toLocaleString()}] [WARN]`, typeof args === 'string' ? args : args);
    public static error = (args: any) => console.log(`[${new Date().toLocaleString()}] [ERROR]`, typeof args === 'string' ? args : args);
}
