import React from "react";
import { Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "../App.css";
export default class favPin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavourite: false
        };
    }
    handleClick = (event) => {
        console.log(event);
        try {
            this.setState({ isFavourite: this.props.favMovies });
            this.setState({ isFavourite: !this.state.isFavourite });
            this.props.cardPropsToFav(this.state.isFavourite, this.props.id)
        } catch (err) {
            console.log("error at handleClick");
        }
    }
    render() {
        return (
            <div>
                {!this.props.favMovies ?
                    <Tooltip title="UnFavourite" onClick={() => this.handleClick()}>
                        <FavoriteIcon />
                    </Tooltip>
                    :
                    <Tooltip title="Favourite" onClick={() => this.handleClick()}>
                        <FavoriteBorderIcon />
                    </Tooltip>
                }
            </div>
        );
    }
}
