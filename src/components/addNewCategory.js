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

export default class addNewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCategoryDialogOpen: false,
            categoryName: "",
            categoryDesc: ""
        }
    }
    handleClickOpen = () => {
        this.setState({
            ...this.state,
            addCategoryDialogOpen: true
        })
    };
    handleClose = () => {
        this.setState({
            ...this.state,
            addCategoryDialogOpen: false
        })
    };
    handleAdd = () => {
        this.props.addCategory({ categoryName: this.state.categoryName, categoryDesc: this.state.categoryDesc })
        this.setState({
            ...this.state,
            addCategoryDialogOpen: false,
            categoryName: "",
            categoryDesc: ""
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

                <Card className={classes.root} variant="outlined" style={{ minHeight: 215 }}>
                    <CardActionArea onClick={this.handleClickOpen}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Fashion Shop
                                </Typography>
                            <Typography variant="h5" component="h2">
                                Add new category
                                    </Typography>
                        </CardContent>
                        <AddCircleOutlineIcon fontSize="large" />

                    </CardActionArea>
                </Card>
                <Dialog
                    open={this.state.addCategoryDialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Add New Category"}</DialogTitle>
                    <DialogContent>
                        <div>
                            <TextField id="standard-basic" label="Category Name" name='categoryName' value={this.state.categoryName} onChange={event => this.onNameChange(event)} />
                        </div>
                        <div>
                            <TextField id="standard-basic" label="Category Description" name='categoryDesc' value={this.state.categoryDesc} onChange={event => this.onNameChange(event)} />
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
