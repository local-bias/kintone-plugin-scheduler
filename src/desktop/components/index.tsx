import { ErrorBoundary } from '@common/components/error-boundary';
import styled from '@emotion/styled';
import React, { FC, FCX } from 'react';
import { RecoilRoot } from 'recoil';
import Calendar from './calendar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { jaJP } from '@mui/material/locale';

import Observer from './observer';
import Dialog from './dialog';
import Fab from './fab';
import { pluginConditionState } from '../states/kintone';
import { SnackbarProvider } from 'notistack';

const Component: FCX<{ condition: kintone.plugin.Condition }> = ({ className, condition }) => (
  <ErrorBoundary>
    <RecoilRoot
      initializeState={({ set }) => {
        set(pluginConditionState, condition);
      }}
    >
      <SnackbarProvider maxSnack={1}>
        <ThemeProvider theme={createTheme({}, jaJP)}>
          <Observer />
          <Dialog />
          <div className={className}>
            <div className='calendar'>
              <Calendar />
            </div>
          </div>
          <Fab />
        </ThemeProvider>
      </SnackbarProvider>
    </RecoilRoot>
  </ErrorBoundary>
);

const StyledComponent = styled(Component)`
  font-family: 'Noto Sans JP', 'Yu Gothic Medium', YuGothic, メイリオ;
  color: #41525c;

  padding: 1rem;
  display: flex;
  gap: 1rem;

  .calendar {
    flex: 1;
  }

  .fc-event-time,
  .fc-event-title-container {
    padding: 0.1rem 0.25rem;
  }
`;

export default StyledComponent;
