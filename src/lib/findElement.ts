export const findElement = (selector: string): Promise<Element> => {
    return new Promise((resolve, reject) => {
        if (isNativeInterval()) {
            const interval = setInterval(() => {
                const elem = document.querySelector(selector);
                if (elem !== null) {
                    clearInterval(interval);
                    resolve(elem);
                }
            });
        } else {
            function search() {
                setTimeout(() => {
                    const elem = document.querySelector(selector);
                    if (elem !== null) {
                        resolve(elem);
                    } else {
                        search();
                    }
                });
            }
            search();
        }
    });
};

export const findElementAll = (
    selector: string
): Promise<NodeListOf<Element>> => {
    return new Promise((resolve, reject) => {
        if (isNativeInterval()) {
            const interval = setInterval(() => {
                const elems = document.querySelectorAll(selector);
                if (elems.length !== 0) {
                    clearInterval(interval);
                    resolve(elems);
                }
            });
        } else {
            function search() {
                setTimeout(() => {
                    const elems = document.querySelectorAll(selector);
                    if (elems.length !== 0) {
                        resolve(elems);
                    } else {
                        search();
                    }
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
