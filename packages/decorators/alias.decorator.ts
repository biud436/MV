import "reflect-metadata";

export function afterAlias(...args: any[]): MethodDecorator {
    return (
        target: object,
        key: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ) => {
        const injectFunction = descriptor.value;
        const METADATA_KEY = `${target}__${key.toString()}`;

        if (!Reflect.getMetadata(METADATA_KEY, target)) {
            Reflect.defineMetadata(METADATA_KEY, args[0][key], target);
        }

        descriptor.value = function (...args: any[]) {
            Reflect.getMetadata(METADATA_KEY, target).apply(this, args);
            injectFunction.apply(this, args);
        };
        return descriptor;
    };
}

export function beforeAlias(...args: any[]): MethodDecorator {
    return (
        target: object,
        key: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ) => {
        const injectFunction = descriptor.value;
        const METADATA_KEY = `${target}__${key.toString()}`;

        if (!Reflect.getMetadata(METADATA_KEY, target)) {
            Reflect.defineMetadata(METADATA_KEY, args[0][key], target);
        }

        descriptor.value = function (...args: any[]) {
            injectFunction.apply(this, args);
            Reflect.getMetadata(METADATA_KEY, target).apply(this, args);
        };
        return descriptor;
    };
}

class Shape {
    constructor() {}

    public draw() {
        console.log("Shape::draw");
    }
}

class Rectangle extends Shape {
    @beforeAlias(Shape.prototype)
    public draw() {
        console.log("Rectangle::draw");
    }
}

const rectangle = new Rectangle();
rectangle.draw();
