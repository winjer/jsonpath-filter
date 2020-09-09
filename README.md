# jsonpath-filter

Filter javascript objects using an allow list of jsonpath expressions.

Includes a utility `jsonfilter` which can filter json files.

## The javascript filter function, `jsonfilter`

    import { jsonfilter } from 'jsonpath-filter';

    const data = {
        foo: 'bar'
    };
    const result = jsonfilter(data, '$.foo');
    // { foo: 'bar' }

## The update filter function, `update`

    import { update } from 'jsonpath-filter';

    const data = {
        foo: 'bar',
        wee: 'woo',
    };
    const result = update(data, 'baz', '$.foo');
    // { foo: 'baz', wee: 'woo' }

### Be careful about arrays

    If your jsonpath expression matches only some array entries, then you will retrieve them
    with the correct index. Entries prior to that in the array will be `undefined`.

    const data = {
        foo: ['a', 'b', 'c']
    };
    const result = jsonfilter(data, '$.foo[2]');
    // { foo: [undefined, undefined, 'c'] }

## Using the jsonfilter tool

    cat > sample.json < HERE
    {
      "foo": "bar",
      "baz": "quux",
      "zip": [
        { "name": "alice", "age": 22 },
        { "name": "bob", "age": 16 },
        { "name": "charlie", "age": 45 }
      ]
    }

    cat > sample.txt < HERE
    $.foo
    HERE

    jsonfilter -f sample.txt sample.json
    {
      "foo": "bar"
    }

    cat > sample.txt < HERE
    $.foo
    $.baz
    HERE

    jsonfilter -f sample.txt sample.json
    {
      "foo": "bar",
      "baz": "quux"
    }

    cat > sample.txt < HERE
    $.zip[*].name
    HERE

    jsonfilter -f sample.txt sample.json
    {
      "zip": [
        {
          "name": "alice"
        },
        {
          "name": "bob"
        },
        {
          "name": "charlie"
        }
      ]
    }

    jsonfilter -r george -f sample.txt sample.json
    {
      "zip": [
        {
          "name": "george",
          "age": 22
        },
        {
          "name": "george",
          "age": 16
        },
        {
          "name": "george"
          "age": 45
        }
      ]
    }
