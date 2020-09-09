import * as yargs from 'yargs';
import { command } from './command';

const argv = yargs
    .option('file', {
        alias: 'f',
        type: 'string',
        describe: 'a file containing jsonpath expressions, one per line',
    })
    .option('yaml', {
        alias: 'y',
        type: 'boolean',
        describe: 'parse and emit yaml instead of json',
    })
    .option('replace', {
        alias: 'r',
        type: 'string',
        describe:
            "instead of filtering, replace the found path's values with the specified value and return all else unchanged",
    })
    .option('expression', {
        alias: 'e',
        type: 'string',
        describe: 'a jsonpath expression',
    }).argv;

if (argv.expression && argv.file) {
    console.error('Specify only one of -e or -f');
    process.exit(1);
}

if (!argv.expression && !argv.file) {
    console.error('Specify one of -e or -f');
    process.exit(1);
}

if (argv._.length > 1) {
    console.error('Specify only one input file');
    process.exit(1);
}

command(argv);
