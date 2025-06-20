import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
interface VideoPlayerProps {
    source: {
        uri: string;
    };
    title?: string;
    description?: string;
    tags?: string[];
    onNext?: () => void;
    onBack?: () => void;
    onFullscreenChange?: (isFullscreen: boolean) => void;
    onClose?: () => void;
    customStyles?: {
        container?: StyleProp<ViewStyle>;
        video?: StyleProp<ViewStyle>;
        controls?: StyleProp<ViewStyle>;
        button?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        description?: StyleProp<TextStyle>;
        tag?: StyleProp<TextStyle>;
        slider?: StyleProp<ViewStyle>;
        timeText?: StyleProp<TextStyle>;
        timeTextFullscreen?: StyleProp<TextStyle>;
    };
    customIcons?: {
        play?: any;
        pause?: any;
        mute?: any;
        unmute?: any;
        pip?: any;
        fullscreen?: any;
        loop?: any;
        unloop?: any;
        next?: any;
        back?: any;
        close?: any;
        mini?: any;
    };
}
declare const VideoPlayer: React.FC<VideoPlayerProps>;
export default VideoPlayer;
