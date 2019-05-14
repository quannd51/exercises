const question2 = require('./question2');

describe('question2', () => {
  test('max should found', () => {
    const nodeVertex = ['a:b', 'b:c', 'a:c', 'c:d', 'd:e', 'c:e'];
    const nodeHeigh = {
      a: 1,
      b: 2,
      c: 2,
      d: 1,
      e: 3
    };

    const result = question2.findMax(nodeVertex, nodeHeigh);
    expect(result).toEqual({
      vertex: 'a:b:c:d:e',
      vertexHeight: 9
    });
  });
});