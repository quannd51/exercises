const question3 = require('./question3');

describe('question3', () => {
  test('should discount 30 if user is employee', () => {
    let demoData = {
      user: {
        type: 'employee', //affiliate, customer
        createAt: 2 //2 year ago
      },
      bill: {
        type: 'technology', //groceries
        total: 100,
      }
    };

    const result = question3.generateFinalBill(demoData);

    expect(result).toEqual({"bill": {"total": 70, "type": "technology"}, "user": {"createAt": 2, "type": "employee"}});
  });

  test('should discount 10 if user is affiliate', () => {
    let demoData = {
      user: {
        type: 'affiliate', //affiliate, customer
        createAt: 2 //2 year ago
      },
      bill: {
        type: 'technology', //groceries
        total: 100,
      }
    };

    const result = question3.generateFinalBill(demoData);

    expect(result).toEqual({"bill": {"total": 90, "type": "technology"}, "user": {"createAt": 2, "type": "affiliate"}});
  });

  test('should discount 5 if user is customer and over 2 year', () => {
    let demoData = {
      user: {
        type: 'customer', //affiliate, customer
        createAt: 3 //2 year ago
      },
      bill: {
        type: 'technology', //groceries
        total: 100,
      }
    };

    const result = question3.generateFinalBill(demoData);

    expect(result).toEqual({"bill": {"total": 95, "type": "technology"}, "user": {"createAt": 3, "type": "customer"}});
  });

  test('should discount 30 if user is employee and discount on sum of bill', () => {
    let demoData = {
      user: {
        type: 'employee', //affiliate, customer
        createAt: 3 //2 year ago
      },
      bill: {
        type: 'technology', //groceries
        total: 960,
      }
    };

    const result = question3.generateFinalBill(demoData);

    expect(result).toEqual({"bill": {"total": 642, "type": "technology"}, "user": {"createAt": 3, "type": "employee"}});
  });

  test('do not discount if bill type is groceries', () => {
    let demoData = {
      user: {
        type: 'employee', //affiliate, customer
        createAt: 3 //2 year ago
      },
      bill: {
        type: 'groceries', //groceries
        total: 960,
      }
    };

    const result = question3.generateFinalBill(demoData);

    expect(result).toEqual({"bill": {"total": 915, "type": "groceries"}, "user": {"createAt": 3, "type": "employee"}});
  });
});