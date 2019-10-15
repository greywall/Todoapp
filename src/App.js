import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import {
  CardMedia,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText
  // withStyles
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
// import Typography from "@material-ui/core/Typography";
// import ( withStyles) from '@material-ui/styles';

class App extends Component {
  constructor(props) {
    super(props);
    //create first state
    this.state = {
      powers: [
        { id: 0, title: "big head", activated: true },
        { id: 1, title: "Invisibility", activated: true },
        { id: 2, title: "Fly", activated: false },
        { id: 3, title: "Cuteness", activated: false }
      ],
      name: "Enzo"
    };
    this.powerInput = React.createRef();
  }

  toggleActivated = id => {
    const updatedPowers = this.state.powers.map(power => {
      if (power.id === id) {
        power.activated = !power.activated;
      }
      return power;
    });
    console.log(updatedPowers);
    //update state
    this.setState({ powers: updatedPowers });
  };

  handleDelete = id => {
    const updatedPowers = this.state.powers.filter(power => power.id !== id);
    this.setState({ powers: updatedPowers });
  };

  handleSubmit = event => {
    event.preventDefault();
    const input = this.powerInput.current.value;

    const newPower = {
      id: this.state.powers.length + 1,
      title: this.powerInput.current.value,
      activated: false
    };

    const updatedPowers = this.state.powers.push(newPower);
    //Update state
    this.setState({ power: updatedPowers });

    this.powerInput.current.value = "";
  };

  getActivePowers = () => {
    return this.state.powers.filter(power => power.activated).length;
  };

  render() {
    return (
      <Container maxWidth="xs">
        <Card>
          <CardMedia>
            <div className="App card-details">
              <Header name={this.state.name} />
              <div className="card-details">
                <h5>Powers:</h5>
                {/* </CardContent> */}

                <form onSubmit={event => this.handleSubmit(event)}>
                  <input
                    placeholder="Add a new power(hit enter)"
                    margin="normal"
                    fullWidth
                    ref={this.powerInput}
                  />
                </form>

                <div className="ListContainer">
                  {this.state.powers.length
                    ? this.state.powers.map(power => (
                        <PowerListItem
                          key={power.id}
                          power={power}
                          toggleActivated={this.toggleActivated}
                          handleDelete={this.handleDelete}
                        />
                      ))
                    : `${this.state.name} + no powers`}
                </div>
                <Footer getActivePowers={this.getActivePowers} />
              </div>
            </div>
          </CardMedia>
        </Card>
      </Container>
    );
  }
}

const Header = props => {
  return (
    <Fragment>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>{props.name}</h1>
    </Fragment>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired
};

Header.defaultProps = {
  name: "A Dog"
};

const PowerListItem = props => {
  console.log(props);
  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          type="checkbox"
          defaultChecked={props.power.activated}
          name="activated"
          onChange={() => props.toggleActivated(props.power.id)}
        />
      </ListItemIcon>
      <ListItemText primary={props.power.title} />

      <IconButton
        // className={classes.button}
        aria-label="delete"
        onClick={() => props.handleDelete(props.power.id)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

ListItem.propTypes = {
  power: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    activated: PropTypes.bool.isRequired
  }).isRequired
};

const Footer = props => {
  console.log(props);

  return <p>Active Powers: {props.getActivePowers()}</p>;
};
Footer.propTypes = {
  getActivePowers: PropTypes.func.isRequired
};

export default App;
