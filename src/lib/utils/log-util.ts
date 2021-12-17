import * as chalk from 'chalk';
const _log = console.log;

const logUtil = {
  cyan: (...args: string[]) => {
    _log(chalk.cyan(args.join(',')));
  },
  yellow: (...args: any) => {
    _log(chalk.yellow(args.join(',')));
  }
};


export default logUtil;