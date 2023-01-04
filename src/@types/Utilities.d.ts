export {};

declare global {
  export type Component<T = unknown> = React.FC<T>;
}
