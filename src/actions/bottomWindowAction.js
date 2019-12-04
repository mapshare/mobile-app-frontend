import keys from '../data/key';

export const reviewBottomWindow = bool => {
  return {
    type: keys.REVIEW_BOTTOM_WINDOW,
    reviewWindowStatus: bool
  };
};