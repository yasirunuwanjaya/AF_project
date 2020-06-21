import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles => ({
    root: {
        maxWidth: 100,
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    pos: {
        marginBottom: 12,
    },
});

export default class addNewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addItemDialogOpen: false,
            itemName: "",
            itemDesc: "",
            itemPrice: "",
            itemDiscount: "",
            isItemDiscount: false
        }
    }
    handleClickOpen = () => {
        this.setState({
            ...this.state,
            addItemDialogOpen: true
        })
    };
    handleClose = () => {
        this.setState({
            ...this.state,
            addItemDialogOpen: false
        })
    };
    handleAdd = () => {
        this.props.addNewItem({ itemName: this.state.itemName, catId: this.props.catId, itemDesc: this.state.itemDesc, itemPrice: this.state.itemPrice, isItemDiscount: this.state.isItemDiscount })
        this.setState({
            ...this.state,
            addItemDialogOpen: false,
            itemName: "",
            itemDesc: "",
            itemPrice: ""
        })
    }
    onNameChange = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            [event.target.name]: event.target.value
        })

    }
    render() {
        const classes = useStyles();
        return (
            <div>
                <div style={{ position: 'relative' }}>
                    <div style={{ alignItems: 'center' }}>
                        <Card className={classes.root} variant="outlined" style={{ minHeight: 350 }}>
                            <CardActionArea onClick={this.handleClickOpen}>
                                <CardContent style={{ alignContent: 'center' }}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Fashion Shop
                                </Typography>
                                    <Typography variant="h5" component="h2">
                                        Add new item
                                    </Typography>
                                </CardContent>
                                <AddCircleOutlineIcon fontSize="large" />

                            </CardActionArea>
                        </Card>
                    </div>
                </div>
                <Dialog
                    open={this.state.addItemDialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Add New Item"}</DialogTitle>
                    <DialogContent>
                        <div>
                            <TextField id="standard-basic" label="Item Name" name='itemName' value={this.state.itemName} onChange={event => this.onNameChange(event)} />
                        </div>
                        <div>
                            <TextField id="standard-basic" label="Item Description" name='itemDesc' value={this.state.itemDesc} onChange={event => this.onNameChange(event)} />
                        </div>
                        <div>
                            <TextField id="standard-basic" label="Item Price" name='itemPrice' value={this.state.itemPrice} onChange={event => this.onNameChange(event)} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAdd} color="primary">
                            Add
                    </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Return
                    </Button>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}
