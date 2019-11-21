const types = require('../../../../../src/store/types')
const utils = require('../../../../../src/utils')

const validateSegment = utils.validateSegment
const CCW = types.Rotation.CCW

describe('utils > validateSegment', () => {
  describe('curve happy path', () => {
    it('valid curve returns true', () => {
      expect(validateSegment('curve', 'up-right', 0, 1, CCW, 0))
        .to.eq(true)
    })
  })

  describe('curve edge cases', () => {
    it('curve missing rotation returns false', () => {
      expect(validateSegment('curve', 'up-right', 0, 1, null, 0))
        .to.eq(false)
    })

    it('curve with invalid rotation returns false', () => {
      expect(validateSegment('curve', 'up-right', 0, 1, 'potato', 0))
        .to.eq(false)
    })

    it('curve missing direction returns false', () => {
      expect(validateSegment('curve', null, 0, 1, CCW, 0))
        .to.eq(false)
    })

    it('curve with invalid direction returns false', () => {
      expect(validateSegment('curve', 'potato', 0, 1, CCW, 0))
        .to.eq(false)
    })

    it('curve with cardinal direction returns false', () => {
      expect(validateSegment('curve', 'up', 0, 1, CCW, 0))
        .to.eq(false)
    })

    it('curve with 0 radius returns false', () => {
      expect(validateSegment('curve', 'up-right', 0, 0, CCW, 0))
        .to.eq(false)
    })
  })

  describe('line happy path', () => {
    it('valid vertical line returns true', () => {
      expect(validateSegment('line', 'up', 1, null, null, 0))
        .to.eq(true)
    })

  })

  describe('line edge cases', () => {
    it('valid horizontal line returns true', () => {
      expect(validateSegment('line', 'right', 0, null, null, 1))
        .to.eq(true)
    })

    it('line missing height and width returns false', () => {
      expect(validateSegment('line', 'up-right', null, null, null, null))
        .to.eq(false)
    })

    it('line with 0 height and width returns false', () => {
      expect(validateSegment('line', 'up-right', 0, null, null, 0))
        .to.eq(false)
    })

    it('line missing direction returns false', () => {
      expect(validateSegment('line', null, 0, null, null, 0))
        .to.eq(false)
    })

    it('line with invalid direction returns false', () => {
      expect(validateSegment('line', 'potato', 0, null, null, 0))
        .to.eq(false)
    })

    it('line with cardinal direction but non-zero height & width returns false', () => {
      expect(validateSegment('line', 'up', 1, null, null, 2))
        .to.eq(false)
    })

    it('line with diagonal direction but zero height or width returns false', () => {
      expect(validateSegment('line', 'up-right', 0, null, null, 2))
        .to.eq(false)
    })
  })
})
