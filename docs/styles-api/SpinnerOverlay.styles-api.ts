import type { SpinnerOverlayFactory } from '@gfazioli/mantine-spinner';
import type { StylesApiData } from '../components/styles-api.types';

export const SpinnerOverlayStylesApi: StylesApiData<SpinnerOverlayFactory> = {
  selectors: {
    root: 'Root element',
    overlay: 'Overlay element with backdrop blur and centered spinner',
  },
  vars: {
    root: {
      '--spinner-overlay-z-index': 'Overlay z-index',
      '--spinner-overlay-blur': 'Overlay backdrop blur filter',
    },
  },
};
