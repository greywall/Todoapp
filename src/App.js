import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import {
  CardMedia,
  Checkbox,
  TextField,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import Typography from "@material-ui/core/Typography";
import { Typography } from "@material-ui/system";
import ( withStyles) from '@material-ui/styles';

const name = "Enzo";
const powers = [
  { id: 0, title: "big head", activated: true },
  { id: 1, title: "Invisibility", activated: true },
  { id: 2, title: "Fly", activated: false },
  { id: 3, title: "Cuteness", activated: false }
];
class App extends Component {
  getActivePowers = () => {
    return powers.filter(power => power.activated).length;
  };

  render() {
    return (
      <Container maxWidth="xs">
        <Card>
          <CardMedia>
            <div className="App card-details">
              <Header name={name} />
              <div className="card-details">
                <h5>Powers:</h5>
                {/* </CardContent> */}
                <form>
                  <TextField
                    placeholder="Add a new power(hit enter)"
                    margin="normal"
                    fullWidth
                  />
                </form>
                <div className="ListContainer">
                  {powers.length
                    ? powers.map(power => (
                        <PowerListItem key={power.id} power={power} />
                      ))
                    : `${name} + no powers`}
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
        />
      </ListItemIcon>
      <ListItemText primary={props.power.title} />
      <DeleteIcon className="deleteIconName"></DeleteIcon>
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
  <Typography
  >
  return <p>Active Powers: {props.getActivePowers()}</p>;
  </Typography>
};
Footer.propTypes = {
  getActivePowers: PropTypes.func.isRequired
};

export default App;
