import React from 'react';

class Button extends React.Component {
    render() {
        return <button type={this.props.btnType}  className={`btn ${this.props.btnDesign}`}>{this.props.btnName}</button>
    }
}

Button.defaultProps = {
    btnType: "button",
    btnDesign: "default"
};

export default Button;