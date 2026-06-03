const Vector2 = require('./Vector2');

describe('Vector2 Core Functionality', () => {

  test('should correctly initialize with x and y values', () => {
    const vector = new Vector2(5, 10);

    expect(vector.x).toBe(5);
    expect(vector.y).toBe(10);
  });

  describe('Vector2 Instance Methods', () => {
    
    // ===========================================
    //  -------- add() INSTANCE METHODS --------
    // ===========================================

    describe('add()', () => {

      test('adding vectors with positive coordinates', () => {
        const vector = new Vector2(15, 20);
        vector.add(new Vector2(3, 7))

        expect(vector.x).toBe(18);
        expect(vector.y).toBe(27);
      });

      test('adding vectors with negative coordinates', () => {
        const vector = new Vector2(-15, -20);
        vector.add(new Vector2(-3, -7))

        expect(vector.x).toBe(-18);
        expect(vector.y).toBe(-27);
      });

      test('adding vectors with negative and positive coordinates', () => {
        const vector = new Vector2(-15, 20);
        vector.add(new Vector2(3, -7))

        expect(vector.x).toBe(-12);
        expect(vector.y).toBe(13);
      });

    });

    // ===========================================
    //  ------ subtract() INSTANCE METHODS ------
    // ===========================================

    test('subtracting vectors with positive coordinates', () => {
      const vector = new Vector2(15, 20);
      vector.subtract(new Vector2(3, 7));

      expect(vector.x).toBe(12);
      expect(vector.y).toBe(13);
    });

    test('subtracting vectors with negative coordinates', () => {
      const vector = new Vector2(-15, -20);
      vector.subtract(new Vector2(-3, -7));

      expect(vector.x).toBe(-12);
      expect(vector.y).toBe(-13);
    });

    test('subtracting vectors with positive and negative coordinates', () => {
      const vector = new Vector2(15, -20);
      vector.subtract(new Vector2(-3, 7));

      expect(vector.x).toBe(18);
      expect(vector.y).toBe(-27);
    });

  });

  describe('Vector2 Static Methods', () => {

    // ===========================================
    //  --------- add() STATIC METHODS ---------
    // ===========================================

    test('A new vector as a sum of two positive vectors', () => {
      const vectorA = new Vector2(15, 20);
      const vectorB = new Vector2(3, 7);
      const vectorC = Vector2.add(vectorA, vectorB);

      expect(vectorC.x).toBe(18);
      expect(vectorC.y).toBe(27);
    });

    test('A new vector as a sum of two negative vectors', () => {
        const vectorA = new Vector2(-15, -20);
        const vectorB = new Vector2(-3, -7);
        const vectorC = Vector2.add(vectorA, vectorB); 

        expect(vectorC.x).toBe(-18);
        expect(vectorC.y).toBe(-27);
      });

      test('A new vector as a sum of a positive and a negative vector', () => {
        const vectorA = new Vector2(-15, 20);
        const vectorB = new Vector2(3, -7);
        const vectorC = Vector2.add(vectorA, vectorB); 

        expect(vectorC.x).toBe(-12);
        expect(vectorC.y).toBe(13);
      });

    // ===========================================
    //  ------ subtract() STATIC METHODS ------
    // ===========================================
    
    test('A new vector as a difference of two positive vectors', () => {
      const vectorA = new Vector2(15, 20);
      const vectorB = new Vector2(3, 7);
      const vectorC = Vector2.subtract(vectorA, vectorB);

      expect(vectorC.x).toBe(12);
      expect(vectorC.y).toBe(13);
    });

    test('A new vector as a difference of two negative vectors', () => {
        const vectorA = new Vector2(-15, -20);
        const vectorB = new Vector2(-3, -7);
        const vectorC = Vector2.subtract(vectorA, vectorB); 

        expect(vectorC.x).toBe(-12);
        expect(vectorC.y).toBe(-13);
      });

      test('A new vector as a difference of a positive and a negative vector', () => {
        const vectorA = new Vector2(-15, 20);
        const vectorB = new Vector2(3, -7);
        const vectorC = Vector2.subtract(vectorA, vectorB); 

        expect(vectorC.x).toBe(-18);
        expect(vectorC.y).toBe(27);
      });

  });
});
