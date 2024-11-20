const Calculator = require('../advancedCalculator');

describe("Calculator", () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  afterEach(() => {
    // Reset any changes if necessary
  });

  // Matchers: Basic operations
  it("should add two numbers correctly", () => {
    expect(calculator.add(5, 3)).toEqual(8);
  });

  it("should subtract two numbers correctly", () => {
    expect(calculator.subtract(10, 4)).toEqual(6);
  });

  it("should multiply two numbers correctly", () => {
    expect(calculator.multiply(7, 3)).toEqual(21);
  });

  it("should divide two numbers correctly", () => {
    expect(calculator.divide(15, 3)).toEqual(5);
  });

  it("should throw an error when dividing by zero", () => {
    expect(() => calculator.divide(10, 0)).toThrowError("Division by zero is not allowed.");
  });

  it("should calculate the square of a number correctly", () => {
    expect(calculator.square(4)).toEqual(16);
  });

  // Spying: Tracking method calls
  it("should spy on the add method", () => {
    spyOn(calculator, 'add').and.callThrough();
    calculator.add(2, 3);
    expect(calculator.add).toHaveBeenCalledTimes(1);
    expect(calculator.add).toHaveBeenCalledWith(2, 3);
  });

  // Stubbing: Replace behavior
  it("should stub the multiply method", () => {
    spyOn(calculator, 'multiply').and.returnValue(100);
    const result = calculator.multiply(10, 10);
    expect(result).toEqual(100);
  });

  // Asynchronous Testing
  it("should fetch data asynchronously (using done callback)", (done) => {
    calculator.fetchData().then((data) => {
      expect(data).toBe("Data fetched successfully");
      done();
    });
  });

  it("should fetch data asynchronously (using async/await)", async () => {
    const data = await calculator.fetchData();
    expect(data).toBe("Data fetched successfully");
  });
});
