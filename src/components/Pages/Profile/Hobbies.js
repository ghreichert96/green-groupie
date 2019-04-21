import React, { Component } from 'react';
import { HobbyItem } from './HobbyItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

class Hobbies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbies: [
        'test@gmail.com',
        'test2@gmail.com'

      ],
      deleted: false
    }
  }

  addHobby(event) {
    let currentHobbies = this.state.hobbies;
    let textBox = event.target.previousElementSibling;

    if (textBox.value) {
      currentHobbies.push(textBox.value);
      textBox.value = '';

      this.setState({
        hobbies: currentHobbies
      });
    }
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  removeHobby(event) {
    let currentHobby = event.target.textContent;
    let updatedHobbies = this.state.hobbies.filter((hobby) => {
      return currentHobby !== hobby;
    });

    this.setState({
      hobbies: updatedHobbies
    });

    !this.state.deleted && this.setState({
      deleted: true
    });
  }

  render() {
    let cssHobbyItem = 'hobby-item';
    let temp = this;
    let hobbyItems = this.state.hobbies.map((hobby, i) => {
      return <ListItem

      className={cssHobbyItem}
      selected={this.state.selectedIndex === i}
      onClick={event => temp.handleListItemClick(event, i)}


      key={cssHobbyItem + i}
    >

    <ListItemText primary={hobby} />

        <Button size="small"
                variant="contained"
                color="secondary"


                onClick={this.removeHobby.bind(this)}
                >
          Delete
        </Button>
        </ListItem>





        ;
    });

    return (
      <div className="hobbies-list">
        <nav className="nav-add">
          <input type="text" id="input-add" />
          <button id="new-hobby"
                  onClick={this.addHobby.bind(this)}>New Hobby</button>
        </nav>

        <ul>
          {hobbyItems}
        </ul>
      </div>
    );
  }
}

export { Hobbies };