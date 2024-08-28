import { manager } from '@/lib/event-manager';
import { restorePluginConfig } from '@/lib/plugin';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { DateTime } from 'luxon';
import { getAdjustedDate, validateRecord } from './common-actions';

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

    const validationResult = validateRecord({ record, condition });

    if (!validationResult.valid) {
      console.warn(validationResult.errorMessage);
      return event;
    }

    if (condition.isTargetFieldDisabled) {
      // @ts-expect-error
      targetField.disabled = true;
    }

    const basisDate =
      condition.basisType === 'currentDate'
        ? DateTime.local()
        : DateTime.fromISO(basisField!.value as string);

    const adjusted = getAdjustedDate({ basisDate, record, condition });

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
