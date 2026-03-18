import type { SpinnerFactory } from '@gfazioli/mantine-spinner';
import type { StylesApiData } from '../components/styles-api.types';

export const SpinnerStylesApi: StylesApiData<SpinnerFactory> = {
  selectors: {
    root: 'Root element',
    line: 'Individual spinner segment (line, dot, or arc depending on segmentShape)',
    content: 'Content wrapper (foreignObject) for children',
  },

  vars: {
    root: {
      '--spinner-stroke-linecap': 'Stroke linecap',
      '--spinner-animation-duration': 'Duration of the animation',
      '--spinner-timing-function': 'Animation timing function',
      '--spinner-play-state': 'Animation play state (running or paused)',
      '--spinner-min-opacity': 'Minimum opacity for segments during animation',
      '--spinner-max-opacity': 'Maximum opacity for segments during animation',
    },
  },
};
