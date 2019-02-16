export class NoValueValidator {

    public static hasValue(val: string): boolean {
        if(val === undefined) {
            return false;
        }
        if(val === null) {
            return false;
        }
        if(val === "") {
            return false;
        }
        return true;
    }
}