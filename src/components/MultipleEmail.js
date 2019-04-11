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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    render() {
        const { tags} = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                           placeholder = {placeholder}
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                           handleDrag={this.handleDrag}
                           delimiters={delimiters}
                           />
            </div>
        )
    }
};

MultipleEmail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultipleEmail);