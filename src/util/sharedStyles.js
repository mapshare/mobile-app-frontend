import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

const sharedStyle = {
  wp,
  hp,
  loc,
  rol
};

export default sharedStyle;
