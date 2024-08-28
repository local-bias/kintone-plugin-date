import { GUEST_SPACE_ID } from '@/lib/global';
import { getAppId, getFormFields, kintoneAPI } from '@konomi-app/kintone-utilities';
import { selector } from 'recoil';

export const appFieldPropertiesState = selector<kintoneAPI.FieldProperty[]>({
  key: `appFieldPropertiesState`,
  get: async () => {
    const app = getAppId()!;
    const { properties } = await getFormFields({
      app,
      guestSpaceId: GUEST_SPACE_ID,
      debug: process.env.NODE_ENV === 'development',
    });

    const values = Object.values(properties);

    return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});
