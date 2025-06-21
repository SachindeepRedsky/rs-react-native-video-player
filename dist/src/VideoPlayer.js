import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Animated, Dimensions, TouchableWithoutFeedback, PanResponder, } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MINI_WIDTH = 250;
const MINI_HEIGHT = 150;
const VideoPlayer = ({ source, title = '', description = '', tags = [], onNext, onBack, onFullscreenChange, onClose, customStyles = {}, customIcons = {}, }) => {
    const playerRef = useRef(null);
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(false);
    const [loop, setLoop] = useState(false);
    const [rate, setRate] = useState(1.0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const pan = useRef(new Animated.ValueXY({ x: SCREEN_WIDTH - MINI_WIDTH - 10, y: SCREEN_HEIGHT - MINI_HEIGHT - 10 })).current;
    useEffect(() => {
        setPaused(false);
        setCurrentTime(0);
    }, [source.uri]);
    const togglePlayPause = () => setPaused(!paused);
    const toggleMute = () => setMuted(!muted);
    const toggleLoop = () => setLoop(!loop);
    const toggleRate = () => setRate(prev => (prev === 1 ? 0.5 : prev === 0.5 ? 2 : 1));
    const toggleFullscreen = () => {
        const newState = !isFullscreen;
        if (newState) {
            Orientation.lockToLandscape();
        }
        else {
            Orientation.lockToPortrait();
        }
        setIsFullscreen(newState);
        onFullscreenChange?.(newState);
    };
    const toggleMiniPlayer = () => {
        if (isFullscreen) {
            Orientation.lockToPortrait();
            setIsFullscreen(false);
            onFullscreenChange?.(false);
            setTimeout(() => {
                setIsMinimized(true);
            }, 300);
        }
        else {
            setIsMinimized(!isMinimized);
        }
    };
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            pan.setOffset({
                x: pan.x._value,
                y: pan.y._value,
            });
            pan.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            pan.flattenOffset();
            const x = Math.max(0, Math.min(pan.x._value, SCREEN_WIDTH - MINI_WIDTH));
            const y = Math.max(0, Math.min(pan.y._value, SCREEN_HEIGHT - MINI_HEIGHT));
            Animated.spring(pan, {
                toValue: { x, y },
                useNativeDriver: true,
            }).start();
        },
    })).current;
    const onLoad = (data) => setDuration(data.duration);
    const onProgress = (data) => setCurrentTime(data.currentTime);
    const seekTo = (time) => {
        playerRef.current?.seek(time);
        setCurrentTime(time);
    };
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const handleVideoEnd = () => {
        if (loop) {
            playerRef.current?.seek(0);
            setPaused(false);
        }
        else {
            onNext?.();
        }
    };
    const videoStyles = isMinimized
        ? styles.miniVideo
        : isFullscreen
            ? styles.fullscreenVideo
            : [styles.video, customStyles.video];
    const renderControls = () => (<View style={[styles.controlsWrapper, isFullscreen && styles.fullscreenOverlay]}>
      <Slider style={[isFullscreen ? styles.sliderFullscreen : styles.slider, customStyles.slider]} minimumValue={0} maximumValue={duration} value={currentTime} minimumTrackTintColor="#00aced" maximumTrackTintColor="#ccc" thumbTintColor="#00aced" onSlidingComplete={seekTo}/>
      <View style={styles.timeContainer}>
        <Text style={isFullscreen
            ? [styles.timeTextFullscreen, customStyles.timeTextFullscreen]
            : [styles.timeText, customStyles.timeText]}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>

      <View style={[styles.controls, customStyles.controls]}>
        <TouchableOpacity onPress={toggleMute} style={[styles.button, customStyles.button]}>
          <Image style={styles.tinyLogo} source={muted ? customIcons.unmute || require('./assets/unmute.png') : customIcons.mute || require('./assets/mute.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBack} style={[styles.button, customStyles.button]}>
          <Image style={styles.tinyLogo} source={customIcons.back || require('./assets/back.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} style={[styles.button, customStyles.button]}>
          <Image style={styles.tinyLogo} source={paused ? customIcons.play || require('./assets/play1.png') : customIcons.pause || require('./assets/pause.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext} style={[styles.button, customStyles.button]}>
          <Image style={styles.tinyLogo} source={customIcons.next || require('./assets/next.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLoop} style={[styles.button, customStyles.button]}>
          <Image style={styles.tinyLogo} source={loop ? customIcons.loop || require('./assets/loop.png') : customIcons.unloop || require('./assets/unloop.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleRate} style={[styles.button, customStyles.button]}>
          <Text style={styles.buttonText}>{rate}x</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFullscreen} style={[styles.button, customStyles.button]}>
          <Image style={styles.tinyLogo} source={isFullscreen
            ? customIcons.mini || require('./assets/mini.png')
            : customIcons.fullscreen || require('./assets/fullscreen.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMiniPlayer} style={[styles.button, customStyles.button]}>
          <Image style={styles.tinyLogo} source={customIcons.pip || require('./assets/pip.png')}/>
        </TouchableOpacity>
      </View>
    </View>);
    const videoPlayer = isMinimized ? (<Animated.View style={[styles.miniContainer, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]} {...panResponder.panHandlers}>
      <Video ref={playerRef} source={source} style={videoStyles} resizeMode="contain" paused={paused} muted={muted} rate={rate} repeat={false} onLoad={onLoad} onProgress={onProgress} onEnd={handleVideoEnd}/>
      <View style={styles.miniControls}>
        <TouchableOpacity onPress={togglePlayPause} style={styles.miniplay}>
          <Image style={{ width: 30, height: 30 }} source={paused ? customIcons.play || require('./assets/play1.png') : customIcons.pause || require('./assets/pause.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            setIsMinimized(false);
        }}>
          <Image style={{ width: 25, height: 25, float: "left", padding: 15 }} source={customIcons.mini || require('./assets/mini.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            setIsMinimized(false);
            setIsFullscreen(false);
            Orientation.lockToPortrait();
            onFullscreenChange?.(false);
            setPaused(true);
            onClose?.();
        }}>
          <Image style={{ width: 30, height: 30, position: "absolute", top: 0, left: 170 }} source={customIcons.close || require('./assets/close.png')}/>
        </TouchableOpacity>

      </View>
    </Animated.View>) : (<View style={isFullscreen ? styles.fullscreenContainer : [styles.container, customStyles.container]}>
      <View style={{ flex: 1 }}>
        {isFullscreen ? (<TouchableWithoutFeedback onPress={() => setShowControls(prev => !prev)}>
            <View style={{ flex: 1 }}>
              <Video ref={playerRef} source={source} style={styles.fullscreenVideo} resizeMode="cover" paused={paused} muted={muted} repeat={loop} rate={rate} onLoad={onLoad} onProgress={onProgress} onEnd={handleVideoEnd}/>
              {showControls && <View>
                {renderControls()}
              </View>}
            </View>
          </TouchableWithoutFeedback>) : (<>
            <Video ref={playerRef} source={source} style={videoStyles} resizeMode="contain" paused={paused} muted={muted} repeat={loop} rate={rate} onLoad={onLoad} onProgress={onProgress} onEnd={handleVideoEnd}/>
            {renderControls()}
          </>)}
      </View>
    </View>);
    return (<>
      {!isMinimized && (<View style={[styles.mainContainer]}>
          {videoPlayer}
          {!isFullscreen && (<View style={styles.infoContainer}>
              <Text style={[styles.title, customStyles.title]}>{title}</Text>
              {!!description && <Text style={[styles.description, customStyles.description]}>{description}</Text>}
              {!!tags.length && (<View style={styles.tagContainer}>
                  {tags.map((tag, i) => (<Text key={i} style={[styles.tag, customStyles.tag]}>#{tag}</Text>))}
                </View>)}
            </View>)}
        </View>)}
      {isMinimized && videoPlayer}
    </>);
};
const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: 'black' },
    container: { backgroundColor: 'black', marginBottom: 10 },
    fullscreenContainer: { ...StyleSheet.absoluteFillObject, backgroundColor: 'black', zIndex: 1000, elevation: 10 },
    video: { width: '100%', height: 250 },
    fullscreenVideo: { width: '100%', height: 450, backgroundColor: 'black', zIndex: 999 },
    miniVideo: { width: MINI_WIDTH, height: MINI_HEIGHT },
    miniContainer: {
        position: 'absolute',
        width: MINI_WIDTH,
        height: MINI_HEIGHT,
        zIndex: 2000,
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'black',
    },
    miniControls: { width: "97%", height: 40, position: 'absolute', top: 5, right: 5, flexDirection: 'row', gap: 10 },
    miniplay: {
        position: "absolute",
        top: 100,
        right: 102,
        fontSize: 13
    },
    slider: { width: '100%', height: 20 },
    sliderFullscreen: { width: '100%', height: 40, zIndex: 2000 },
    controls: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingVertical: 8, },
    button: { padding: 6 },
    buttonText: { fontSize: 18, color: '#00aced' },
    infoContainer: { padding: 10 },
    title: { color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
    description: { color: '#ddd', fontSize: 14, marginBottom: 6 },
    tagContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    tag: { color: '#00aced', marginRight: 8, fontSize: 13 },
    tinyLogo: { width: 30, height: 25 },
    timeContainer: { alignItems: 'center', paddingVertical: 4 },
    timeText: { color: '#ccc', fontSize: 12 },
    timeTextFullscreen: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    fullscreenOverlay: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1000,
    },
    controlsWrapper: { width: '100%' },
});
export default VideoPlayer;
