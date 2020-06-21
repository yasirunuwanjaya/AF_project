import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import CategoryList from './categoryList';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemList: []
        }
    }

    render() {

        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{
                        minHeight: '100vh',
                    }}
                >
                    <Grid item xs={10}>
                        <Card style={{
                            margin: "auto",
                            transition: "0.3s",
                            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                            "&:hover": {
                                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                            },
                            fontFamily: "sans-serif",
                            textAlign: "center",
                            backgroundColor: "lightGrey",
                            padding: "2%",
                            borderRadius: "5%"
                        }}>
                            <CardActionArea>
                                <CardContent>

                                    <div style={{
                                        backgroundColor: "white",
                                        padding: "2%",
                                        borderRadius: "5%"
                                    }}>
                                        <Typography gutterBottom variant="h2" component="h2" style={{
                                            fontWeight: "bold",
                                        }}>
                                            Fashion Store
                                        </Typography>
                                        <Typography variant="body2" component="p" >
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                                            classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                                            professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,
                                            from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
                                            undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                                            (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
                                            very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from
                                            a line in section 1.10.32.
                                        </Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <CategoryList />
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default MainScreen;