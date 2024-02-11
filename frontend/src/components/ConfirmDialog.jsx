import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const ConfirmDialog = ({ open, msg = 'Are you sure?', dialogTitle = 'Attention', yesOption = 'Yes', noOption = 'No', confirm = () => { }, disconfirm = () => { } }) => {
    return (
        <Dialog
            open={open}
            onClose={disconfirm}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {msg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={disconfirm}>
                    {noOption}
                </Button>
                <Button onClick={confirm} autoFocus>
                    {yesOption}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
