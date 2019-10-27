import keys from "../data/key";

export const displayModalWindow = bool => {
  return {
    type: keys.MODAL_WINDOW,
    status: bool
  };
};
