import React from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import './EmailInputStyle.css';

const KeyCodes = {
    comma: 188,
    enter: 13,
};
const styles = theme => ({


});

const delimiters = [KeyCodes.comma, KeyCodes.enter];
let placeholder = "Add new Email"
class MultipleEmail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [

            ],

        };

    }



    render() {
        const { tags} = this.state;
        return (
            <div>
                <ReactTags tags={this.props.tags}
                           placeholder = {placeholder}
                           handleDelete={this.props.handleDelete}
                           handleAddition={this.props.handleAddition}
                           handleDrag={this.props.handleDrag}
                           delimiters={delimiters}
                           onChange={() => {console.log('testestst')}}
                           />
            </div>
        )
    }
};

MultipleEmail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultipleEmail);
