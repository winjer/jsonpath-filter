import { jsonfilter } from './filter';
import * as yargs from 'yargs';
import { reject } from 'ramda';
import { readFileSync } from 'fs';
const argv = yargs
    .option('file', {
        alias: 'f',
        describe: 'a file containing jsonpath expressions, one per line',
    })
    .option('expression', {
        alias: 'e',
        describe: 'a jsonpath expression',
    }).argv;

if (argv.e && argv.f) {
    console.error('Specify only one of -e or -f');
    process.exit(1);
}
if (argv._.length > 1) {
    console.error('Specify only one input file');
    process.exit(1);
}

const iscomment = (s: string) => s.length == 0 || s[0] == '#';

const readInput = (): any => {
    if (argv._.length == 1) {
        return JSON.parse(readFileSync(argv._[0], 'utf-8').toString());
    } else {
        return JSON.parse(readFileSync(0, 'utf-8').toString());
    }
};

const input = readInput();

if (argv.e) {
    console.log(JSON.stringify(jsonfilter(input, argv.e as string), null, 2));
}

if (argv.f) {
    const filters = reject(
        iscomment,
        readFileSync(argv.f as string)
            .toString()
            .split('\n'),
    );
    console.log(JSON.stringify(jsonfilter(input, ...filters), null, 2));
}
