import React, { FC } from 'react';

import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
  RecoilFieldSelect,
  RecoilRadio,
  RecoilSwitch,
} from '@konomi-app/kintone-utilities-react';
import AdjustmentsForm from './form-adjustments';
import DeleteButton from './condition-delete-button';
import { getConditionPropertyState } from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import { targetFieldsState } from '@/config/states/kintone';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { BASIS_TYPES } from '@/lib/plugin';

const TargetFieldCodeForm: FC = () => {
  const fieldCode = useRecoilValue(getConditionPropertyState('targetFieldCode'));

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(getConditionPropertyState('targetFieldCode'), value);
      },
    []
  );

  return (
    <RecoilFieldSelect
      state={targetFieldsState}
      fieldCode={fieldCode}
      onChange={onChange}
      label={t('config.condition.targetFieldCode.label')}
      placeholder={t('config.condition.targetFieldCode.placeholder')}
    />
  );
};

const BasisFieldCodeForm: FC = () => {
  const basisType = useRecoilValue(getConditionPropertyState('basisType'));
  const fieldCode = useRecoilValue(getConditionPropertyState('basisFieldCode'));

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(getConditionPropertyState('basisFieldCode'), value);
      },
    []
  );

  if (basisType !== 'field') {
    return null;
  }

  return (
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.basisFieldCode.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.basisFieldCode.description')}
      </PluginFormDescription>
      <RecoilFieldSelect
        state={targetFieldsState}
        fieldCode={fieldCode}
        onChange={onChange}
        label={t('config.condition.basisFieldCode.label')}
      />
    </PluginFormSection>
  );
};

const Component: FC = () => (
  <div className='p-4'>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.targetFieldCode.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.targetFieldCode.description')}
      </PluginFormDescription>
      <div className='flex flex-col gap-4'>
        <TargetFieldCodeForm />
        <RecoilSwitch
          state={getConditionPropertyState('isTargetFieldDisabled')}
          label={t('config.condition.isTargetFieldDisabled.label')}
        />
      </div>
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.basisType.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.basisType.description')}
      </PluginFormDescription>
      {/* @ts-expect-error */}
      <RecoilRadio options={BASIS_TYPES} state={getConditionPropertyState('basisType')} />
    </PluginFormSection>
    <BasisFieldCodeForm />
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.adjustments.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.adjustments.description')}
      </PluginFormDescription>
      <AdjustmentsForm />
    </PluginFormSection>
    <DeleteButton />
  </div>
);

export default Component;
