import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import AddCategory from './addNewCategory';
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
import CardActionArea from '@material-ui/core/CardActionArea';
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

export default class categoryList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categoryList: [],
            categoryName: "",
            categoryDesc: "",
            categoryId: "",
            updateCategoryDialogOpen: false
        }
    }

    componentDidMount() {
        this.getAllCategories();
    }

    getAllCategories = () => {
        axios.get(commonConstants.API + '/category').then(res => {
            this.setState({
                categoryList: res.data.data || res.data
            });
        })
    }

    addNewCategory = (categoryDetails) => {
        axios.post(commonConstants.API + '/category', { categoryName: categoryDetails.categoryName, categoryDesc: categoryDetails.categoryDesc }).then(result => {
            if (result.status === 200) {
                this.getAllCategories();
            }
        }).catch(err => {
            alert(err);
        })
    }
    removeCategory = (id) => {
        axios.delete(commonConstants.API + '/item/itemlist/' + id).then(results => {
            if (results.status === 200) {
                axios.delete(commonConstants.API + '/category/' + id).then(results => {
                    if (results.status === 200) {
                        this.getAllCategories();
                    }
                })
            }
        })
    }
    handleClickOpen = (id) => {
        this.setState({
            ...this.state,
            updateCategoryDialogOpen: true,
            categoryId: id
        })
    };
    handleAdd = (id) => {
        axios.put(commonConstants.API + '/category/' + id, { categoryName: this.state.categoryName, categoryDesc: this.state.categoryDesc }).then(results => {
            if (results.status === 200) {
                this.getAllCategories();
            }
            this.setState({
                ...this.state,
                updateCategoryDialogOpen: false,
                categoryName: "",
                categoryDesc: ""
            })
        })

    }
    handleClose = () => {
        this.setState({
            ...this.state,
            updateCategoryDialogOpen: false
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
            <div style={{ flexGrow: 1, marginTop: '30px' }}>
                <Typography variant="h3" gutterBottom>
                    Category List
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <AddCategory addCategory={category => this.addNewCategory(category)} />
                    </Grid>
                    {this.state.categoryList.map((category) =>
                        <Grid item xs={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Link to={`/itemList/${category._id}/${category.categoryName}`}>
                                        <CardActionArea>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                Fashion Shop
                                </Typography>
                                            <Typography variant="h5" component="h2">
                                                {category.categoryName}
                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                                {category.categoryDesc}
                                            </Typography>
                                        </CardActionArea>
                                    </Link>
                                    <Button style={{ width: '100%', marginTop: '5px' }} variant="outlined" startIcon={<EditIcon />} onClick={(e) => this.handleClickOpen(category._id)}>
                                        Edit
                                    </Button>
                                    <Button style={{ width: '100%', marginTop: '10px', color: 'red' }} variant="outlined" startIcon={<DeleteIcon />} onClick={(e) => this.removeCategory(category._id)}>
                                        Remove
                                    </Button>
                                </CardContent>
                            </Card>

                            <Dialog
                                open={this.state.updateCategoryDialogOpen}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Update Category"}</DialogTitle>
                                <DialogContent>
                                    <div>
                                        <TextField id="standard-basic" label="Category Name" name='categoryName' defaultValue={category.categoryName} value={this.state.categoryName}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                let catName = this.state.categoryName;
                                                catName = e.target.value
                                                this.setState({
                                                    categoryName: catName
                                                })
                                            }} />
                                    </div>
                                    <div>
                                        <TextField id="standard-basic" label="Category Description" name='categoryDesc' defaultValue={category.categoryDesc} value={this.state.categoryDesc}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                let catDesc = this.state.categoryDesc;
                                                catDesc = e.target.value
                                                this.setState({
                                                    categoryDesc: catDesc
                                                })
                                            }}
                                        />
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={(e) => this.handleAdd(this.state.categoryId)} color="primary">
                                        Update
                                    </Button>
                                    <Button onClick={this.handleClose} color="primary" autoFocus>
                                        Return
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    )}
                </Grid>
            </div>
        )
    }
}
