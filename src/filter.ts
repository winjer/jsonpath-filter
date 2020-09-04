import { reverse, reduce, flatten, map, tail, head } from 'ramda';
import * as jsonpath from 'jsonpath';

export type PathComponent = string | number;

export interface Node {
    readonly path: PathComponent[];
    readonly value: any;
}

export const construct = (value: any, term: PathComponent) => {
    if (term == '$') {
        return value;
    }
    if (typeof term == 'number') {
        const n: any = [];
        n[term] = value;
        return n;
    }
    return { [term]: value };
};

export const make = (path: PathComponent[], value: any) => reduce(construct, value, reverse(path));

export const inject = (orig: any, node: Node): any => {
    const obj = Array.isArray(orig) ? [...orig] : { ...orig };
    const term = head(node.path) as PathComponent;
    const path = tail(node.path);
    if (path.length == 0) {
        obj[term] = node.value;
    } else {
        if (term == '$') {
            return inject(obj, { value: node.value, path });
        }
        if (typeof obj[term] == 'undefined') {
            obj[term] = make(path, node.value);
        } else {
            obj[term] = inject(obj[term], { value: node.value, path });
        }
    }
    return obj;
};

export const assemble = (nodes: Node[]) => reduce(inject, {}, nodes);

export const jsonfilter = (obj: any, ...expr: string[]) => assemble(flatten(map((e) => jsonpath.nodes(obj, e), expr)));
