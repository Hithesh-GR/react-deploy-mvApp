import React from "react";
import { createMuiTheme, MuiThemeProvider, Card, Button, AppBar, MenuItem, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Favourites from '../components/favourite';
// import FavPage from '../components/favPage';
import "../App.css";
// require('dotenv').config();
const types = [
    {
        value: fetch(`http://www.omdbapi.com/?apikey=9b9147&Type=movie`),
        label: 'Movies',
    },
    {
        value: fetch(`http://www.omdbapi.com/?apikey=9b9147&Type=series`),
        label: 'Series',
    },
    {
        value: fetch(`http://www.omdbapi.com/?apikey=9b9147&Type=episode`),
        label: 'Episodes',
    },
];
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "#fff",
                backgroundColor: "ivory",
                height: "60px"
            },
            root: {
                height: "fit-content"
            }
        },
        MuiCard: {
            root: {
                backgroundColor: "silver"
            },
        },
        MuiButton: {
            root: {
                textTransform: "none"
            },
            containedPrimary: {
                color: "black",
                backgroundColor: "indianred"
            }
        },
        MuiMenuItem: {
            root: {
                // overflow: "auto",
                fontSize: "10px"
            },
            gutters: {
                paddingLeft: "4px",
                paddingRight: "unset"
            }
        },
        MuiOutlinedInput: {
            input: {
                padding: "18.5px 150px"
            }
        }
    },
    typography: {
        useNextVariants: true,
    },
})
export default class SearchMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            movies: [],
            favourite: false
        };
    }

    keywordChanged = (event) => {
        this.setState({
            keyword: event.target.value
        })
    }
    handleEnter = (event) => {
        try {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.searchMovie(event);
            }
        } catch (err) {
            console.log("error at handleEnter");
        }
    };
    searchMovie = (event) => {
        try {
            // var apiKey = process.env.REACT_APP_API_KEY;
            event.preventDefault();
            if (!this.state.keyword) {
                alert('Enter Input');
            } else
                fetch(`http://www.omdbapi.com/?apikey=9b9147&s=${this.state.keyword}`)
                    .then(response => response.json())
                    .then(this.renderMovies)
        } catch (err) {
            console.log("error at searchMovie");
        }
    }
    renderMovies = (response) => {
        console.log(response);
        this.setState({
            movies: response.Search
        })
    }
    handleFav = (value) => {
        try {
            this.setState({ favourite: value });
        } catch (err) {
            console.log("error at handleFav");
        }
    }
    favclick = e => {
        try {
            e.preventDefault();
            this.props.history.push('/favourites');
        } catch (err) {
            console.log("error at favclick");
        }
    };
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="dashboard">
                    <AppBar position="static" align="center">
                        <div id="appBar">
                            <div>
                                <Button id="heading" color="primary">Home</Button>
                            </div>
                            <div>
                                <span id="heading1">Movie Search App</span>
                            </div>
                            <div>
                                <Button id="heading2" color="secondary" onClick={this.favclick}>Favourites</Button>
                            </div>
                        </div>
                    </AppBar>
                    <div className="box">
                        <div><TextField
                            id="outlined-search"
                            label="Search Movie"
                            type="search"
                            variant="outlined"
                            value={this.state.keyword}
                            onChange={this.keywordChanged}
                            onKeyPress={this.handleEnter}
                        /></div>
                        <div style={{ marginRight: "auto" }}><TextField
                            id="outlined-select"
                            label="Select"
                            select
                            variant="outlined">
                            {types.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField></div>
                        <div style={{ marginRight: "150px" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                title="click on search"
                                onClick={this.searchMovie}
                                startIcon={<SearchIcon />}>
                                search
                            </Button>
                        </div>
                    </div>
                    <div className="card">
                        {
                            !this.state.movies ?
                                <div style={{ display: "block", marginLeft: "40%" }}>
                                    <img style={{ width: "200%" }} src={require("../images/unavail.png")}
                                        alt="" />
                                </div>
                                :
                                this.state.movies.map(
                                    (movie, index) =>
                                        <div key={index} style={{}}>
                                            <Card className="createNote1">
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div>
                                                        <div>
                                                            <img src={movie.Poster} alt="poster"
                                                                style={{ width: "30%" }}>
                                                            </img>
                                                        </div>
                                                        <div><h2>{movie.Title}</h2>
                                                            {movie.Year}</div>
                                                    </div>
                                                    <div>
                                                        <Favourites
                                                            favMovies={this.state.movies}
                                                            cardPropsToFav={this.handleFav}
                                                            id={movie.imdbID}
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                )
                        }
                    </div>
                </div >
            </MuiThemeProvider >
        );
    }
}
