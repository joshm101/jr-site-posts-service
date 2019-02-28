const chai = require('chai')

const { extractPostData, validatePostData } = require('.')

const { expect } = chai

describe('extractPostData util', () => {
  it('extracts correct data properties', () => {
    const expected = {
      title: 'test',
      description: 'test description',
      images: [],
      thumbnailImage: 'test-thumbnail',
      embedContent: 'embed-content',
      featured: false,
      type: 'some-type',
    }

    const data = {
      ...expected,
      unrelatedProperty: 'bad data',
      otherUnrelatedProperty: 'bad data 2'
    };

    const result = extractPostData(data);
    expect(result).to.deep.equal(expected)
  })
})

describe('validatePostData util', () => {
  it('validates post data', () => {
    const data = {
      title: '',
      description: 'test description',
      images: [],
      thumbnailImage: '',
      embedContent: 'embed-content',
      featured: false,
      type: 'some-type',
    }

    const errors = [
      { message: 'A post must have a title' },
      { message: 'A post must have a thumbnail image' }
    ]

    const result = validatePostData(data)
    expect(result).to.deep.equal(errors)
  })
})
