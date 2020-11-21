export class Util {
    public static getProperties(obj: any): string[] {
        const result = [];

        for (let property in obj) {
            if (obj.hasOwnProperty(property) && !property.startsWith('_')) {
                result.push(property);
            }
        }

        return result;
    }
}
