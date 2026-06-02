class Vector2 
{
    /** 
     * Construct a vector object given the x and y coordinate.
     * 
     * @param {float} x - The x coordinate of the vector.
     * @param {float} y - The y coordinate of the vector.
     */
    constructor(x, y) 
    {
        this.x = x;
        this.y = y; 
    }

    /**
     * Add the other `Vector2` coordinates to this vector.
     * 
     * @param {Vector2} other - The other `Vector2` to add to this `Vector2`.
     */
    add(other) 
    {
        this.x += other.x;
        this.y += other.y;
    }

    /**
     * Sum the current vector coordinates to the other vector coordinates and return it as a new instance.
     * 
     * @param {Vector2} v1 - This `Vector2` instance. 
     * @param {Vector2} v2 - The other `Vector2` instance.
     * @returns {Vector2} The summed vector.
     */
    static add(v1, v2)
    {
        return new Vector2((v1.x + v2.x), (v1.y + v2.y));
    }

    /**
     * Subtract the other `Vector2` coordinates from this vector.
     * 
     * @param {Vector2} other - The other `Vector2` to subtract from this `Vector2`. 
     */
    subtract(other)
    {
        this.x -= other.x;
        this.y -= other.y;
    }

    /**
     * Subtract the current vector coordinates and the other vector coordinates and return it as a new instance.
     * 
     * @param {Vector2} v1 - This `Vector2` instance. 
     * @param {Vector2} v2 - The other `Vector2` instance.
     * @returns {Vector2} The subtracted vector.
     */
    static subtract(v1, v2)
    {
        return new Vector2((v1.x - v2.x), (v1.y - v2.y));
    }

    /**
     * Scale the current `Vector2` by the provided scalar amount.
     * 
     * @param {float} scalar - The scalar amount to apply to the current vector.
     */
    scale(scalar)
    {
        this.x *= scalar;
        this.y *= scalar;
    }

    /**
     * Scale the current `Vector2` by the provided amount and return it as a new instance.
     * 
     * @param {Vector2} vector - The vector to scalse.
     * @param {float} scalar - The scalar amount to apply to the provided vector.
     * @returns {Vector2} The scaled vector.
     */
    static scale(vector, scalar)
    {
        return new Vector2(vector.x * scalar, vector.y * scalar);
    }

    /**
     * Return the true magnitude of this current vector.
     * 
     * @param {Vector2} other - The other `Vector2` instance. 
     * @returns {float} The true magnitude of the vector.
     */
    magnitude()
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
    
    /**
     * Return the squared magnitude of this current vector.
     * 
     * @returns {float} The squared magnitude of the vector. 
     */
    magnitudeSquared()
    {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }

    /**
     * Return the dot product of the current vector.
     * 
     * @param {Vector2} other - The other `Vector2` instance. 
     * @returns {float} The dot product of the vector.
     */
    dotProduct(other)
    {
        return (this.x * other.x) + (this.y * other.y);
    }

    /**
     * Return the cross product of the current vector.
     * 
     * @param {Vector2} other - The other `Vector2` instance. 
     * @returns {float} The cross product of the vector.
     */
    crossProduct(other)
    {
        return (this.x * other.y) - (this.y * other.x);   
    }

    /**
     * Return the true distance between the current vector and the other vector.
     * 
     * @param {Vector2} other - The other `Vector2` instance.
     * @returns {float} The exact distance between this vector and the other vector.
     */
    distance(other)
    {
        return (Vector2.subtract(this, other)).magnitude();
    }

    /**
     * Return the squared distance between the current vector and the other vector.
     * 
     * @param {Vector2} other - The other `Vector2` instance. 
     * @returns {float} The squared distance between this vector and the other vector.
     */
    distanceSquared(other)
    {
        const diff = Vector2.subtract(this, other);
        return Math.pow(diff.x, 2) + Math.pow(diff.y, 2);
    }

    /**
     * @returns {String} The string representation of the current vector. 
     */
    toString()
    {
        return '(' + String(this.x) + ', ' + String(this.y) + ')';
    }
}
