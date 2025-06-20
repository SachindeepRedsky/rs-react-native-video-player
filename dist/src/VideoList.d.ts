import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export interface VideoItem {
    id: string;
    title: string;
    uri: string;
    description?: string;
    tags?: string[];
}
interface VideoListProps {
    videos: VideoItem[];
    onSelect: (video: VideoItem) => void;
    selectedVideoId: string;
    customStyles?: {
        container?: StyleProp<ViewStyle>;
        item?: StyleProp<ViewStyle>;
        selectedItem?: StyleProp<ViewStyle>;
        videoPreview?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        selectedText?: StyleProp<TextStyle>;
        description?: StyleProp<TextStyle>;
        tagContainer?: StyleProp<ViewStyle>;
        tag?: StyleProp<TextStyle>;
    };
}
declare const VideoList: React.FC<VideoListProps>;
export default VideoList;
