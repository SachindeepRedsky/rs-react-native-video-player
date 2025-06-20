import React from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    ImageStyle,
} from 'react-native';
import Video from 'react-native-video';

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

const VideoList: React.FC<VideoListProps> = ({
    videos,
    onSelect,
    selectedVideoId,
    customStyles = {},
}) => {
    const renderItem = ({ item }: { item: VideoItem }) => {
        const isSelected = item.id === selectedVideoId;

        return (
            <TouchableOpacity
                onPress={() => onSelect(item)}
                style={[
                    styles.item,
                    customStyles.item,
                    isSelected && styles.selectedItem,
                    isSelected && customStyles.selectedItem,
                ]}
            >
                <Video
                    source={{ uri: item.uri }}
                    style={[styles.videoPreview, customStyles.videoPreview]}
                    resizeMode="cover"
                    muted
                    repeat={false}
                    paused={true}
                    controls={false}
                />
                <View style={styles.nowPlayingLabel}>
                    {isSelected && (
                        <Text >Now Playing</Text>
                    )}
                </View>
                <View style={[customStyles.container]}>
                    <Text
                        style={[
                            styles.title,
                            customStyles.title,
                            isSelected && styles.selectedText,
                            isSelected && customStyles.selectedText,
                        ]}
                    >
                        {item.title}
                    </Text>

                    {!!item.description && (
                        <Text style={[styles.description, customStyles.description]}>
                            {item.description}
                        </Text>
                    )}
                    {item.tags && item.tags.length > 0 && (
                        <View style={[styles.tagContainer, customStyles.tagContainer]}>
                            {item.tags.map((tag, index) => (
                                <Text key={index} style={[styles.tag, customStyles.tag]}>
                                    #{tag}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={videos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#444',
        alignItems: 'flex-start',
        gap: 10,
    },
    selectedItem: {
        backgroundColor: '#222',
    },
    videoPreview: {
        width: '35%',
        height: 100,
        borderRadius: 8,
        backgroundColor: '#000',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        color: '#ddd',
        fontWeight: '600',
    },
    selectedText: {
        color: '#00aced',
    },
    description: {
        fontSize: 13,
        color: '#aaa',
        marginTop: 4,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
    },
    tag: {
        fontSize: 12,
        color: '#66ccff',
        marginRight: 8,
    },
    nowPlayingLabel: {
        position:"absolute",
        top:"45%",
        left:"10%",
    },

});

export default VideoList;
