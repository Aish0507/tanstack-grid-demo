import React from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import { handlers } from '../mocks/handlers';
import { worker } from '../../../../.msw/browser';

import { ClientDataTable, ServerDataTable } from './tableComponents';

export default {
  title: 'Table',
  decorators: [
    (Story) => {
      worker.use(...handlers);

      return <Story />;
    },
    withKnobs,
  ],
};

export const ClientSideDesktop = () => (
  <div
    style={{
      fontFamily: 'sans-serif',
      fontWeight: 300,
      color: '#172f3d',
    }}
  >
    <ClientDataTable
      loading={boolean('loading', false)}
      isStriped={boolean('isStriped', false)}
      language={text('Language', 'en')}
    />
  </div>
);
