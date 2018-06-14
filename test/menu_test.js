var expect = require('chai').expect
var menu = require('../src/lib/menu');
describe('[lib] Menu test',()=>{
  beforeEach(()=>{
    process.stdout.write = ()=>{};
  })
  afterEach(()=>{
    process.stdin.pause();
    delete process.stdout.write;
  })
  it('fuck',()=>{
    expect(()=>menu()).to.not.throw();
  })
})