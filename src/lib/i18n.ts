import { createTheme } from '@mui/material';
import { LANGUAGE } from './global';
import { enUS, esES, jaJP, zhCN } from '@mui/material/locale';

export const ui = {
  ja: {
    'config.condition.targetFieldCode.title': '対象フィールド',
    'config.condition.targetFieldCode.description':
      'プラグインによって制御する対象となるフィールドを指定してください。',
    'config.condition.targetFieldCode.label': '対象フィールド',
    'config.condition.targetFieldCode.placeholder': 'フィールド名(フィールドコード)',
    'config.condition.isTargetFieldDisabled.label': 'フィールドを直接編集することを禁止する',
    'config.condition.basisType.title': '基準となる日付',
    'config.condition.basisType.description':
      '基準となる日付を指定してください。現在の日付を基準にするか、フィールドの値を基準にするかを選択します。',
    'config.condition.basisFieldCode.title': '基準フィールド',
    'config.condition.basisFieldCode.description':
      '基準とするフィールドを指定してください。基準日がフィールドの値になります。文字列一行フィールドを設定することもできますが、日付のフォーマットとして適切でない場合はエラーとなります。',
    'config.condition.basisFieldCode.label': '基準フィールド',
    'config.condition.adjustments.title': '日付の制御',
    'config.condition.adjustments.description': '基準日から加算・減算を行う方法を設定します',
    'config.sidebar.tab.label': '設定',
    'config.button.save': '設定を保存',
    'config.button.return': 'プラグイン一覧へ戻る',
    'config.toast.save': '設定を保存しました',
    'config.toast.reset': '設定をリセットしました',
    'config.toast.import': '設定情報をインポートしました',
    'config.toast.export': 'プラグインの設定情報をエクスポートしました',
    'config.error.root':
      'プラグインのHTMLに、ルート要素が存在しません。プラグイン設定をレンダリングするためには、id="settings"の要素が必要です。',
    'config.error.import':
      '設定情報のインポートに失敗しました、ファイルに誤りがないか確認してください',
    'config.error.export':
      'プラグインの設定情報のエクスポートに失敗しました。プラグイン開発者にお問い合わせください。',
    'desktop.dialogtrigger.title': 'プラグインが有効です',
    'desktop.dialogtrigger.content': 'クリックするとイベントの詳細を確認できます',
    'desktop.dialog.title': 'プラグインの設定情報',
  },
  en: {
    'config.condition.targetFieldCode.title': 'Target Field',
    'config.condition.targetFieldCode.description':
      'Specify the field to be controlled by the plugin.',
    'config.condition.targetFieldCode.label': 'Target Field',
    'config.condition.targetFieldCode.placeholder': 'Field Name (Field Code)',
    'config.condition.isTargetFieldDisabled.label': 'Disable direct field editing',
    'config.condition.basisType.title': 'Basis Date',
    'config.condition.basisType.description':
      'Specify the basis date. Choose whether to use the current date as the basis or the value of a field.',
    'config.condition.basisFieldCode.title': 'Basis Field',
    'config.condition.basisFieldCode.description':
      'Specify the field to be used as the basis. The field value will be the basis date. You can also set a single-line text field, but if it is not a valid date format, an error will occur.',
    'config.condition.basisFieldCode.label': 'Basis Field',
    'config.condition.adjustments.title': 'Date Adjustments',
    'config.condition.adjustments.description': 'Set how to add or subtract from the basis date',
    'config.sidebar.tab.label': 'Settings',
    'config.button.save': 'Save Settings',
    'config.button.return': 'Return to Plugin List',
    'config.toast.save': 'Settings saved',
    'config.toast.reset': 'Settings reset',
    'config.toast.import': 'Settings imported',
    'config.toast.export': 'Plugin settings exported',
    'config.error.root':
      'The root element does not exist in the plugin HTML. To render the plugin settings, an element with id="settings" is required.',
    'config.error.import': 'Failed to import settings. Please check the file for errors.',
    'config.error.export':
      'Failed to export the plugin settings. Please contact the plugin developer.',
    'desktop.dialogtrigger.title': 'Plugin is enabled',
    'desktop.dialogtrigger.content': 'Click to view event details',
    'desktop.dialog.title': 'Plugin Settings',
  },
  es: {
    'config.condition.targetFieldCode.title': 'Campo de destino',
    'config.condition.targetFieldCode.description':
      'Especifica el campo que será controlado por el complemento.',
    'config.condition.targetFieldCode.label': 'Campo de destino',
    'config.condition.targetFieldCode.placeholder': 'Nombre del campo (Código de campo)',
    'config.condition.isTargetFieldDisabled.label': 'Deshabilitar edición directa del campo',
    'config.condition.basisType.title': 'Fecha base',
    'config.condition.basisType.description':
      'Especifica la fecha base. Elija si desea utilizar la fecha actual como base o el valor de un campo.',
    'config.condition.basisFieldCode.title': 'Campo base',
    'config.condition.basisFieldCode.description':
      'Especifica el campo que se utilizará como base. El valor del campo será la fecha base. También puede configurar un campo de texto de una sola línea, pero si no es un formato de fecha válido, se producirá un error.',
    'config.condition.basisFieldCode.label': 'Campo base',
    'config.condition.adjustments.title': 'Ajustes de fecha',
    'config.condition.adjustments.description':
      'Establece cómo sumar o restar a partir de la fecha base',
    'config.sidebar.tab.label': 'Configuración',
    'config.button.save': 'Guardar configuración',
    'config.button.return': 'Volver a la lista de complementos',
    'config.toast.save': 'Configuración guardada',
    'config.toast.reset': 'Configuración restablecida',
    'config.toast.import': 'Configuración importada',
    'config.toast.export': 'Configuración del complemento exportada',
    'config.error.root':
      'El elemento raíz no existe en el HTML del complemento. Para renderizar la configuración del complemento, se requiere un elemento con id="settings".',
    'config.error.import':
      'Error al importar la configuración. Por favor, verifique el archivo en busca de errores.',
    'config.error.export':
      'Error al exportar la configuración del complemento. Por favor, contacte al desarrollador del complemento.',
    'desktop.dialogtrigger.title': 'El complemento está habilitado',
    'desktop.dialogtrigger.content': 'Haz clic para ver los detalles del evento',
    'desktop.dialog.title': 'Configuración del complemento',
  },
  zh: {
    'config.condition.targetFieldCode.title': '目标字段',
    'config.condition.targetFieldCode.description': '指定插件要控制的字段。',
    'config.condition.targetFieldCode.label': '目标字段',
    'config.condition.targetFieldCode.placeholder': '字段名称（字段代码）',
    'config.condition.isTargetFieldDisabled.label': '禁用直接字段编辑',
    'config.condition.basisType.title': '基准日期',
    'config.condition.basisType.description':
      '指定基准日期。选择使用当前日期作为基准还是字段的值作为基准。',
    'config.condition.basisFieldCode.title': '基准字段',
    'config.condition.basisFieldCode.description':
      '指定要用作基准的字段。字段值将成为基准日期。您也可以设置单行文本字段，但如果不是有效的日期格式，将会出现错误。',
    'config.condition.basisFieldCode.label': '基准字段',
    'config.condition.adjustments.title': '日期调整',
    'config.condition.adjustments.description': '设置如何从基准日期进行加减',
    'config.sidebar.tab.label': '设置',
    'config.button.save': '保存设置',
    'config.button.return': '返回插件列表',
    'config.toast.save': '设置已保存',
    'config.toast.reset': '设置已重置',
    'config.toast.import': '已导入设置',
    'config.toast.export': '已导出插件设置',
    'config.error.root': '插件的HTML中不存在根元素。要渲染插件设置，需要一个id="settings"的元素。',
    'config.error.import': '导入设置失败。请检查文件是否有错误。',
    'config.error.export': '导出插件设置失败。请联系插件开发者。',
    'desktop.dialogtrigger.title': '插件已启用',
    'desktop.dialogtrigger.content': '点击查看事件详情',
    'desktop.dialog.title': '插件设置',
  },
} as const;

export type Language = keyof typeof ui;

export const defaultLang = 'ja' satisfies Language;

/**
 * 指定された言語に対応する翻訳関数を返します。
 * @param lang - 言語のキー
 * @returns 指定された言語に対応する翻訳関数
 */
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    //@ts-ignore
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export const t = useTranslations(LANGUAGE as Language);

export const getMUITheme = () => {
  return createTheme(
    {},
    LANGUAGE === 'en' ? enUS : LANGUAGE === 'zh' ? zhCN : LANGUAGE === 'es' ? esES : jaJP
  );
};
