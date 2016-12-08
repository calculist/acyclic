const expect = require('chai').expect
const _ = require('lodash')
const acyclic = require('./acyclic')

describe('basic functionality', () => {

  it('should be an object', () => {
    expect(acyclic).to.be.an('object')
  });

  it('should create a new context', () => {
    const context = acyclic.new()
    expect(context.register).to.be.a('function')
    expect(context.require).to.be.a('function')
    expect(context.init).to.be.a('function')
  })

  it('should resolve dependencies correctly', () => {
    const context = acyclic.new()
    context.register('A', [], () => 1)
    context.register('B', ['A','C'], (A, C) => {
      expect(A).to.eq(1)
      expect(C).to.eq(3)
      return 2
    })
    context.register('C', ['A'], (A) => {
      expect(A).to.eq(1)
      return 3
    })
    let initialized = false
    context.init(['A','B','C'], (A, B, C) => {
      expect(A).to.eq(1)
      expect(B).to.eq(2)
      expect(C).to.eq(3)
      initialized = true
    })
    expect(initialized).to.eq(true)
  })

})
