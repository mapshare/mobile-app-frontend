import keys from '../data/key';

export const reviewBottomWindow = data => {
  return {
    type: keys.REVIEW_BOTTOM_WINDOW,
    reviewWindow: {
      ...data,
      status: data.status,
    }
  };
};