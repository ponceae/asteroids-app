/**
 * The main player ship entity.
 * 
 * @module Spaceship
 * @author Adrien P.
 */

import { HEIGHT, SHIP_RADIUS, THRUST_POWER, FRICTION, TURN_SPEED, WIDTH } from "../core/constants.js";
import Vector2 from "../utils/Vector2.js";
import { degreesToRadians } from "../utils/math-utils.js";

/**
 * @typedef {Object} ShipVertices
 * @property {{x: number, y: number}} nose
 * @property {{x: number, y: number}} rearLeft
 * @property {{x: number, y: number}} rearRight
 */

/**
 * @typedef {Object} InputState
 * @property {boolean} thrust - Whether the thrust engine is active.
 * @property {boolean} turnLeft - Whether the ship is turning left.
 * @property {boolean} turnRight - Whether the ship is turning right.
 * @property {boolean} firing - Whether the ship is shooting.
 */

/**
 * Represents the player ship on the screen.
 * 
 * @class
 */
class Spaceship
{
  /**
   * Construct a Spaceship object at the specified position.
   * 
   * @param {Vector2} startingPosition The spawn point for the spaceship.
   */
  constructor(startingPosition)
  {
    this.position = startingPosition;

    /** @type {Vector2} The current movement speed and direction. */
    this.velocity = new Vector2(0, 0);
    
    /** @type {number} The current rotation orientation of the ship in radians. */
    this.heading = 0;

    /** @type {number} The physical size of the ship. */
    this.radius = SHIP_RADIUS;
    
    /** @type {number} The amount of thrust to apply to the ship. */
    this.thrustPower = THRUST_POWER;

    /** @type {number} The amount of drag to apply to the ship. */
    this.friction = FRICTION;
    
    /** @type {boolean} Whether or not the ship is currently being moved directly. */
    this.isThrusting = false;
  }

  /**
   * Update the ship heading, velocity, and thrust. 
   * 
   * @param {InputState} inputs The state object tracking action events.
   */
  update(inputs)
  {
    if (inputs.turnRight)
    {
      this.turn(1);
    }

    if (inputs.turnLeft)
    {
      this.turn(-1);
    }

    if (inputs.thrust)
    {
      this.applyThrust();
    }

    this.applyFriction();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.isThrusting = inputs.thrust;

    this.screenWrap();
  }

  /**
   * Translate the ship's properties to pixels. Draws the ship and the ship 
   * thrust flame.
   * 
   * @param {CanvasRenderingContext2D} ctx The master canvas paintbrush.
   */
  draw(ctx)
  {
    ctx.save();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    this.#draw_spaceship(ctx);

    if (this.isThrusting)
    {
      ctx.strokeStyle = 'orange';
      this.#draw_flame(ctx);
    }

    ctx.restore();
  }

  #draw_spaceship(ctx)
  {
    const { nose, rearLeft, rearRight } = this.#getVertices();

    ctx.beginPath();
    ctx.moveTo(nose.x, nose.y);
    ctx.lineTo(rearRight.x, rearRight.y);
    ctx.lineTo(rearLeft.x, rearLeft.y)
    ctx.closePath();
    ctx.stroke();
  }

  #draw_flame(ctx)
  {
    const flicker = 28 + Math.random() * 12;

    const topBase = this.#getGlobalCoords(-10, -5);
    const topProng = this.#getGlobalCoords(-18, -6);
    const topValley = this.#getGlobalCoords(-14, -2);
    const center = this.#getGlobalCoords(-flicker, 0);
    const botValley = this.#getGlobalCoords(-14, 2);
    const botProng = this.#getGlobalCoords(-18, 6);
    const botBase = this.#getGlobalCoords(-10, 5);
    
    ctx.beginPath();
    ctx.moveTo(topBase.x, topBase.y);
    ctx.lineTo(topProng.x, topProng.y);
    ctx.lineTo(topValley.x, topValley.y);
    ctx.lineTo(center.x, center.y);
    ctx.lineTo(botValley.x, botValley.y);
    ctx.lineTo(botProng.x, botProng.y);
    ctx.lineTo(botBase.x, botBase.y);
    ctx.closePath();
    ctx.stroke();
  }

  /**
   * Use the current position and heading to determine the three spaceship
   * vertices in order to detect collisions and to draw it.
   * 
   * @returns {ShipVertices} An object containing the x and y coordinates for each 
   * spaceship vertice.
   */
  #getVertices()
  {
    const noseX = this.position.x + (this.radius * Math.cos(this.heading));
    const noseY = this.position.y + (this.radius * Math.sin(this.heading));
  
    const rearRightX = 
      this.position.x + 
      (this.radius * Math.cos(this.heading + degreesToRadians(135)));
    const rearRightY = 
      this.position.y + 
      (this.radius * Math.sin(this.heading + degreesToRadians(135)));

    const rearLeftX = 
      this.position.x + 
      (this.radius * Math.cos(this.heading - degreesToRadians(135)));
    const rearLeftY = 
      this.position.y + 
      (this.radius * Math.sin(this.heading - degreesToRadians(135)));

    return {
      nose: { x: noseX, y: noseY },
      rearLeft: { x: rearLeftX, y: rearLeftY },
      rearRight: { x: rearRightX, y: rearRightY },
    };
  }

  #getGlobalCoords(localX, localY)
  {
    const cos = Math.cos(this.heading);
    const sin = Math.sin(this.heading);

    return {
      x: this.position.x + (localX * cos) - (localY * sin),
      y: this.position.y + (localX * sin) + (localY * cos),
    }
  }

  /**
   * Take a direction and rotate the current ship.
   * 
   * @param {number} direction The direction to rotate. 
   */
  turn(direction)
  {
    this.heading += TURN_SPEED * direction;
  }

  /**
   * Update the ship's position based on the thrust power.
   */
  applyThrust()
  {
    this.velocity.x += Math.cos(this.heading) * this.thrustPower;
    this.velocity.y += Math.sin(this.heading) * this.thrustPower;
  }

  applyFriction()
  {
    this.velocity.x *= FRICTION;
    this.velocity.y *= FRICTION;
  }

  // // Create a particle object at the tip of the ship's triangle and 
  // // rotation.
  // shoot()
  // {

  // }

  // Helper method for update that wraps the ship on the screen.
  screenWrap()
  {
    if (this.position.x > (WIDTH + this.radius))
    {
      this.position.x = 0;
    } 
    else if (this.position.x < -this.radius)
    {
      this.position.x = WIDTH + this.radius;
    }

    if (this.position.y > (HEIGHT + this.radius))
    {
      this.position.y = 0;
    }
    else if (this.position.y < -this.radius)
    {
      this.position.y = HEIGHT + this.radius
    }

  }

}

export default Spaceship;
