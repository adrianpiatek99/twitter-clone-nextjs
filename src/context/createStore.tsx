import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useRef, useSyncExternalStore } from "react";

const createStore = <Store,>(initialState: Store) => {
  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;
  type SetType = (value: Partial<Store>) => void;

  const useStoreData = (): {
    get: () => Store;
    set: SetType;
    subscribe: (callback: () => void) => () => void;
  } => {
    const store = useRef(initialState);
    const subscribers = useRef(new Set<() => void>());

    const get = useCallback(() => store.current, []);

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach(callback => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      const current = subscribers.current;

      current.add(callback);

      return () => current.delete(callback);
    }, []);

    return { get, set, subscribe };
  };

  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  const useStore = <SelectorOutput,>(
    selector: (store: Store) => SelectorOutput
  ): [SelectorOutput, SetType] => {
    const store = useContext(StoreContext);

    if (!store) {
      throw new Error("Store not found.");
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState)
    );

    return [state, store.set];
  };

  const Provider = ({ children }: { children: ReactNode }) => {
    return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
  };

  return {
    Provider,
    useStore
  };
};

export default createStore;
