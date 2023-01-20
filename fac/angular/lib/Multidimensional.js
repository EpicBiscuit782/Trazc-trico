Object.propsEquals = function(o, v)
{
    var keys = [];

    if (Array.isArray(v)) {
        // Is recursive array values search.
        v.forEach(function(e) {
            keys = Array.intersects(keys, Object.propsEquals(o, e));
        },v);
    } else {
        for (var pname in o) {
            if (v == o[pname]) {
                keys.push(pname);
            }
        }
    }
    return keys;
}
Array.findIndexes = function(a, v)
{
    var keys = [];
    a.forEach(function(element,index) {
        if (v == element) {
            keys.push(index);
        }
    }, a);
    return keys;
}

Array.column = function(a, colname)
{
    var column = [];
    a.forEach(function(item, index) {
        if (item instanceof Object && item.hasOwnProperty(colname)) {
            column.push(item[colname]);
        } else {
            column.push(null);
        }
    },a);
    return column;
}

Array.unique = function(a)
{
    var out = [];
    a.forEach(function(v, i) {
        if (out.indexOf(v) === -1) {
            out.push(v);
        }
    },a);
    return out;
}
Array.toMultilist = function(a)
{
    var ml = {};
    Array.unique(a).forEach(function(e, i) {
        ml[e] = Array.findIndexes(a, e);
    }, a);
    return ml;
}
Array.intersects = function(a, b)
{
    var c = [];
    a.forEach(function(aV, aI) {
        b.forEach(function(bV, bI) {
            if (aV == bV) {
                c.push(aV);
            }
        });
    });
    return c;
}
Array.containsAny = function(a, b) {
    return Array.intersects(a, b).length > 0;
}


class Multidimensional
{
    constructor(data, dimensions)
    {
        this.data = data;
        this.dims = {};
        dimensions.forEach(function(v) {
            this.dims[v] = {
                'rows': Array.toMultilist(Array.column(data,v))
            };
        },this);
    }
    getDimensionValues(dimension, filter)
    {
        var values = Object.keys(this.dims[dimension].rows);
        if (filter) {
            var indexes = this.filterIndexesByCoordinates(this.dims, filter);
            var matches = [];
            values.forEach(function(e, i){
                if (Array.containsAny(this.dims[dimension].rows[e],indexes)) {
                    matches.push(e);
                }
            }, this);
            return matches;
            // return Array.intersects(
            //     this.filterIndexesByCoordinates(this.dims, filter)
            // );
        }
        return values;
    }
    /**
     *
     * @param {*} defaultValue
     * @param {object} coordinates
     * @param {function} aggregation
     * @param {string} column
     */
    getCell(defaultValue, coordinates, aggregation, column)
    {
        var rows, indexes, emptyCoords = false;

        // Checks if
        if (Object.keys(coordinates).length === 0) {
            rows = this.data;
            emptyCoords = true;
        } else {
            // Retrieves the rows that cotains values on given coordinates
            indexes = this.filterIndexesByCoordinates(this.dims, coordinates);
            if (indexes.length === 0) return defaultValue;
            rows = this.data.filter((v,i) => indexes.indexOf(i) >= 0);
        }

        if (aggregation == 'count') {
            return emptyCoords ? this.data.length : indexes.length;
        }

        if (!emptyCoords) {
        }

        // Performs aggregation
        if (typeof column === 'undefined') {
            // When column isn't especified.
            return aggregation(rows);
        } else {
            // Only passes the values on especified column.
            return aggregation(Array.column(rows, column));
        }
        return defaultValue;
    }
    filterIndexesByCoordinates(dimensions, coordinates)
    {
        var indexes = [];
        var isFirst = true;
        for(var c in coordinates) {
            if (isFirst) {
                indexes = this.concatPropValues(dimensions[c].rows, coordinates[c]);
                isFirst = false;
            } else {
                indexes = Array.intersects(
                    indexes,
                    this.concatPropValues(dimensions[c].rows, coordinates[c])
                );
            }
            if (indexes.length === 0) {
                return [];
            }
        }
        return indexes;
    }
    concatPropValues(o, p)
    {
        var v = [];
        if (Array.isArray(p)) {
            p.forEach(function(e) {
                v.concat(concatPropValues(o, e));
            });
        } else {
            if (o.hasOwnProperty(p) && Array.isArray(o[p])) {
                return o[p];
            }
        }
        return [];
    }
}
