const expect = require('chai').expect; // on separate line const expect = chai.expect;
const divide = require('../index');

describe('Divide function', () => {
  it('should divide positive integers correctly', () => {
    expect(divide(8, 4)).to.equal(2);
  });

  it('should throw an error when divide by zero', () => {
    expect(() => { divide(8, 0) }).to.throw();
  });
  it('answer is a positive integer', () => {
    const
      a = 3,
      b = 4;
      const negativeAnswer = a - b;
      expect(negativeAnswer).to.throw();
  });
  it('expect 2 to equal 2', () => {
    expect(2).to.equal(2, '2 === 2');
  })
  it('expect 2 to equal 2', () => {
    expect(2).to.equal("2", '2 ==== "2" ');
  })
  it('expect 2 to equal 2', () => {
    expect(2).to.equal(3, '2 === 3');
  })
  it('expect 2 to equal 2', () => {
    expect('hen').to.equal('Hen', "'hen' === 'Hen' ");
  })
  it('deep comparison', () => {
    const a = {x: 5};
    const b = {x: 5};
    expect(a).to.deep.equal(b);
  })
});
  // it('should divide positive integers correctly', () => {
  //   //define inputs
  //   const a = 8;
  //   const b = 4;
  //   const expectedAnswer = 2;
  //   //invoke the function
  //   const actualAnswer = divide(a,b);
  //   //assert that expected value equals actual
  //   expect(actualAnswer).to.equal(expectedAnswer);
  // });
  // it('should throw an error if divided by zero', () => {
  //   const 
  //     a = 8, 
  //     b = 0;

  //   const fn = () => {
  //     divide(a,b)
  //   };
  //   expect(fn).to.throw() //letting Chai handle the invocation and the exception handling (vs writing: expect(divideByZero())) https://www.chaijs.com/api/bdd/
  // });
  //test not passing: AssertionError: expected -1 to be a function 12/7

module.exports = divide;

/*
1.) 1+ test "spec" cases (usually grouped by module)--> describe()
//a spec is a function that invokes the code under test and asserts that the expected outcomes are achieved
2.) ask as many "what if" questions about the function as possible, make sure we know what the answer should be, write a test spec for that scenario
3.) install an assertion library (ex: Chai) and use it as a dependency and require in the test file
4.) complete the test specs from those created
5.) Run test (left off)

Exercise:
function sort(list) {
  for(let i = 2; i < list.length; i++){
    let j = i;
    while(j > 0 && list[j - 1] > list[j]){
      let temp = list[j];
      list[j] = list[j - 1];
      list[j - 1] = temp;
      j--;
    }
  }
  return list;
}
Design a set of test cases to fully test this function. Implement your test cases with Mocha and Chai and determine if the function works under all possible input values. Note that to compare two arrays use the assert function expect(arr1).to.deep.equal(arr2).


*/