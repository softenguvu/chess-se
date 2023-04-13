import { add, subtract } from  "./temp.js";

QUnit.module("temp", function() {
    QUnit.test("add()", function(assert) {
        assert.equal(add(1, 2), 3);
        assert.equal(add(0, 1), -1);
        assert.equal(add(0, 2), -2);
    });

    QUnit.test("subtract()", function(assert) {
        assert.equal(subtract(10, 5), 5);
        assert.equal(subtract(100, 50), 50);
    });
});
