/**
 * The main player ship entity.
 * 
 * @module Spaceship
 * @author Adrien P.
 */

import Particle from "./Particle.js";
import Vector2 from "../utils/Vector2.js";
import { 
  FRICTION,
  HEIGHT, 
  MID_HEIGHT,
  MID_WIDTH,
  SHIP_RADIUS, 
  SHOT_TIMER, 
  THRUST_POWER, 
  TURN_SPEED, 
  WIDTH 
} from "../core/constants.js";
import { degreesToRadians, screenWrap } from "../utils/math-utils.js";

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
 * @property {boolean} fire - Whether the ship is shooting.
 */

/**
 * Represents the player ship on the screen.
 * 
 * @class
 */
class Spaceship
{
  /**
   * Construct a Spaceship object at the specified position vector.
   * 
   * @param {Vector2} startingPosition The spawn point of the spaceship.
   */
  constructor(startingPosition)
  {
    /** @type {Vector2} A copy of the starting position for game restarts. */
    this.spawnPoint = new Vector2(startingPosition.x, startingPosition.y);

    /** @type {Vector2} The starting position. */
    this.position = startingPosition;

    /** @type {Vector2} The current movement speed. */
    this.velocity = new Vector2(0, 0);
    
    /** @type {number} The current rotation orientation in radians. */
    this.heading = 0;

    /** @type {number} The current radius size. */
    this.radius = SHIP_RADIUS;
    
    /** @type {number} The amount of thrust to apply. */
    this.thrustPower = THRUST_POWER;

    /** @type {number} The amount of drag when not thrusting. */
    this.friction = FRICTION;
    
    /** @type {boolean} Whether or not the ship is currently thrusting. */
    this.isThrusting = false;

    /** @type {number} A timer for whenever the last shot was fired in milliseconds. */
    this.lastShotT = 0;
  }

  /**
   * Translate the ship's properties to pixels and render the ship and the 
   * thruster flame.
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

    this.position.add(this.velocity);
    this.isThrusting = inputs.thrust;

    screenWrap(this.position, this.radius);
  }

  /**
   * Take a direction and rotate the ship.
   * 
   * @param {number} direction The direction to rotate. 
   */
  turn(direction)
  {
    this.heading += TURN_SPEED * direction;
  }

  /**
   * Update the ship's drag based on the amount of friction present.
   */
  applyFriction()
  {
    this.velocity.scale(FRICTION);
  }

  /**
   * Update the ship's position based on the thrust power.
   */
  applyThrust()
  {
    this.velocity.addXY(
      Math.cos(this.heading) * this.thrustPower, 
      Math.sin(this.heading) * this.thrustPower,
    );
  }

  /**
   * Reset some of the ship's attributes on a game restart.
   */
  restart()
  {
    this.position = new Vector2(this.spawnPoint.x, this.spawnPoint.y);
    this.velocity = new Vector2(0, 0);
    this.heading = 0;
  }

  /**
   * Determine if a particle can be spawned at the nose of the ship based on the last
   * time it was fired.
   * 
   * @returns {Particle | null} The created particle if valid, `null` otherwise.
   */
  shoot()
  {
    const currentTime = Date.now();
    if (currentTime - this.lastShotT < SHOT_TIMER)
    {
      return null;
    }

    this.lastShotT = currentTime;

    const {nose} = this.#getVertices();

    return new Particle(nose.x, nose.y, this.heading);
  }

  /**
   * Render the spaceship thruster flame onto the canvas.
   * 
   * @param {CanvasRenderingContext2D} ctx The master canvas paintbrush. 
   */
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
   * Render the spaceship onto the canvas.
   * 
   * @param {CanvasRenderingContext2D} ctx The master canvas paintbrush.
   */
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

  /**
   * Translate a local point into a global rotated point.
   * 
   * @param {number} localX The X position relative to the ship.
   * @param {number} localY The Y position relative to the ship.
   * @returns {Object} The global {X, Y} coordinates.
   */
  #getGlobalCoords(localX, localY)
  {
    const cos = Math.cos(this.heading);
    const sin = Math.sin(this.heading);

    return {
      x: this.position.x + (localX * cos) - (localY * sin),
      y: this.position.y + (localX * sin) + (localY * cos),
    };
  }

  /**
   * Use the current position and heading to determine the three spaceship vertices.
   * 
   * @returns {ShipVertices} An object containing the X and Y coordinates for each 
   * spaceship vertex.
   */
  #getVertices()
  {
    const noseX = this.position.x + (this.radius * Math.cos(this.heading));
    const noseY = this.position.y + (this.radius * Math.sin(this.heading));
  
    const angleOffset = degreesToRadians(135);

    const rearRightX = 
      this.position.x + 
      (this.radius * Math.cos(this.heading + angleOffset));
    const rearRightY = 
      this.position.y + 
      (this.radius * Math.sin(this.heading + angleOffset));

    const rearLeftX = 
      this.position.x + 
      (this.radius * Math.cos(this.heading - angleOffset));
    const rearLeftY = 
      this.position.y + 
      (this.radius * Math.sin(this.heading - angleOffset));

    return {
      nose:      { x: noseX,      y: noseY },
      rearLeft:  { x: rearLeftX,  y: rearLeftY },
      rearRight: { x: rearRightX, y: rearRightY },
    };
  }
}

export default Spaceship;
