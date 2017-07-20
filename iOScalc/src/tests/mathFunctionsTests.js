describe("Math functions:", ()=> {

  describe("divide(first, second)", ()=> {

    describe("should return result of divide first by second", ()=> {

      let testValues = [
          [4,2,2],
          [3,2,1.5],
          [-10,2,-5],
          [-10,-5,2],
          [1,0,Infinity],
          [0,1,0],
          [Infinity,1,Infinity],
      ];

      testValues.forEach((item)=> makeTest(item[0],item[1],item[2],));

      function makeTest(first,second,expected) {
        it("should return " + expected + " when divide " + first + " by " + second, ()=> {
          assert.equal(divide(first, second), expected);
        });
      }


    });
  });

  describe("multiple(first, second)", ()=> {

    describe("should return result of multiplication first and second", ()=> {

      let testValues = [
        [4,2,8],
        [1.5,2,3],
        [-10,2,-20],
        [-10,-5,50],
        [1,0,0],
        [Infinity,1,Infinity],
      ];

      testValues.forEach((item)=> makeTest(item[0],item[1],item[2],));

      function makeTest(first,second,expected) {
        it("should return " + expected + " when multiply " + first + " by " + second, ()=> {
          assert.equal(multiple(first, second), expected);
        });
      }


    });
  });
});