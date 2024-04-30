import { restoreStorage } from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { PLUGIN_ID } from './global';
import { DateTimeUnit } from 'luxon';

export const BASIS_TYPES = [
  { label: '入力時の日付', value: 'currentDate' },
  { label: 'フィールドの値', value: 'field' },
] as const satisfies {
  label: string;
  value: Plugin.Condition['basisType'];
}[];

export const ADJUSTMENT_TARGETS = [
  { label: '年', value: 'year' },
  { label: '月', value: 'month' },
  { label: '日', value: 'day' },
  { label: '時', value: 'hour' },
  { label: '分', value: 'minute' },
  { label: '秒', value: 'second' },
] as const satisfies { label: string; value: Plugin.Adjustment['target'] }[] satisfies {
  label: string;
  value: DateTimeUnit;
}[];

export const ADJUSTMENT_TYPES = [
  { label: '加算', value: 'add' },
  { label: '減算', value: 'subtract' },
  { label: '最初の値', value: 'start' },
  { label: '最後の値', value: 'end' },
] as const satisfies { label: string; value: Plugin.Adjustment['type'] }[];

export const ADJUSTMENT_BASIS_TYPES = [
  { label: '固定値', value: 'static' },
  { label: 'フィールドの値', value: 'field' },
] as const satisfies { label: string; value: Plugin.Adjustment['basisType'] }[];

export const getNewCondition = (): Plugin.Condition => ({
  targetFieldCode: '',
  isTargetFieldDisabled: false,
  basisType: 'currentDate',
  basisFieldCode: '',
  adjustments: [
    {
      target: 'year',
      type: 'add',
      basisType: 'static',
      basisFieldCode: '',
      staticValue: 0,
    },
  ],
});

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): Plugin.Config => ({
  version: 1,
  conditions: [getNewCondition()],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * 各バージョンは次のバージョンへの変換処理を持ち、再帰的なアクセスによって最新のバージョンに変換されます
 *
 * @param anyConfig 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (anyConfig: Plugin.AnyConfig): Plugin.Config => {
  const { version } = anyConfig;
  switch (version) {
    case undefined:
      //@ts-expect-error
      return migrateConfig({ version: 1, ...anyConfig });
    case 1:
    default:
      // もし新しいバージョンを追加したらここに追加する
      // return migrateConfig({ version: 2, ...anyConfig });
      return anyConfig;
  }
};

/**
 * プラグインの設定情報を復元します
 */
export const restorePluginConfig = (): Plugin.Config => {
  const config = restoreStorage<Plugin.AnyConfig>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};

export const getUpdatedStorage = <T extends keyof Plugin.Condition>(
  storage: Plugin.Config,
  props: {
    conditionIndex: number;
    key: T;
    value: Plugin.Condition[T];
  }
) => {
  const { conditionIndex, key, value } = props;
  return produce(storage, (draft) => {
    draft.conditions[conditionIndex][key] = value;
  });
};

export const getConditionField = <T extends keyof Plugin.Condition>(
  storage: Plugin.Config,
  props: {
    conditionIndex: number;
    key: T;
    defaultValue: NonNullable<Plugin.Condition[T]>;
  }
): NonNullable<Plugin.Condition[T]> => {
  const { conditionIndex, key, defaultValue } = props;
  if (!storage.conditions[conditionIndex]) {
    return defaultValue;
  }
  return storage.conditions[conditionIndex][key] ?? defaultValue;
};
