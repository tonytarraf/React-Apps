import React, { Component } from "react";
import _ from "lodash";

// We use the bracketr notation to access a property dynamically, ie: item[column.path]
// However, this only works for simple properties,
// if you're dealing with nests of properties, this does not work.
// In this application, one of our properties is genre.name, so we can't use the bracket notation here.
// Instead we're going to use lodash

class TableBody extends Component {
    rencerCell = (item, column) => {
        if (column.content) return column.content(item);

        return _.get(item, column.path);
    };

    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    };

    render() {
        const { data, columns } = this.props;
        return (
            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        {columns.map((column) => (
                            <td key={this.createKey(item, column)}>
                                {this.rencerCell(item, column)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableBody;
