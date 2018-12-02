export class Utils {
    static setURLPrefix(path: string): string {
        if (path && path.startsWith('/')) {
            return path;
        } else {
            return '/' + path;
        }
    }

    static removeURLPrefix(path: string): string {
        if (path && path.startsWith('/')) {
            return path.slice(1);
        } else {
            return path;
        }
    }

    static removeURLPostfix(path: string): string {
        if (path && path.endsWith('/')) {
            return path.slice(0, -1);
        } else {
            return path;
        }
    }
}
