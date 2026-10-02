type AnyAsyncAction = (...args: any[]) => PromiseLike<any>;
export interface UseAsyncActionHandlerProps<Action extends AnyAsyncAction> {
    handler: Action;
}
export interface UseAsyncActionHandlerResult<Action extends AnyAsyncAction> {
    isLoading: boolean;
    handler: (...args: Parameters<Action>) => Promise<Awaited<ReturnType<Action>>>;
}
export declare function useAsyncActionHandler<Action extends AnyAsyncAction>({ handler, }: UseAsyncActionHandlerProps<Action>): UseAsyncActionHandlerResult<Action>;
export {};
