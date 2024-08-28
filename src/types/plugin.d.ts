declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV2;

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  type Adjustment = Condition['adjustments'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1 | ConfigV2;

  type ConfigV2 = {
    version: 2;
    conditions: (ConfigV1['conditions'][number] & {
      /**
       * `true`の場合、一覧のレコードを一括更新するボタンを表示する
       * @defaultValue `false`
       */
      isBulkUpdateButtonVisible: boolean;
      /**
       * `true`の場合、一括更新ボタンを使用できるユーザーを制御する
       *
       * @defaultValue `false`
       */
      isBulkUpdateButtonVisibleForSpecificEntities: boolean;
      /**
       * 一括更新ボタンを表示するエンティティ(ユーザー、グループ、組織)のタイプとコードの配列
       */
      visibleFor: {
        /**
         * エンティティのタイプ
         *
         * - `user`: ユーザー
         * - `group`: グループ
         * - `organization`: 組織
         */
        type: 'user' | 'group' | 'organization';
        /**
         * エンティティのコード
         */
        code: string;
      }[];
    })[];
  };

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
