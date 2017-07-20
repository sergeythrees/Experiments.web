describe("Model class:", ()=> {

  const model = new Model();

  describe("when construct", ()=> {

    it("current operation should be null", ()=> {
      assert.equal(model.getOperation(), null);
    });

    it("first operand should be zero", ()=> {
      assert.equal(model.getCurrentValue(), 0);
    });

    it("second operand should be zero", ()=> {
      assert.equal(model.getCurrentValue(), 0);
    });

  });

  describe("addDecimal() function", ()=> {

    it("should add decimal to current number just once", ()=> {

      model.addDigit(5);
      model.addDigit(3);
      model.addDecimal();
      model.addDecimal();
      model.addDigit(7);
      model.addDecimal();
      model.addDigit(7);

      assert.equal(model.getCurrentNumber(), 53.77);

    });
  });
});