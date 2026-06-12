/**
 * Main event listener module.
 * 
 * Listens for user input and maps it based on whether the key/touch was pressed or 
 * not.
 * 
 * @module Spaceship
 * @author Adrien P.
 */

import { KEY_MAP , TOUCH_MAP } from "./constants.js";

export const inputs = 
{
  thrust: false,
  turnLeft: false,
  turnRight: false,
  fire: false,
  start: false,
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

    // Overwrite browser scrolling
    if (event.code == 'Space' || event.code.startsWith('Arrow'))
    {
      event.preventDefault();
    }
  }
}

/**
 * Bind a mobile button to an input action.
 * 
 * @param {string} buttonId The HTML ID of the button.
 * @param {string} action The action key to map to the input state.
 */
function bindTouchButton(buttonId, action) 
{
  const button = document.getElementById(buttonId)

  if (!button)
  {
    return;
  }

  button.addEventListener('touchstart', (e) => {
    e.preventDefault();
    inputs[action] = true;
  });

  button.addEventListener('touchend', (e) => {
    e.preventDefault();
    inputs[action] = false;
  });
}

window.addEventListener('keydown', (e) => handleKey(e, true));
window.addEventListener('keyup', (e) => handleKey(e, false));

for (const [buttonId, action] of Object.entries(TOUCH_MAP))
{
  bindTouchButton(buttonId, action);
}

window.addEventListener('touchstart', () => { inputs.start = true; });
window.addEventListener('touchend', () => { inputs.start = false; });
