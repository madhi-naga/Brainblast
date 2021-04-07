import React from 'react';

class Cell extends React.Component {
    getValue() {
        const {value} = this.props;
        if (!value.revealed) {
            return value.flagged ? '🚩' : null;
        }

        if (value.mine) {
            return '💣';
        }

        if (value.neighbours === 0) {
            return null;
        }
        return value.neighbours;
    }

    render() {
        const {value, onClick, cMenu} = this.props;
        return (
            <div
                className={value.revealed ? "cell" : "cell-hidden"}
                onClick={this.props.onClick}
                onContextMenu={this.props.cMenu}
            >
                {this.getValue()}
            </div>
        );
    }
}
export default Cell;
