import './MuiDropDown.css';
import React from 'react';
import { useRef, useState } from 'react';
import { InteractableList } from './InteractableList';

/**
 * Component representing a dropdown menu when removing an Interactable.
 * Relies on the InteractableList component.
 *
 * @returns Component for a dropdown menu when removing an Interactable.
 */
export default function MuiDropDown(): JSX.Element {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropDownFocus = (prevState: boolean) => {
    setOpen(!prevState);
  };

  return (
    <div className='Mui-drop-down'>
      <div className='Mui-dropdown-provider' ref={dropdownRef}>
        <button onClick={() => handleDropDownFocus(open)}>Remove an Interactable</button>
        {open && <InteractableList />}
      </div>
    </div>
  );
}
