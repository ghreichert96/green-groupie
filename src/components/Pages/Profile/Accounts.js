import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, Dialog } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import AccountIcon from './AccountIcon';

const Accounts = ({ accounts, deleteAccount, addAccount }) => (
    <List>
        {accounts.map(account => (
            <ListItem key={account.id}>
                <ListItemIcon>
                    <AccountIcon type={account.type} />
                </ListItemIcon>
                <ListItemText primary={account.type} secondary={account.display} />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={deleteAccount.bind(null, account.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))}
        <ListItem button onClick={addAccount}>
            <ListItemIcon>
                <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Connect an account" />
        </ListItem>
    </List>
);

export default Accounts;