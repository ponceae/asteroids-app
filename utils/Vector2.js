/**
 * Part of the physics engine.
 * 
 * Contains core math operations for vectors on a 2D plane. 
 * 
 * @module Vector2
 * @author Adrien P.
 */

import { degreesToRadians } from "./math-utils.js";

/**
 * Represents a 2D math vector.
 * 
 * Used to handle positions, velocities, and physics. 
 * 
 * @class 
 */
class Vector2 
{
	/** 
	 * Construct a vector object given the X and Y coordinate.
	 * 
	 * @param {number} x - The X coordinate of the vector.
	 * @param {number} y - The Y coordinate of the vector.
	 */
	constructor(x, y) 
	{
		this.x = x;
		this.y = y; 
	}

	/**
	 * Add the other `Vector2` coordinates to the current vector.
	 * 
	 * @param {Vector2} other - The other `Vector2` to add to this `Vector2`.
	 */
	add(other) 
	{
		this.x += other.x;
		this.y += other.y;
	}

	/**
	 * Add raw X and Y coordinates to the current vector.
	 * 
	 * @param {number} x The X value to add.
	 * @param {number} y The Y value to add. 
	 */
	addXY(x, y)
	{
		this.x += x;
		this.y += y;
	}

	/**
	 * Sum the current vector coordinates to the other vector coordinates and return it 
	 * as a new instance.
	 * 
	 * @param {Vector2} v1 - The first vector term. 
	 * @param {Vector2} v2 - The second vector term to add to the first.
	 * @returns {Vector2} The summed vector.
	 */
	static add(v1, v2)
	{
		return new Vector2((v1.x + v2.x), (v1.y + v2.y));
	}

	/**
	 * Subtract the other `Vector2` coordinates from the current vector.
	 * 
	 * @param {Vector2} other - The other `Vector2` to subtract from this `Vector2`. 
	 */
	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
	}

	/**
	 * Subtract the other vector coordinates from the current vector and return it as 
	 * a new instance.
	 * 
	 * @param {Vector2} v1 - The first vector term. 
	 * @param {Vector2} v2 - The second vector term to subtract from the first.
	 * @returns {Vector2} The subtracted vector.
	 */
	static subtract(v1, v2)
	{
		return new Vector2((v1.x - v2.x), (v1.y - v2.y));
	}

	/**
	 * Scale the current `Vector2` by the provided scalar amount.
	 * 
	 * @param {number} scalar - The scalar amount to apply to the current vector.
	 */
	scale(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
	}

	/**
	 * Scale the current `Vector2` by the provided amount and return it as a new 
	 * instance.
	 * 
	 * @param {Vector2} vector - The vector to scale.
	 * @param {number} scalar - The scalar amount to apply to the provided vector.
	 * @returns {Vector2} The scaled vector.
	 */
	static scale(vector, scalar)
	{
		return new Vector2(vector.x * scalar, vector.y * scalar);
	}

	/**
	 * Return the true magnitude of the current vector.
	 * 
	 * @param {Vector2} other - The other `Vector2` instance. 
	 * @returns {number} The true magnitude of the vector.
	 */
	magnitude()
	{
		return Math.sqrt((this.x * this.x) + (this.y * this.y))
	}
	
	/**
	 * Return the squared magnitude of the current vector.
	 * 
	 * @returns {number} The squared magnitude of the vector. 
	 */
	magnitudeSquared()
	{
		return (this.x * this.x) + (this.y * this.y);
	}

	/**
	 * Return the dot product of the current vector.
	 * 
	 * @param {Vector2} other - The other `Vector2` instance. 
	 * @returns {number} The dot product of the vector.
	 */
	dotProduct(other)
	{
		return (this.x * other.x) + (this.y * other.y);
	}

	/**
	 * Return the cross product of the current vector.
	 * 
	 * @param {Vector2} other - The other `Vector2` instance. 
	 * @returns {number} The cross product of the vector.
	 */
	crossProduct(other)
	{
		return (this.x * other.y) - (this.y * other.x);   
	}

	/**
	 * Return the true distance between the current vector and the other vector.
	 * 
	 * @param {Vector2} other - The other `Vector2` instance.
	 * @returns {number} The exact distance between this vector and the other vector.
	 */
	distance(other)
	{
		return (Vector2.subtract(this, other)).magnitude();
	}

	/**
	 * Return the squared distance between the current vector and the other vector.
	 * 
	 * @param {Vector2} other - The other `Vector2` instance. 
	 * @returns {number} The squared distance between this vector and the other vector.
	 */
	distanceSquared(other)
	{
		return Vector2.subtract(this, other).magnitudeSquared()
	}

	/**
	 * Normalize the current vector by dividing its coordinates by its own magnitude.
	 * If the magnitude is `0`, do nothing.
	 */
	normalize()
	{
		const magnitude = this.magnitude();

		if (magnitude > 0) 
		{
			this.x /= magnitude;
			this.y /= magnitude;
		}
	}

	/**
	 * Normalize the current vector by dividing its coordinates by its own magnitude
	 * and return it as a new instance. If the magnitude is `0` then return a vector
	 * with coordinates at `(0, 0)`.
	 * 
	 * @param {Vector2} vector - The current vector to normalize.
	 * @returns {Vector2} The normalization of the current vector. 
	 */
	static normalize(vector)
	{
		const magnitude = vector.magnitude();

		if (magnitude > 0)
		{
			return new Vector2(vector.x / magnitude, vector.y / magnitude);
		} 
		return new Vector2(0, 0);
	}

	/**
	 * Rotate the current vector by the given degrees.
	 * 
	 * @param {number} degrees - The degree to rotate by. 
	 */
	rotate(degrees)
	{
		const radians = degreesToRadians(degrees);

		const x1 = (this.x * Math.cos(radians)) - (this.y * Math.sin(radians));
		const y1 = (this.x * Math.sin(radians)) + (this.y * Math.cos(radians));

		this.x = x1;
		this.y = y1;
	}

	/**
	 * Rotate the current vector by the given degrees and return it as a new instance.
	 * 
	 * @param {Vector2} vector - The vector to rotate. 
	 * @param {number} degrees - The degree of the angle.
	 * @returns {Vector2} The rotated vector.
	 */
	static rotate(vector, degrees)
	{
		const radians = degreesToRadians(degrees);

		return new Vector2(
			(vector.x * Math.cos(radians)) - (vector.y * Math.sin(radians)), 
			(vector.x * Math.sin(radians)) + (vector.y * Math.cos(radians)),
		);
	}

	/**
	 * Return `true` if this vector equals the other vector.
	 * 
	 * @param {Vector2} other - The other vector to check against.
	 * @returns {boolean} `true` if the current vector equals the other vector, 
	 * 	`false` otherwise. 
	 */
	equals(other)
	{
		return this.x === other.x && this.y === other.y;
	}

	/**
	 * @returns {string} The string representation of the current vector. 
	 */
	toString()
	{
		return '(' + String(this.x) + ', ' + String(this.y) + ')';
	}
}

export default Vector2;
