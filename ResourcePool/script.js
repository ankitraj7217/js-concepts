class ResourcePoolMember {
    constructor (data) {
        this.data = data;
        this.available = true;
    }
}


// can be timer based release too
class ResourcePool {
    poolArray = null;

    creatorFunc() {}
    resetFunc() {}

    constructor(creatorFunc, resetFunc, size = 1000) {
        this.resetFunc = resetFunc;
        this.creatorFunc = creatorFunc;
        this.poolArray = new Array(size).fill(0).map(() => this.createElement());
    }

    createElement() {
        const data = this.resetFunc(this.creatorFunc());

        return new ResourcePoolMember(data);
    }

    getElement() {
        for(let i = 0; i < this.poolArray.length; i++) {
            if (this.poolArray[i].available) {
                this.poolArray[i].available = false;
                return this.poolArray[i];
            }
        }

        return null;
    }

    releaseElement(element) {
        element.available = true;
        this.resetFunc(element.data);
    }
}

const creatorFunc = () => {
    return {
        counter: 0
    }
}

const resetFunc = (obj) => {
    obj.counter = 0;

    delete obj.name;
    return obj;
}

const myPool = new ResourcePool(creatorFunc, resetFunc, 1);

const objToUse = myPool.getElement();

console.log(objToUse);

const objToUse2 = myPool.getElement();

console.log(objToUse2);



