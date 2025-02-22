import { getUpdatedStorage, restorePluginConfig } from '@/lib/plugin';
import { PluginCondition, PluginConfig } from '@/schema/plugin-config';
import { RecoilState, atom, selector, selectorFamily } from 'recoil';

const PREFIX = 'plugin';

export const storageState = atom<PluginConfig>({
  key: `${PREFIX}storageState`,
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const tabIndexState = atom<number>({
  key: `${PREFIX}tabIndexState`,
  default: 0,
});

export const conditionsState = selector<PluginCondition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.conditions ?? [];
  },
});
export const conditionsLengthState = selector<number>({
  key: `${PREFIX}conditionsLengthState`,
  get: ({ get }) => {
    const conditions = get(conditionsState);
    return conditions.length;
  },
});

const conditionPropertyState = selectorFamily<
  PluginCondition[keyof PluginCondition],
  keyof PluginCondition
>({
  key: `${PREFIX}conditionPropertyState`,
  get:
    (key) =>
    ({ get }) => {
      const conditionIndex = get(tabIndexState);
      const storage = get(storageState);
      return storage.conditions[conditionIndex][key];
    },
  set:
    (key) =>
    ({ get, set }, newValue) => {
      const conditionIndex = get(tabIndexState);
      set(storageState, (current) =>
        getUpdatedStorage(current, {
          conditionIndex,
          key,
          value: newValue as PluginCondition[keyof PluginCondition],
        })
      );
    },
});

export const getConditionPropertyState = <T extends keyof PluginCondition>(property: T) =>
  conditionPropertyState(property) as unknown as RecoilState<PluginCondition[T]>;
