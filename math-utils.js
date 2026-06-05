/**
 * Math Utilities Module.
 * 
 * Contains helper functions for vector math.
 * 
 * @module math-utils
 * @author Adrien P.
 */

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

export { degreesToRadians };
