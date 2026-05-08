export interface Adapter<S, T> {
  adapt(data: S): T;
}
