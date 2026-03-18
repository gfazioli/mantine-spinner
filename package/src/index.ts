import { Spinner as SpinnerBase } from './Spinner';
import { SpinnerGroup } from './SpinnerGroup';
import { SpinnerOverlay } from './SpinnerOverlay';

const Spinner = Object.assign(SpinnerBase, {
  Group: SpinnerGroup,
  Overlay: SpinnerOverlay,
});

export { Spinner };
export type {
  SpinnerBaseProps,
  SpinnerCssVariables,
  SpinnerDirection,
  SpinnerFactory,
  SpinnerGradient,
  SpinnerProps,
  SpinnerSegmentShape,
  SpinnerStylesNames,
  SpinnerVariant,
} from './Spinner';
export type { SpinnerGroupProps } from './SpinnerGroup';
export type { SpinnerOverlayProps } from './SpinnerOverlay';
