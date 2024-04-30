declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV1;

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  type Adjustment = Condition['adjustments'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1; // | ConfigV2 | ...;

  type ConfigV1 = {
    version: 1;
    conditions: {
      targetFieldCode: string;
      isTargetFieldDisabled: boolean;
      basisType: 'currentDate' | 'field';
      basisFieldCode: string;
      adjustments: {
        target: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
        type: 'add' | 'subtract' | 'start' | 'end';
        basisType: 'static' | 'field';
        basisFieldCode: string;
        staticValue: number;
      }[];
    }[];
  };
}
