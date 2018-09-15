import React, { Component } from 'react';
import styled from 'styled-components';


//CSS
const StyledButton = styled.button`
	border: 1px solid #cccccc;
	border-radius: 3px;
	margin-bottom: 5px;
	background: #f3f3f3;
	color: #404040;
	:hover {background: #E8E8E8;}
`;

class Button extends Component {
	render() {
		return (
			<StyledButton className="button" onClick={this.props.onClick}>
				{this.props.name}
			</StyledButton>
		);
	}
}

export default Button;