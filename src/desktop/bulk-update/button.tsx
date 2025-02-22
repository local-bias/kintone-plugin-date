import { PluginCondition } from '@/schema/plugin-config';
import { Button } from '@mui/material';
import React, { Suspense, type FC } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { appFieldPropertiesState } from './state';
import { useBulkUpdate } from './use-bulk-update';

type Props = {
  condition: PluginCondition;
};

const Label: FC<{ fieldCode: string }> = ({ fieldCode }) => {
  const fieldProperties = useRecoilValue(appFieldPropertiesState);

  const property = fieldProperties.find((field) => field.code === fieldCode);

  const fieldName = property?.label ?? fieldCode;

  return (
    <>
      {fieldName}
      を一括更新
    </>
  );
};

const Component: FC<Props> = ({ condition }) => {
  const bulkUpdate = useBulkUpdate({ condition });

  return (
    <Button variant='contained' size='large' onClick={bulkUpdate}>
      <Suspense
        fallback={
          <>
            {condition.targetFieldCode}
            を一括更新
          </>
        }
      >
        <Label fieldCode={condition.targetFieldCode} />
      </Suspense>
    </Button>
  );
};

const Container: FC<Props> = (props) => (
  <RecoilRoot>
    <Component {...props} />
  </RecoilRoot>
);

export default Container;
