export const findElement = (
    selector: string,
    limit: number = 1000
): Promise<Element> => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const interval = setInterval(() => {
            const elem = document.querySelector(selector);
            if (elem !== null) {
                clearInterval(interval);
                resolve(elem);
            }
            if (limit < i) {
                clearInterval(interval);
                reject(null);
            }
            i = i + 1;
        });
    });
};

export const findElementAll = (
    selector: string,
    limit: number = 1000
): Promise<NodeListOf<Element>> => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const interval = setInterval(() => {
            const elems = document.querySelectorAll(selector);
            if (elems.length !== 0) {
                clearInterval(interval);
                resolve(elems);
            }
            if (limit < i) {
                clearInterval(interval);
                reject([]);
            }
            i = i + 1;
        });
    });
};
