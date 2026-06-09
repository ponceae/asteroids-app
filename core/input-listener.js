/**
 * Main event listener module.
 * 
 * Listens for user input and maps it based on whether the key/touch was pressed or 
 * not.
 * 
 * @module Spaceship
 * @author Adrien P.
 */

import { KEY_MAP } from "././constants.js";

export const inputs = 
{
  thrust: false,
  turnLeft: false,
  turnRight: false,
  fire: false,
}

/**
 * Take a keyboard event and map it based on whether or not is was pressed.
 * 
 * @param {KeyboardEvent} event The current key data. 
 * @param {boolean} isPressed `true` if the key was pressed down, `false` if not.
 */
function handleKey(event, isPressed)
{
  const action = KEY_MAP[event.code];

  if (action)
  {
    inputs[action] = isPressed;

    if (event.code == 'Space' || event.code.startsWith('Arrow'))
    {
      event.preventDefault();
    }
  }
}

window.addEventListener('keydown', (e) => handleKey(e, true));
window.addEventListener('keyup', (e) => handleKey(e, false));
