import type { SpinnerFactory } from '@gfazioli/mantine-spinner';
import type { StylesApiData } from '../components/styles-api.types';

export const SpinnerStylesApi: StylesApiData<SpinnerFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--spinner-animation-direction': 'Animation direction',
      '--spinner-direction': 'Horizontal or vertical direction',
      '--spinner-duration': 'Animation speed duration',
      '--spinner-gap': 'Space between elements',
      '--spinner-fade-edge-size': 'Fade edge size',
      '--spinner-fade-edge-color': 'Fade edge color',
    },
  },

  //modifiers: [{ selector: 'root' }],
};
