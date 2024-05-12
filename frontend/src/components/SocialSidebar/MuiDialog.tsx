import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import useTownController from '../../hooks/useTownController';

/**
 * Component for creating a new Interactable.
 * Includes buttons for adding either a ConversationArea or a ViewingArea.
 * Clicking to add an Interactable emits events to the backend for handling these requests.
 *
 * @returns Component for creating a new Interactable.
 */
export default function MuiDialog(): JSX.Element {
  const currTownController = useTownController();
  const currPlayer = currTownController.ourPlayer;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Create a new Interactable</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-laelledby='dialog-title'
        aria-aria-describedby="'dialog-description">
        <DialogTitle id='dialog-title'>
          Select the type of Interactable you want to add:
          <DialogContent>
            <DialogContentText id='dialog-description'>
              A ViewingArea is for users to watch videos together with friends. A ConversationArea
              is for users to chat online with others.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                currTownController.emitConversationAreaAdded(currPlayer);
                setOpen(false);
              }}>
              ConversationArea
            </Button>
            <Button
              onClick={() => {
                currTownController.emitViewingAreaAdded(currPlayer);
                setOpen(false);
              }}>
              ViewingArea
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
        </DialogTitle>
      </Dialog>
    </>
  );
}
