/**
 * @module constants
 * @author Adrien P.
 */

// Ship Constants
export const SHIP_RADIUS = 15;
export const THRUST_POWER = 0.1;
export const FRICTION = 0.99;
export const TURN_SPEED = 0.05;

// Listener Map
export const KEY_MAP = 
{
  'ArrowUp': 'thrust',
  'KeyW': 'thrust',
  'ArrowLeft': 'turnLeft',
  'KeyA': 'turnLeft',
  'ArrowRight': 'turnRight',
  'KeyD': 'turnRight',
  'Space': 'fire',
}

// Canvas Dimensions
export const WIDTH = 800;
export const HEIGHT = 600;

// Particle Constants
export const PARTICLE_RADIUS = 2;
export const BULLET_SPEED = 7;
export const SHOT_TIMER = 200; // In Milliseconds

// Asteroid Constants
export const ASTEROID_DATA =
{
  small: 
  {
    radius: 15,
    minSpeed = 0.08,
    maxSpeed = 0.13,
    points: 100,
  },

  medium:
  {
    radius: 30,
    minSpeed: 0.05,
    maxSpeed: 0.09,
    points: 50,
  },

  large:
  {
    radius: 50,
    minSpeed: 0.03,
    maxSpeed: 0.06,
    points: 20,
  },
};
