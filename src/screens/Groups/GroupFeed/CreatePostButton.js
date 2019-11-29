import React, { Component } from "react";
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Modal,
    FlatList,
    ScrollView,
    Image
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import { AppTourView } from 'react-native-app-tour';

//Redux actions
import { connect } from 'react-redux';
import {
    setImage,
    imageStatus,
} from '../../../actions/addPostActions';

// Componenets Style
import styles from "./Stylesheet";
import { Actions } from "react-native-router-flux";
import ImagePicker from 'react-native-image-picker';

// Group Menu
class CreatePostButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImagePickerActive: false
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    choosePhoto() {
        this.setState({ isImagePickerActive: true }, () => {

            let options = {
                title: null,
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };

            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {

                    this.props.setImage(response.data);
                    this.props.imageStatus(false);
                    Actions.createPostModal();
                }
            });
            setTimeout(() => { this.setState({ isImagePickerActive: false }); }, 1000)
        });
    };

    render() {
        return (
            <View style={styles.container} >
                <TouchableOpacity
                    style={styles.CreatePost}
                    onPress={() => this.choosePhoto()}
                    disabled={this.state.isImagePickerActive}
                    key={'crtfeed'}
                    title={'Create Group Feed'}
                    ref={ref => {
                        if (!ref) return
            
                        let props = {
                          order: 2,
                          title: 'Camera Button',
                          description: 'This is used to create new Group Feed to share amoung group members',
                          outerCircleColor: '#3f52ae'
                        }
            
                        this.props.addAppTourTarget &&
                          this.props.addAppTourTarget(AppTourView.for(ref, { ...props }))
                      }}
                      
                >
                    <Icon style={styles.cameraIcon} name="camera" size={30} />
                </TouchableOpacity>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        setImage: data => dispatch(setImage(data)),
        imageStatus: data => dispatch(imageStatus(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePostButton);
