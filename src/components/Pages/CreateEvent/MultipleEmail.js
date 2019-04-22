import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './EmailInputStyle.css';

const KeyCodes = {
    comma: 188,
    enter: 13,
    space: 32
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
let placeholder = "Add new participant"
function MultipleEmail({ tags, handleDelete, handleAddition, handleDrag }) {
    return (
        <ReactTags tags={tags}
                    placeholder={placeholder}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={delimiters}
                    />
    );
}

export default MultipleEmail;
