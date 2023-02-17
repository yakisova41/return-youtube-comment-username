export function FetchIntercepter(originalFetch: Fetch) {
    const actions: Action[] = [];

    return {
        start: () => {
            window.fetch = (...arg: FetchArg) => {
                const [request, init] = arg;
                const response = originalFetch(request, init);

                response.then((res) => {
                    actions.forEach((action) => {
                        action({
                            request,
                            init,
                            response: res,
                        });
                    });
                });

                return response;
            };
        },
        addAction: (action: Action) => {
            actions.push(action);
        },
        stop: () => {
            window.fetch = originalFetch;
        },
    };
}

export type FetchArg = [input: RequestInfo | URL, init?: RequestInit];
export type Fetch = (
    input: FetchArg[0],
    init?: FetchArg[1]
) => Promise<Response>;
export type Action = (arg: ActionArg) => void;
export type ActionArg = {
    request: RequestInfo | URL;
    init: RequestInit;
    response: Response;
};
