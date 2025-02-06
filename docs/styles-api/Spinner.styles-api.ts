import type { SpinnerFactory } from '@gfazioli/mantine-spinner';
import type { StylesApiData } from '../components/styles-api.types';

export const SpinnerStylesApi: StylesApiData<SpinnerFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--spinner-size': 'Size of the spinner',
      '--spinner-animation-duration': 'Duration of the animation',
      '--spinner-color': 'Color of the spinner',
    },
  },

  //modifiers: [{ selector: 'root' }],
};
