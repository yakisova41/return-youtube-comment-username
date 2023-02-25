export const findElement = (
    selector: string,
    limit: number = 1000
): Promise<Element> => {
    return new Promise((resolve, reject) => {
        let i = 0;

        if (isNativeInterval()) {
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
        } else {
            function search() {
                setTimeout(() => {
                    const elem = document.querySelector(selector);
                    if (elem !== null) {
                        resolve(elem);
                    } else if (limit < i) {
                        reject(null);
                    } else {
                        search();
                    }
                    i = i + 1;
                });
            }
            search();
        }
    });
};

export const findElementAll = (
    selector: string,
    limit: number = 1000
): Promise<NodeListOf<Element>> => {
    return new Promise((resolve, reject) => {
        let i = 0;

        if (isNativeInterval()) {
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
        } else {
            function search() {
                setTimeout(() => {
                    const elems = document.querySelectorAll(selector);
                    if (elems.length !== 0) {
                        resolve(elems);
                    } else if (limit < i) {
                        reject(null);
                    } else {
                        search();
                    }
                    i = i + 1;
                });
            }
            search();
        }
    });
};

function isNativeInterval() {
    return (
        window.setInterval.toString() ===
        "function setInterval() { [native code] }"
    );
}
