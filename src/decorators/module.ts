import 'reflect-metadata';

export function Module(obj: {
    modules?: any[],
    controllers?: any[],
    components?: any[],
    exports?: any[],
}): ClassDecorator {
    const propsKeys = Object.keys(obj);

    return (target: object) => {
        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, obj[property], target);
            }
        }
    };
}
