import React, {Component, Fragment} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';

const styles =  theme => ({
    FormControl: {
        width: 500
    }
})


export default withStyles(styles)(class extends Component{

    state = {
        open: false,
        exercise: {
            title: '',
            description: '',
            muscles: ''
        }
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            exercise:{
                ...this.state.exercise,
                [name]: value
            }
        })
    }

    handleSubmit = () => {
        const { exercise } = this.state

        this.props.onCreate({
            ...exercise,
            id: exercise.title.toLocaleLowerCase().replace(/ /g, '-')
        })

        this.setState({
            open: false,
            exercise: {
                title: '',
                description: '',
                muscles: ''
            }
        })
    }

    render() {

        const { open, exercise: { title, description, muscles } } = this.state,
            { classes, muscles: categories } = this.props

        return <Fragment>

                <Button variant="fab" onClick={this.handleToggle} aria-label="Add" mini>
                    <AddIcon />
                </Button>

                <Dialog
                    open={open}
                    onClose={this.handleToggle}
                >
                    <DialogTitle id="form-dialog-title">
                        Create new exercise
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Content
                        </DialogContentText>
                        <form>
                            <TextField
                                label="Title"
                                value={title}
                                onChange={this.handleChange('title')}
                                margin="normal"
                                className={classes.FormControl}
                            /><br/>
                            <FormControl className={classes.FormControl}>
                                <InputLabel shrink htmlFor="muscles">
                                    Muscles
                                </InputLabel>
                                <Select
                                    value={muscles}
                                    onChange={this.handleChange('muscles')}
                                >
                                    {categories.map(category =>
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    )}

                                </Select>
                                <FormHelperText>Label + placeholder</FormHelperText>
                            </FormControl><br/>
                            <TextField
                                multiline
                                rows="4"
                                label="Description"
                                value={description}
                                onChange={this.handleChange('description')}
                                margin="normal"
                                className={classes.FormControl}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={this.handleSubmit}
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
    }
})
