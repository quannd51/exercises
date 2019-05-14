const question1 = require('./question1');

describe('question1', () => {
  test('result should be array', () => {
    const demoData = `key1=value1;key2=value2\nkeyA=valueA\n`;
    const result = question1.load(demoData);

    expect(result).toEqual([{"key1": "value1", "key2": "value2"}, {"keyA": "valueA"}]);
  });

  test('result should be string', () => {
    const arrayDataDemo = [
      {
        key1: 'value1',
        key2: 'value2'
      },
      {
        keyA: 'valueA'
      }
    ];

    const result = question1.store(arrayDataDemo);
    expect(result).toEqual('key1=value1;key2=value2\nkeyA=valueA');
  });
});