/**
 * Math Utilities Module.
 * 
 * Contains helper functions for vector math.
 * 
 * @module math-utils
 * @author Adrien P.
 */

import { HEIGHT, WIDTH } from "../core/constants.js";
import Vector2 from "./Vector2.js";

/**
 * Convert the given degrees to radians.
 * 
 * @param {number} degrees - The number to convert. 
 * @returns {number} The converted number.
 */
function degreesToRadians(degrees)
{
  return degrees * (Math.PI / 180);
}

/**
 * Check if two entities are colliding.
 * 
 * @param {Vector2} posA The first entity's position.
 * @param {Vector2} posB The second entity's position.
 * @param {number} radiusA The radius of the first entity.
 * @param {number} radiusB THe radius of the second entity.
 * @returns {boolean} `true` if overlapping, `false` otherwise.
 */
function detectCollision(posA, posB, radiusA, radiusB)
{
  const radiiSum = radiusA + radiusB;

  return posA.distanceSquared(posB) < (radiiSum * radiiSum);
}

/**
 * Translate the entity's position to the opposite end of the canvas when flown 
 * off the screen.
 * 
 * @param {Vector2} position The position of the entity.
 * @param {number} radius The radius of the entity.
 */
function screenWrap(position, radius)
{
  if (position.x > (WIDTH + radius)) // Right edge
  {
    position.x = 0; 
  } 
  else if (position.x < -radius) // Left edge
  {
    position.x = WIDTH + radius;
  }

  if (position.y > (HEIGHT + radius)) // Bottom edge
  {
    position.y = 0;
  }
  else if (position.y < -radius) // Top edge
  {
    position.y = HEIGHT + radius
  }
}

/**
 * @returns `true` if the entity is out of bounds, `false` otherwise.
 */
function isOffScreen(x, y)
{
  return (
    x > WIDTH || // Right edge
    x < 0 || // Left edge
    y > HEIGHT || // Bottom edge
    y < 0 // Top edge
  );
}

export { detectCollision, degreesToRadians, isOffScreen, screenWrap };
