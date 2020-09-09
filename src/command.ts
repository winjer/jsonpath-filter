import { jsonfilter, update } from './filter';
import * as yaml from 'js-yaml';
import { reject } from 'ramda';
import { readFileSync } from 'fs';

export interface Argv {
    readonly file?: string;
    readonly yaml?: boolean;
    readonly replace?: string;
    readonly expression?: string;
    readonly _?: string[];
}

export const iscomment = (s: string) => s.length == 0 || s[0] == '#';

export const readInput = (argv: Argv): any => {
    const file = argv._?.length == 1 ? argv._[0] : 0;
    const content = readFileSync(file, 'utf-8');
    if (argv.yaml) {
        return yaml.safeLoad(content);
    } else {
        return JSON.parse(content.toString());
    }
};

export const dump = (obj: any, argv: Argv): string => {
    if (argv.yaml) {
        return yaml.safeDump(obj);
    } else {
        return JSON.stringify(obj, null, 2);
    }
};

const execute = (replace: string | undefined, input: any, ...expr: string[]): any =>
    replace ? update(input, replace, ...expr) : jsonfilter(input, ...expr);

export const command = (argv: Argv, input: any): any => {
    if (argv.expression) {
        return execute(argv.replace, input, argv.expression as string);
    } else {
        const filters = reject(
            iscomment,
            readFileSync(argv.file as string)
                .toString()
                .split('\n'),
        );
        return execute(argv.replace, input, ...filters);
    }
};
