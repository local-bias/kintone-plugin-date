import { manager } from '@/lib/event-manager';
import { restorePluginConfig } from '@/lib/plugin';
import { getFieldValueAsString, kintoneAPI } from '@konomi-app/kintone-utilities';
import { DateTime } from 'luxon';

const storage = restorePluginConfig();

for (const condition of storage.conditions) {
  const events: kintoneAPI.js.EventType[] = [
    'app.record.create.show',
    'app.record.edit.show',
    'app.record.index.edit.show',
    'app.record.create.submit',
    'app.record.edit.submit',
    'app.record.index.edit.submit',
  ];
  if (condition.basisType === 'field' && condition.basisFieldCode) {
    // @ts-expect-error
    events.push(`app.record.create.change.${condition.basisFieldCode}`);
    // @ts-expect-error
    events.push(`app.record.edit.change.${condition.basisFieldCode}`);
    // @ts-expect-error
    events.push(`app.record.index.edit.change.${condition.basisFieldCode}`);
  }
  condition.adjustments.forEach((adjustment) => {
    if (adjustment.basisType === 'field' && adjustment.basisFieldCode) {
      // @ts-expect-error
      events.push(`app.record.create.change.${adjustment.basisFieldCode}`);
      // @ts-expect-error
      events.push(`app.record.edit.change.${adjustment.basisFieldCode}`);
      // @ts-expect-error
      events.push(`app.record.index.edit.change.${adjustment.basisFieldCode}`);
    }
  });

  process.env.NODE_ENV === 'development' && console.log('events', events);

  manager.addChangeEvents(events, (event) => {
    const { record } = event;
    const targetField = record[condition.targetFieldCode];
    const basisField = record[condition.basisFieldCode];

    if (!targetField) {
      console.warn(`${condition.targetFieldCode}が存在しません。処理をスキップします`);
      return event;
    }
    if (condition.basisType === 'field' && !basisField) {
      console.warn(`${condition.basisFieldCode}が存在しません。処理をスキップします`);
      return event;
    }

    if (targetField.type !== 'DATE' && targetField.type !== 'DATETIME') {
      console.warn(
        `${condition.targetFieldCode}が日付フィールドではないため、処理をスキップします`
      );
      return event;
    }
    if (condition.basisType === 'field' && typeof basisField?.value !== 'string') {
      console.warn(`${condition.basisFieldCode}の値が不正です。処理をスキップします`);
      return event;
    }

    if (condition.isTargetFieldDisabled) {
      // @ts-expect-error
      targetField.disabled = true;
    }

    let adjusted =
      condition.basisType === 'currentDate'
        ? DateTime.local()
        : DateTime.fromISO(basisField!.value as string);

    for (const adjustment of condition.adjustments) {
      const { target, type, basisType, basisFieldCode, staticValue } = adjustment;
      const basisField = record[basisFieldCode];

      if (basisType === 'field' && (!basisField || typeof basisField.value !== 'string')) {
        console.warn(`${basisFieldCode}の値が不正です。処理をスキップします`);
        return event;
      }

      const basisValue = basisType === 'static' ? staticValue : getFieldValueAsString(basisField);

      switch (type) {
        case 'start':
          adjusted = adjusted.startOf(target);
          break;
        case 'end':
          adjusted = adjusted.endOf(target);
          break;
        case 'add':
          adjusted = adjusted.plus({ [target]: basisValue });
          break;
        case 'subtract':
          adjusted = adjusted.minus({ [target]: basisValue });
          break;
      }
    }

    if (targetField.type === 'DATE') {
      process.env.NODE_ENV === 'development' &&
        console.log('adjusted', adjusted.toFormat('yyyy-MM-dd'));
      targetField.value = adjusted.toFormat('yyyy-MM-dd');
    } else {
      process.env.NODE_ENV === 'development' && console.log('adjusted', adjusted.toISO());
      targetField.value = adjusted.toISO() ?? '';
    }
    return event;
  });
}
