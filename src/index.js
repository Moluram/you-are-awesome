// DO WHATEVER YOU WANT HERE

const createEnumerableProperty = (key) => {
    return key
};

const createNotEnumerableProperty = (key) => {
    return Symbol(key);
};

const createProtoMagicObject = () => {
    function f() {}

    f.__proto__ = f.prototype;
    return f;
};

let count = 0;

const incrementor = () => {
    let innerIncrementor = () => {
        ++count;
        return innerIncrementor
    };

    innerIncrementor.valueOf = incrementor.valueOf = function () {
        return ++count;
    };

    return innerIncrementor;
};

let aCount = 0;

const asyncIncrementor = () => {
    return new Promise((resolve) => {
        aCount++;
        return resolve(aCount);
    });
};

const createIncrementer = () => {
    return {
        count: 0,
        next() {
            return {
                value: ++this.count
            }
        },
        [Symbol.iterator]() {
            return {
                next: () => {
                    return this.next();
                },
            };
        },
    };
};

// return same argument not earlier than in one second, and not later, than in two
const returnBackInSecond = (obj) => {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve(obj);
        }, 1010);
    });
};

const getDeepPropertiesCount = (obj) => {
    let properties = Object.getOwnPropertyNames(obj);
    return properties.filter(p => Object.getOwnPropertyNames(obj[p]).length > 0)
        .reduce((a, prop) => a + getDeepPropertiesCount(obj[prop]), properties.length);
};

const createSerializedObject = () => {
    return new String()
};

const sortByProto = (arr) =>  arr.sort((a, b) => a.__proto__ - b.__proto__);


exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;