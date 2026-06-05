import { describe, test, expect } from 'vitest';

import Vector2 from './Vector2.js';

describe('Vector2 Core Functionality', () => {

  test('should correctly initialize with x and y values', () => {
    const vector = new Vector2(5, 10);

    expect(vector.x).toBe(5);
    expect(vector.y).toBe(10);
  });

  describe('Vector2 Instance Methods', () => {
    
    // ===========================================
    //  -------- add() Instance Methods --------
    // ===========================================

    describe('add()', () => {

      test('adding vectors with positive coords', () => {
        const vector = new Vector2(15, 20);
        vector.add(new Vector2(3, 7))

        expect(vector.x).toBe(18);
        expect(vector.y).toBe(27);
      });

      test('adding vectors with negative coords', () => {
        const vector = new Vector2(-15, -20);
        vector.add(new Vector2(-3, -7))

        expect(vector.x).toBe(-18);
        expect(vector.y).toBe(-27);
      });

      test('adding vectors with negative & positive coords', () => {
        const vector = new Vector2(-15, 20);
        vector.add(new Vector2(3, -7))

        expect(vector.x).toBe(-12);
        expect(vector.y).toBe(13);
      });

      test('adding vectors with positive & negative float coords', () => {
        const vector = new Vector2(27.5, -12.67);
        vector.add(new Vector2(-0.75, 145.987));

        expect(vector.x).toBeCloseTo(26.75);
        expect(vector.y).toBeCloseTo(133.317);
      });

    });

    // ===========================================
    //  ------ subtract() Instance Methods ------
    // ===========================================

    describe('subtract()', () => {

      test('subtracting vectors with positive coords', () => {
        const vector = new Vector2(15, 20);
        vector.subtract(new Vector2(3, 7));

        expect(vector.x).toBe(12);
        expect(vector.y).toBe(13);
      });

      test('subtracting vectors with negative coords', () => {
        const vector = new Vector2(-15, -20);
        vector.subtract(new Vector2(-3, -7));

        expect(vector.x).toBe(-12);
        expect(vector.y).toBe(-13);
      });

      test('subtracting vectors with positive & negative coords', () => {
        const vector = new Vector2(15, -20);
        vector.subtract(new Vector2(-3, 7));

        expect(vector.x).toBe(18);
        expect(vector.y).toBe(-27);
      });

      test('subtracting vectors with positive & negative float coords', () => {
        const vector = new Vector2(27.5, -12.67);
        vector.subtract(new Vector2(-0.75, 145.987));

        expect(vector.x).toBeCloseTo(28.25);
        expect(vector.y).toBeCloseTo(-158.657);
      });

    });

    // ===========================================
    //  -------- scale() Instance Methods -------
    // ===========================================

    describe('scale()', () => {

      test('scaling vector by a positive whole number', () => {
        const vector = new Vector2(15, 20);
        vector.scale(2);

        expect(vector.x).toBe(30);
        expect(vector.y).toBe(40);
      });

      test('scaling vector by a float', () => {
        const vector = new Vector2(15, 20);
        vector.scale(0.5);

        expect(vector.x).toBe(7.5);
        expect(vector.y).toBe(10);
      });

      test('scaling vector by a negative whole number', () => {
        const vector = new Vector2(15, 20);
        vector.scale(-2);
        
        expect(vector.x).toBe(-30);
        expect(vector.y).toBe(-40);
      });

      test('scaling vector by a negative float', () => {
        const vector = new Vector2(15, 20);
        vector.scale(-0.5);

        expect(vector.x).toBe(-7.5);
        expect(vector.y).toBe(-10);
      });

      test('scaling with positive & negative coords', () => {
        const vector = new Vector2(15.97, -24.3678);
        vector.scale(2.36);

        expect(vector.x).toBeCloseTo(37.689);
        expect(vector.y).toBeCloseTo(-57.508);
      });

    });

    // ===========================================
    //  ----- magnitude() Instance Methods -----
    // ===========================================

    describe('magnitude()', () => {

      test('magnitude of a positive vector', () => {
        const vector = new Vector2(5, 10);
        const magnitude = vector.magnitude();

        expect(magnitude).toBeCloseTo(11.18);
      });

      test('magnitude of a negative vector', () => {
        const vector = new Vector2(-5, -10);
        const magnitude = vector.magnitude();

        expect(magnitude).toBeCloseTo(11.18);
      });

      test('magnitude of positive & negative coords', () => {
        const vector = new Vector2(-5, 10);
        const magnitude = vector.magnitude();

        expect(magnitude).toBeCloseTo(11.18);
      });

      test('magnitude of positive & negative float coords', () => {
        const vector = new Vector2(-52.136, 12.36);
        const magnitude = vector.magnitude();

        expect(magnitude).toBeCloseTo(53.58);
      });

    });

    // ===========================================
    //  -- magnitudeSquared() Instance Methods --
    // ===========================================

    describe('magnitudeSquared()', () => {

      test('magnitude squared of a positive vector', () => {
        const vector = new Vector2(5, 10);
        const magnitude = vector.magnitudeSquared();

        expect(magnitude).toBe(125);
      });

      test('magnitude squared of a negative vector', () => {
        const vector = new Vector2(-5, -10);
        const magnitude = vector.magnitudeSquared();

        expect(magnitude).toBe(125);
      });

      test('magnitude squared of positive & negative coords', () => {
        const vector = new Vector2(-5, 10);
        const magnitude = vector.magnitudeSquared();

        expect(magnitude).toBe(125);
      });

      test('magnitude squared of positive & negative float coords', () => {
        const vector = new Vector2(-52.136, 12.36);
        const magnitude = vector.magnitudeSquared();

        expect(magnitude).toBeCloseTo(2870.932);
      });

    });

    // ===========================================
    //  ----- dotProduct() Instance Methods -----
    // ===========================================

    describe('dotProduct()', () => {

      test('dot product with positive vectors', () => {
        const vector = new Vector2(5, 10);
        const dotProduct = vector.dotProduct(new Vector2(10, 20));

        expect(dotProduct).toBe(250);
      });

      test('dot product with negative vectors', () => {
        const vector = new Vector2(-5, -10);
        const dotProduct = vector.dotProduct(new Vector2(-10, -20));

        expect(dotProduct).toBe(250);
      });

      test('dot product with positive & negative coords', () => {
        const vector = new Vector2(-5, 10);
        const dotProduct = vector.dotProduct(new Vector2(10, -20));

        expect(dotProduct).toBe(-250);
      });

      test('dot product with positive & negative float coords', () => {
        const vector = new Vector2(-5.125, 10.874);
        const dotProduct = vector.dotProduct(new Vector2(10.236, -20.001));

        expect(dotProduct).toBeCloseTo(-269.95);
      });

    });

    // ===========================================
    //  ---- crossProduct() Instance Methods ----
    // ===========================================

    describe('crossProduct()', () => {

      test('cross product with positive vectors', () => {
        const vector = new Vector2(7, 18);
        const crossProduct = vector.crossProduct(new Vector2(14, 2));

        expect(crossProduct).toBe(-238);
      });

      test('cross product with negative vectors', () => {
        const vector = new Vector2(-7, -18);
        const crossProduct = vector.crossProduct(new Vector2(-14, -2));

        expect(crossProduct).toBe(-238);
      });

      test('cross product with positive & negative coords', () => {
        const vector = new Vector2(-7, 18);
        const crossProduct = vector.crossProduct(new Vector2(14, -2));

        expect(crossProduct).toBe(-238);
      });

      test('cross product with positive & negative float coords', () => {
        const vector = new Vector2(-5.125, 10.874);
        const crossProduct = vector.crossProduct(new Vector2(10.236, -20.001));

        expect(crossProduct).toBeCloseTo(-8.801);
      });

    });

    // ===========================================
    //  ---- distance() Instance Methods ----
    // ===========================================

    describe('distance()', () => {

      test('distance between two positive vectors', () => {
        const vector = new Vector2(5, 10);
        const d = vector.distance(new Vector2(20, 35));

        expect(d).toBeCloseTo(29.155);
      });

      test('distance between two negative vectors', () => {
        const vector = new Vector2(-5, -10);
        const d = vector.distance(new Vector2(-20, -35));

        expect(d).toBeCloseTo(29.155);
      });

      test('distance between positive & negative coords', () => {
        const vector = new Vector2(5, -10);
        const d = vector.distance(new Vector2(-20, 35));

        expect(d).toBeCloseTo(51.478);
      });

      test('distance between positive & negative float coords', () => {
        const vector = new Vector2(5.23, -10.657);
        const d = vector.distance(new Vector2(-20.023, 35.104));

        expect(d).toBeCloseTo(52.266);
      });

    });

    // ===========================================
    //  -- distanceSquared() Instance Methods --
    // ===========================================

    describe('distanceSquared()', () => {

      test('distance squared between two positive vectors', () => {
        const vector = new Vector2(5, 10);
        const d = vector.distanceSquared(new Vector2(20, 35));

        expect(d).toBeCloseTo(850);
      });

      test('distance squared between two negative vectors', () => {
        const vector = new Vector2(-5, -10);
        const d = vector.distanceSquared(new Vector2(-20, -35));

        expect(d).toBeCloseTo(850);
      });

      test('distance squared between positive & negative coords', () => {
        const vector = new Vector2(5, -10);
        const d = vector.distanceSquared(new Vector2(-20, 35));

        expect(d).toBeCloseTo(2650);
      });

      test('distance squared between positive & negative float coords', () => {
        const vector = new Vector2(5.23, -10.657);
        const d = vector.distanceSquared(new Vector2(-20.023, 35.104));

        expect(d).toBeCloseTo(2731.783);
      });

    });

    // ===========================================
    //  ----- normalize() Instance Methods -----
    // ===========================================

    describe('normalize()', () => {
      
      test('normalize a positive vector', () => {
        const vector = new Vector2(6, 17);
        vector.normalize();

        expect(vector.x).toBeCloseTo(0.333);
        expect(vector.y).toBeCloseTo(0.943);
      });

      test('normalize a negative vector', () => {
        const vector = new Vector2(-6, -17);
        vector.normalize();

        expect(vector.x).toBeCloseTo(-0.333);
        expect(vector.y).toBeCloseTo(-0.943);
      });

      test('normalize a vector with positive & negative coords', () => {
        const vector = new Vector2(6, -17);
        vector.normalize()

        expect(vector.x).toBeCloseTo(0.333);
        expect(vector.y).toBeCloseTo(-0.943);
      });

      test('normalize a vector with positive & negative float coords', () => {
        const vector = new Vector2(6.23, -17.657);
        vector.normalize();

        expect(vector.x).toBeCloseTo(0.333);
        expect(vector.y).toBeCloseTo(-0.943);
      });

      test('normalize a vector with zero magnitude', () => {
        const vector = new Vector2(0, 0);
        vector.normalize()

        expect(vector.x).toBe(0);
        expect(vector.y).toBe(0);
      });

    });

    // ===========================================
    //  ------- rotate() Instance Methods -------
    // ===========================================

    describe('rotate()', () => {
      
      test('rotate a positive vector by 30 degrees', () => {
        const vector = new Vector2(2, 0);
        vector.rotate(30)

        expect(vector.x).toBeCloseTo(1.732);
        expect(vector.y).toBeCloseTo(1);
      });

      test('rotate a positive vector by 45 degrees', () => {
        const vector = new Vector2(0, 3);
        vector.rotate(45);

        expect(vector.x).toBeCloseTo(-2.121);
        expect(vector.y).toBeCloseTo(2.121);
      });

      test('rotate positive & negative coords by 60 degrees', () => {
        const vector = new Vector2(4, -2);
        vector.rotate(60);

        expect(vector.x).toBeCloseTo(3.732);
        expect(vector.y).toBeCloseTo(2.464);
      });

      test('rotate negative & positive coords by 120 degrees', () => {
        const vector = new Vector2(-3, 5);
        vector.rotate(120);

        expect(vector.x).toBeCloseTo(-2.830);
        expect(vector.y).toBeCloseTo(-5.098);
      });

      test('rotate positive & negative float coords by 210 degrees', () => {
        const vector = new Vector2(1.5, -2.5);
        vector.rotate(210);

        expect(vector.x).toBeCloseTo(-2.549);
        expect(vector.y).toBeCloseTo(1.415);
      });

      test('rotate a positive vector by -90 degrees', () => {
        const vector = new Vector2(1, 0);
        vector.rotate(-90);

        expect(vector.x).toBeCloseTo(0);
        expect(vector.y).toBeCloseTo(-1);
      });

      test('rotate positive float coords by -45 degrees', () => {
        const vector = new Vector2(1.5, 1.5);
        vector.rotate(-45);

        expect(vector.x).toBeCloseTo(2.121);
        expect(vector.y).toBeCloseTo(0);
      });

    });

    // ===========================================
    //  ------- equals() Instance Methods -------
    // ===========================================

    describe('equals()', () => {
      
      test('vectors are equal', () => {
        const vector = new Vector2(15, 20);

        expect(vector.equals(new Vector2(15, 20))).toBe(true);
      });

      test('vectors are not equal', () => {
        const vector = new Vector2(15, 20);

        expect(vector.equals(new Vector2(10, 5))).toBe(false);
      });

    });

    // ===========================================
    //  ------ toString() Instance Methods ------
    // ===========================================

    describe('toString()', () => {

      test('vector has correct toString 1', () => {
        const vector = new Vector2(15, 20);

        expect(vector.toString()).toBe('(15, 20)');
      });

      test('vector has correct toString 2', () => {
        const vector = new Vector2(5, 10);

        expect(vector.toString()).toBe('(5, 10)');
      });

    });

  });

  describe('Vector2 Static Methods', () => {

    // ===========================================
    //  --------- add() Static Methods ---------
    // ===========================================

    describe('Vector2.add()', () => {

      test('Vector as a sum of two positive vectors', () => {
        const vectorA = new Vector2(15, 20);
        const vectorB = new Vector2(3, 7);
        const vectorC = Vector2.add(vectorA, vectorB);

        expect(vectorC.x).toBe(18);
        expect(vectorC.y).toBe(27);
      });

      test('Vector as a sum of two negative vectors', () => {
          const vectorA = new Vector2(-15, -20);
          const vectorB = new Vector2(-3, -7);
          const vectorC = Vector2.add(vectorA, vectorB); 

          expect(vectorC.x).toBe(-18);
          expect(vectorC.y).toBe(-27);
        });

        test('Vector as a sum of a positive & negative vector', () => {
          const vectorA = new Vector2(-15, 20);
          const vectorB = new Vector2(3, -7);
          const vectorC = Vector2.add(vectorA, vectorB); 

          expect(vectorC.x).toBe(-12);
          expect(vectorC.y).toBe(13);
        });

        test('Vector as a sum of positive & negative float coords', () => {
          const vectorA = new Vector2(27.5, -12.67);
          const vectorB = new Vector2(-0.75, 145.987);
          const vectorC = Vector2.add(vectorA, vectorB);

          expect(vectorC.x).toBeCloseTo(26.75);
          expect(vectorC.y).toBeCloseTo(133.317);
        });

      });

    // ===========================================
    //  ------ subtract() Static Methods ------
    // ===========================================
    
    describe('Vector2.subtract()', () => {

      test('Vector as a difference of two positive vectors', () => {
        const vectorA = new Vector2(15, 20);
        const vectorB = new Vector2(3, 7);
        const vectorC = Vector2.subtract(vectorA, vectorB);

        expect(vectorC.x).toBe(12);
        expect(vectorC.y).toBe(13);
      });

      test('Vector as a difference of two negative vectors', () => {
          const vectorA = new Vector2(-15, -20);
          const vectorB = new Vector2(-3, -7);
          const vectorC = Vector2.subtract(vectorA, vectorB); 

          expect(vectorC.x).toBe(-12);
          expect(vectorC.y).toBe(-13);
        });

      test('Vector as a difference of a positive & negative vector', () => {
        const vectorA = new Vector2(-15, 20);
        const vectorB = new Vector2(3, -7);
        const vectorC = Vector2.subtract(vectorA, vectorB); 

        expect(vectorC.x).toBe(-18);
        expect(vectorC.y).toBe(27);
      });

      test('Vector as a difference of positive & negative float coords', () => {
        const vectorA = new Vector2(27.5, -12.67);
        const vectorB = new Vector2(-0.75, 145.987);
        const vectorC = Vector2.subtract(vectorA, vectorB)

        expect(vectorC.x).toBeCloseTo(28.25);
        expect(vectorC.y).toBeCloseTo(-158.657);
      });
      
    });

    // ===========================================
    //  -------- scale() Static Methods --------
    // ===========================================

    describe('Vector2.scale()', () => {

      test('Vector as a scale of a whole number', () => {
        const vector = new Vector2(15, 20);
        const vectorB = Vector2.scale(vector, 2);

        expect(vectorB.x).toBe(30);
        expect(vectorB.y).toBe(40);
      });

      test('Vector as a scale of a float', () => {
        const vector = new Vector2(15, 20);
        const vectorB = Vector2.scale(vector, 0.5);

        expect(vectorB.x).toBe(7.5);
        expect(vectorB.y).toBe(10);
      });

      test('Vector as a scale of a negative whole number', () => {
        const vector = new Vector2(15, 20);
        const vectorB = Vector2.scale(vector, -2);

        expect(vectorB.x).toBe(-30);
        expect(vectorB.y).toBe(-40);
      });

      test('Vector as a scale of a negative float', () => {
        const vector = new Vector2(15, 20);
        const vectorB = Vector2.scale(vector, -0.5);

        expect(vectorB.x).toBe(-7.5);
        expect(vectorB.y).toBe(-10);
      });

    });

    // ===========================================
    //  ------ normalize() Static Methods ------
    // ===========================================

    describe('Vector2.normalize()', () => {

      test('create normalized vector from positive one', () => {
        const vectorA = new Vector2(6, 17);
        const vectorB = Vector2.normalize(vectorA);

        expect(vectorB.x).toBeCloseTo(0.333);
        expect(vectorB.y).toBeCloseTo(0.943);
      });

      test('create normalized vector from negative one', () => {
        const vectorA = new Vector2(-6, -17);
        const vectorB = Vector2.normalize(vectorA);

        expect(vectorB.x).toBeCloseTo(-0.333);
        expect(vectorB.y).toBeCloseTo(-0.943);
      });

      test('create normalized vector from positive & negative coords', () => {
        const vectorA = new Vector2(6, -17);
        const vectorB = Vector2.normalize(vectorA);

        expect(vectorB.x).toBeCloseTo(0.333);
        expect(vectorB.y).toBeCloseTo(-0.943);
      });

      test('create normalized vector from positive & negative float coords', () => {
        const vectorA = new Vector2(6.23, -17.657);
        const vectorB = Vector2.normalize(vectorA);

        expect(vectorB.x).toBeCloseTo(0.333);
        expect(vectorB.y).toBeCloseTo(-0.943);
      });

      test('create normalized vector from zero magnitude', () => {
        const vectorA = new Vector2(0, 0);
        const vectorB = Vector2.normalize(vectorA);

        expect(vectorB.x).toBe(0);
        expect(vectorB.y).toBe(0);
      });

    });

    // ===========================================
    //  -------- rotate() Static Methods --------
    // ===========================================

    describe('Vector2.rotate()', () => {
      
      test('rotate a positive vector by 30 degrees', () => {
        const vectorA = new Vector2(2, 0);
        const vectorB = Vector2.rotate(vectorA, 30);

        expect(vectorB.x).toBeCloseTo(1.732);
        expect(vectorB.y).toBeCloseTo(1);
      });

      test('rotate a positive vector by 45 degrees', () => {
        const vectorA = new Vector2(0, 3);
        const vectorB = Vector2.rotate(vectorA, 45);

        expect(vectorB.x).toBeCloseTo(-2.121);
        expect(vectorB.y).toBeCloseTo(2.121);
      });

      test('rotate positive & negative coords by 60 degrees', () => {
        const vectorA = new Vector2(4, -2);
        const vectorB = Vector2.rotate(vectorA, 60);

        expect(vectorB.x).toBeCloseTo(3.732);
        expect(vectorB.y).toBeCloseTo(2.464);
      });

      test('rotate negative & positive coords by 120 degrees', () => {
        const vectorA = new Vector2(-3, 5);
        const vectorB = Vector2.rotate(vectorA, 120);

        expect(vectorB.x).toBeCloseTo(-2.830);
        expect(vectorB.y).toBeCloseTo(-5.098);
      });

      test('rotate positive & negative float coords by 210 degrees', () => {
        const vectorA = new Vector2(1.5, -2.5);
        const vectorB = Vector2.rotate(vectorA, 210);

        expect(vectorB.x).toBeCloseTo(-2.549);
        expect(vectorB.y).toBeCloseTo(1.415);
      });

      test('rotate a positive vector by -90 degrees', () => {
        const vectorA = new Vector2(1, 0);
        const vectorB = Vector2.rotate(vectorA, -90);

        expect(vectorB.x).toBeCloseTo(0);
        expect(vectorB.y).toBeCloseTo(-1);
      });

      test('rotate positive float coords by -45 degrees', () => {
        const vectorA = new Vector2(1.5, 1.5);
        const vectorB = Vector2.rotate(vectorA, -45);

        expect(vectorB.x).toBeCloseTo(2.121);
        expect(vectorB.y).toBeCloseTo(0);
      });

    });

  });

});
