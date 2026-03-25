import { Spinner } from './Spinner';
import { SpinnerGroup } from './SpinnerGroup';
import { SpinnerOverlay } from './SpinnerOverlay';

Spinner.Group = SpinnerGroup;
Spinner.Overlay = SpinnerOverlay;

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
export type {
  SpinnerGroupFactory,
  SpinnerGroupProps,
  SpinnerGroupStylesNames,
} from './SpinnerGroup';
export type {
  SpinnerOverlayCssVariables,
  SpinnerOverlayFactory,
  SpinnerOverlayProps,
  SpinnerOverlayStylesNames,
} from './SpinnerOverlay';
