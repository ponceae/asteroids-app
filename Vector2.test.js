const Vector2 = require('./Vector2');

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
        magnitude = vector.magnitude();

        expect(magnitude).toBeCloseTo(11.18);
      });

      test('magnitude of a negative vector', () => {
        const vector = new Vector2(-5, -10);
        magnitude = vector.magnitude();

        expect(magnitude).toBeCloseTo(11.18);
      });

      test('magnitude of positive & negative coords', () => {
        const vector = new Vector2(-5, 10);
        magnitude = vector.magnitude();

        expect(magnitude).toBeCloseTo(11.18);
      });

      test('magnitude of positive & negative float coords', () => {
        const vector = new Vector2(-52.136, 12.36);
        magnitude = vector.magnitude();

        expect(magnitude).toBeCloseTo(53.58);
      });

    });

    // ===========================================
    //  -- magnitudeSquared() Instance Methods --
    // ===========================================

    describe('magnitudeSquared()', () => {

      test('magnitude squared of a positive vector', () => {
        const vector = new Vector2(5, 10);
        magnitude = vector.magnitudeSquared();

        expect(magnitude).toBe(125);
      });

      test('magnitude squared of a negative vector', () => {
        const vector = new Vector2(-5, -10);
        magnitude = vector.magnitudeSquared();

        expect(magnitude).toBe(125);
      });

      test('magnitude squared of positive & negative coords', () => {
        const vector = new Vector2(-5, 10);
        magnitude = vector.magnitudeSquared();

        expect(magnitude).toBe(125);
      });

      test('magnitude squared of positive & negative float coords', () => {
        const vector = new Vector2(-52.136, 12.36);
        magnitude = vector.magnitudeSquared();

        expect(magnitude).toBeCloseTo(2870.932);
      });

    });

    // ===========================================
    //  ----- dotProduct() Instance Methods -----
    // ===========================================

    describe('dotProduct()', () => {

      test('dot product with positive vectors', () => {
        const vector = new Vector2(5, 10);
        dotProduct = vector.dotProduct(new Vector2(10, 20));

        expect(dotProduct).toBe(250);
      });

      test('dot product with negative vectors', () => {
        const vector = new Vector2(-5, -10);
        dotProduct = vector.dotProduct(new Vector2(-10, -20));

        expect(dotProduct).toBe(250);
      });

      test('dot product with positive & negative coords', () => {
        const vector = new Vector2(-5, 10);
        dotProduct = vector.dotProduct(new Vector2(10, -20));

        expect(dotProduct).toBe(-250);
      });

      test('dot product with positive & negative float coords', () => {
        const vector = new Vector2(-5.125, 10.874);
        dotProduct = vector.dotProduct(new Vector2(10.236, -20.001));

        expect(dotProduct).toBeCloseTo(-269.95);
      });

    });

    // ===========================================
    //  ---- crossProduct() Instance Methods ----
    // ===========================================

    describe('crossProduct()', () => {

      test('cross product with positive vectors', () => {
        const vector = new Vector2(7, 18);
        crossProduct = vector.crossProduct(new Vector2(14, 2));

        expect(crossProduct).toBe(-238);
      });

      test('cross product with negative vectors', () => {
        const vector = new Vector2(-7, -18);
        crossProduct = vector.crossProduct(new Vector2(-14, -2));

        expect(crossProduct).toBe(-238);
      });

      test('cross product with positive & negative coords', () => {
        const vector = new Vector2(-7, 18);
        crossProduct = vector.crossProduct(new Vector2(14, -2));

        expect(crossProduct).toBe(-238);
      });

      test('cross product with positive & negative float coords', () => {
        const vector = new Vector2(-5.125, 10.874);
        crossProduct = vector.crossProduct(new Vector2(10.236, -20.001));

        expect(crossProduct).toBeCloseTo(-8.801);
      });

    });

    // ===========================================
    //  ---- distance() Instance Methods ----
    // ===========================================

    describe('distance()', () => {

    });

    // ===========================================
    //  -- distanceSquared() Instance Methods --
    // ===========================================

    describe('distanceSquared()', () => {

    });

    // ===========================================
    //  ----- normalize() Instance Methods -----
    // ===========================================

    describe('normalize()', () => {

    });

    // ===========================================
    //  ------- rotate() Instance Methods -------
    // ===========================================

    describe('rotate()', () => {
      
    });

    // ===========================================
    //  ------- equals() Instance Methods -------
    // ===========================================

    describe('equals()', () => {

    });

    // ===========================================
    //  ------ toString() Instance Methods ------
    // ===========================================

    describe('toString()', () => {

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

    });

    // ===========================================
    //  -------- rotate() Static Methods --------
    // ===========================================

    describe('Vector2.rotate()', () => {
      
    });

  });

});
