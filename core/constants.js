/**
 * Global costants for the asteroids app.
 * 
 * @module constants
 * @author Adrien P.
 */

// Ship Constants
export const SHIP_RADIUS = 15;
export const THRUST_POWER = 0.1;
export const FRICTION = 0.99;
export const TURN_SPEED = 0.05;

// Listener Map (KEYBOARD)
export const KEY_MAP = 
{
  'ArrowUp': 'thrust',
  'KeyW': 'thrust',
  'ArrowLeft': 'turnLeft',
  'KeyA': 'turnLeft',
  'ArrowRight': 'turnRight',
  'KeyD': 'turnRight',
  'Space': 'fire',
  'Enter': 'start',
}

// Listener Map (MOBILE)
export const TOUCH_MAP = 
{
  'btn-left': 'turnLeft',
  'btn-right': 'turnRight',
  'btn-thrust': 'thrust',
  'btn-fire': 'fire',
}

// Canvas Dimensions
export const WIDTH = 800;
export const HEIGHT = 600;
export const MID_WIDTH = WIDTH / 2;
export const MID_HEIGHT = HEIGHT / 2;

// Particle Constants
export const PARTICLE_RADIUS = 2;
export const PARTICLE_SPEED = 7;
export const SHOT_TIMER = 200; // In Milliseconds

// Asteroid Constants
export const ASTEROID_DATA =
{
  small: 
  {
    radius: 15,
    minSpeed: 0.65,
    maxSpeed: 0.75,
    points: 100,
    vertices: 8,
  },

  medium:
  {
    radius: 30,
    minSpeed: 0.55,
    maxSpeed: 0.65,
    points: 50,
    vertices: 8,
  },

  large:
  {
    radius: 50,
    minSpeed: 0.45,
    maxSpeed: 0.55,
    points: 20,
    vertices: 8,
  },
};
export const ASTEROID_VERTICES = 8;
export const WAVE_DATA = 
{
  1: 8,
  2: 10,
  3: 11,
  4: 12,
};
export const MAX_NUM_ASTEROIDS = 12;

// Debris Constants
export const DEBRIS_LIFETIME = 30;
export const DEBRIS_COUNT = 10;
