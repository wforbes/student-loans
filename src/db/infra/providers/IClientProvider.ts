export interface IClientProvider<T> {
    getClient(): T;
}