import React, { Component } from 'react'
import axios from 'axios';
import AddItem from './addNewItem';
import commonConstants from '../util/constants';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles => ({
    root: {
        maxWidth: 100,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    pos: {
        marginBottom: 12,
    },
});

export default class itemList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemList: [],
            itemName: "",
            itemDesc: "",
            itemId: "",
            itemPrice: "",
            itemDiscount: "",
            isItemDiscount: false,
            updateitemDialogOpen: false,
            updateitemDiscountDialogOpen: false
        }
    }

    componentDidMount() {
        this.getAllItems();
    }

    getAllItems = () => {
        axios.get(commonConstants.API + '/item/' + this.props.match.params.id).then(res => {
            this.setState({
                itemList: res.data.data || res.data
            });
        })
    }

    addNewItem = (itemDetails) => {
        axios.post(commonConstants.API + '/item', { itemName: itemDetails.itemName, catId: itemDetails.catId, itemDesc: itemDetails.itemDesc, itemPrice: itemDetails.itemPrice, isItemDiscount: itemDetails.isItemDiscount }).then(result => {
            if (result.status === 200) {
                this.getAllItems();
            }
        }).catch(err => {
            alert(err);
        })
    }
    removeItem = (id) => {
        axios.delete(commonConstants.API + '/item/' + id).then(results => {
            if (results.status === 200) {
                this.getAllItems();
            }
        })
    }
    removeDiscount = (id) => {
        axios.put(commonConstants.API + '/item/' + id, { itemName: this.state.itemName, catId: this.props.match.params.id, itemDiscount: "", isItemDiscount: false }).then(results => {
            if (results.status === 200) {
                this.getAllItems();
            }
            this.setState({
                ...this.state,
                updateitemDiscountDialogOpen: false,
                itemName: "",
                itemDesc: "",
                itemPrice: "",

            })
        })
    }
    handleClickOpen = (id, itmName, itmDesc, itmPrice) => {
        this.setState({
            ...this.state,
            updateitemDialogOpen: true,
            itemId: id,
            itemName: itmName,
            itemDesc: itmDesc,
            itemPrice: itmPrice
        })
    };
    handleClickDiscountOpen = (id, itmName, itmDiscount, isItmDiscount) => {
        this.setState({
            ...this.state,
            updateitemDiscountDialogOpen: true,
            itemId: id,
            itemName: itmName,
            itemDiscount: itmDiscount,
            isItemDiscount: isItmDiscount
        })
    };
    handleAdd = (id) => {
        axios.put(commonConstants.API + '/item/' + id, { itemName: this.state.itemName, catId: this.props.match.params.id, itemDesc: this.state.itemDesc, itemPrice: this.state.itemPrice }).then(results => {
            if (results.status === 200) {
                this.getAllItems();
            }
            this.setState({
                ...this.state,
                updateitemDialogOpen: false,
                itemName: "",
                itemDesc: "",
                itemPrice: "",

            })
        })

    }
    handleDiscountAdd = (id) => {
        axios.put(commonConstants.API + '/item/' + id, { itemName: this.state.itemName, catId: this.props.match.params.id, itemDiscount: this.state.itemDiscount, isItemDiscount: true }).then(results => {
            if (results.status === 200) {
                this.getAllItems();
            }
            this.setState({
                ...this.state,
                updateitemDiscountDialogOpen: false,
                itemName: "",
                itemDiscount: ""
            })
        })
        this.setState({
            ...this.state,
            updateitemDiscountDialogOpen: true
        })

    }
    handleClose = () => {
        this.setState({
            ...this.state,
            updateitemDialogOpen: false
        })
    };
    handleDiscountClose = () => {
        this.setState({
            ...this.state,
            updateitemDiscountDialogOpen: false
        })
    };
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
            <div style={{ flexGrow: 1, marginTop: '50px' }}>
                <Typography variant="h3" gutterBottom>
                    {this.props.match.params.name} Item List
                </Typography>
                <Container >
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <AddItem addNewItem={item => this.addNewItem(item)} catId={this.props.match.params.id} />
                        </Grid>
                        {this.state.itemList.map((item) =>
                            <Grid item xs={3}>
                                <div style={{ position: 'relative' }}>
                                    <Card className={classes.root} variant="outlined" style={{ minHeight: 350 }}>
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                Fashion Shop
                                </Typography>
                                            <Typography variant="h5" component="h2">
                                                {item.itemName}
                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                                {item.itemDesc}
                                            </Typography>

                                            {item.isItemDiscount ?
                                                <div>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        <strike>
                                                            LKR: {(parseFloat(item.itemPrice)).toFixed(2)}
                                                        </strike>
                                                    </Typography>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        {parseFloat(item.itemDiscount)}%
                                            </Typography>
                                                    <Typography className={classes.pos} >
                                                        LKR: {(parseFloat(item.itemPrice) - parseFloat(item.itemPrice) * parseFloat(item.itemDiscount) / 100).toFixed(2)}
                                                    </Typography>
                                                </div>
                                                :
                                                <Typography className={classes.pos} >
                                                    LKR: {(parseFloat(item.itemPrice)).toFixed(2)}
                                                </Typography>
                                            }
                                            <div style={{ position: 'absolute', bottom: '10px' }}>
                                                <Button style={{ width: '100%', marginTop: '5px', color: 'green' }} variant="outlined" onClick={(e) => this.handleClickDiscountOpen(item._id, item.itemName, item.itemDiscount, item.isItemDiscount)}>
                                                    Discount
                                                </Button>

                                                <Button style={{ width: '100%', marginTop: '5px' }} variant="outlined" startIcon={<EditIcon />} onClick={(e) => this.handleClickOpen(item._id, item.itemName, item.itemDesc, item.itemPrice)}>
                                                    Edit Item
                                                </Button>
                                                <Button style={{ width: '100%', marginTop: '10px', color: 'red' }} variant="outlined" startIcon={<DeleteIcon />} onClick={(e) => this.removeItem(item._id)}>
                                                    Remove
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>
                        )}
                    </Grid>
                    <Dialog
                        open={this.state.updateitemDialogOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Update Item"}</DialogTitle>
                        <DialogContent>
                            <div>
                                <TextField id="standard-basic" label="Item Name" name='itemName' value={this.state.itemName}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        let itmName = this.state.itemName;
                                        itmName = e.target.value
                                        this.setState({
                                            itemName: itmName
                                        })
                                    }} />
                            </div>
                            <div>
                                <TextField id="standard-basic" label="Item Description" name='itemDesc' value={this.state.itemDesc}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        let itmDesc = this.state.itemDesc;
                                        itmDesc = e.target.value
                                        this.setState({
                                            itemDesc: itmDesc
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField id="standard-basic" label="Item Price" name='itemPrice' value={this.state.itemPrice}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        let itmPrice = this.state.itemPrice;
                                        itmPrice = e.target.value
                                        this.setState({
                                            itemPrice: itmPrice
                                        })
                                    }}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.handleAdd(this.state.itemId)} color="primary">
                                Update
                                    </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Return
                                    </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.updateitemDiscountDialogOpen}
                        onClose={this.handleDiscountClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Update Item"}</DialogTitle>
                        <DialogContent>
                            <div>
                                <TextField id="standard-basic" label="Item Discount" name='itemDiscount' value={this.state.itemDiscount}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        let itmDiscount = this.state.itemDiscount;
                                        itmDiscount = e.target.value
                                        this.setState({
                                            itemDiscount: itmDiscount
                                        })
                                    }} />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.handleDiscountAdd(this.state.itemId)} color="primary">
                                Add
                                    </Button>
                            <Button disabled={!this.state.isItemDiscount} onClick={(e) => this.removeDiscount(this.state.itemId)} color="primary">
                                Remove
                                    </Button>
                            <Button onClick={this.handleDiscountClose} color="primary" autoFocus>
                                Return
                                    </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </div>
        )
    }
}
