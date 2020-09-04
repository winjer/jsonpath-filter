# jsonpath-filter

Filter javascript objects using an allow list of jsonpath expressions.

Includes a utility `jsonfilter` which can filter json files.

## Examples

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
