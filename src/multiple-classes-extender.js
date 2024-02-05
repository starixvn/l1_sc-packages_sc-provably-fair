export default class MultipleClassesExtender {
    static extend(..._bases) {
        class Classes {
            get base() {
                return _bases;
            }

            constructor(..._args) {
                let index = 0;

                for (let b of this.base) {
                    let obj = new b(..._args[index++]);
                    MultipleClassesExtender.copy(this, obj);
                }
            }
        }

        for (let base of _bases) {
            MultipleClassesExtender.copy(Classes, base);
            MultipleClassesExtender.copy(Classes.prototype, base.prototype);
        }

        return Classes;
    }

    static copy(_target, _source) {
        for (let key of Reflect.ownKeys(_source)) {
            if (key !== "constructor" && key !== "prototype" && key !== "name") {
                let desc = Object.getOwnPropertyDescriptor(_source, key);
                Object.defineProperty(_target, key, desc);
            }
        }
    }
}
