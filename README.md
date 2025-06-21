## React Native Video Player Library

A customizable, full-featured video player library for React Native.
Supports fullscreen, minimization (mini-player), playback controls, video list, and more.

## 📦 Features
----------
- Play/Pause, Mute/Unmute, Loop
- Fullscreen toggle
- Mini-player with draggable position
- Adjustable playback rate (0.5x, 1x, 2x)
- Custom UI icons and styles
- Video metadata: title, description, tags
- Video list with preview and selection
- Works with `react-native-video` and `@react-native-community/slider`
- Orientation lock for fullscreen `react-native-orientation-locker`

## 🧩 Dependency Versions
| Package                         | Version |
| ------------------------------- | ------- |
| Node                            | 22.2.0  |
| React                           | ^19.1.0 |
| React Native                    | ^0.80.0 |
| react-native-video              | ^6.15.0 |
| @react-native-community/slider  | ^4.5.7  |
| react-native-orientation-locker | ^1.7.0  |

## 🚀 Installation
--------------
Install dependencies:
```
npm install react-native-video @react-native-community/slider react-native-orientation-locker
```

Library installation:

```
npm install react-native-video-player-lib
```

## 🛠️ Usage Example
----------------

```tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { VideoPlayer, VideoList, VideoItem } from 'react-native-video-player-lib';

const videoData: VideoItem[] = [
  {
    id: '...',
    title: '...',
    uri: '...',
    description: '...',
    tags: [...],
  },
  ...
];

export default function App() {
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <ScrollView>
      {currentVideo && (
        <VideoPlayer
          source={{ uri: currentVideo.uri }}
          title={currentVideo.title}
          description={currentVideo.description}
          tags={currentVideo.tags}
          onNext={() => { ... }}
          onBack={() => { ... }}
          onFullscreenChange={setIsFullscreen}
          onClose={() => setCurrentVideo(null)}
          //Optional: VideoPlayer css
          customStyles={}
          //Optional: Video Player Control Icons(like Play, Pause, Loop, Unloop, Picture-in-Picture etc.)
          customIcons={}
        />
      )}

      {!isFullscreen && (
        <VideoList
          videos={videoData}
          onSelect={(video) => setCurrentVideo(video)}
          selectedVideoId={currentVideo?.id || ''}
          //Optional: VideoList css
          customStyles={}
        />
      )}
    </ScrollView>
  );
}
```

## Explaination

| Prop            | Type                 | Description                     |
| --------------- | -------------------- | ------------------------------- |
| videos          | `VideoItem[]`        | List of videos to show          |
| onSelect        | `(video: VideoItem)` | Called when a video is selected |
| selectedVideoId | `string`             | ID of the selected video        |
| customStyles    | `object`             | Override styles (see below)     |

## 🎨 CustomStyles (VideoPlayer)
These styles let you override internal styling.

```
customStyles = {
  container: ViewStyle,
  video: ViewStyle,
  controls: ViewStyle,
  button: ViewStyle,
  title: TextStyle,
  description: TextStyle,
  tag: TextStyle,
  slider: ViewStyle,
  timeText: TextStyle,
  timeTextFullscreen: TextStyle,
}
```
| Property             | Type      | Description                                   |
| -------------------- | --------- | --------------------------------------------- |
| `container`          | ViewStyle | Style for the outer video player container    |
| `video`              | ViewStyle | Style for the video element itself            |
| `controls`           | ViewStyle | Style for the control buttons container       |
| `button`             | ViewStyle | Style for each individual control button      |
| `title`              | TextStyle | Style for the video title                     |
| `description`        | TextStyle | Style for the video description               |
| `tag`                | TextStyle | Style for individual tags                     |
| `slider`             | ViewStyle | Style for the progress slider                 |
| `timeText`           | TextStyle | Style for time text under the slider (normal) |
| `timeTextFullscreen` | TextStyle | Style for time text in fullscreen mode        |


## 🖼️ customIcons (VideoPlayer)
Override default icons with your own.

```
customIcons = {
  play: require('./my-icons/play.png'),
  pause: require('./my-icons/pause.png'),
  mute: require('./my-icons/mute.png'),
  unmute: require('./my-icons/unmute.png'),
  fullscreen: require('./my-icons/full.png'),
  pip: require('./my-icons/pip.png'),
  loop: require('./my-icons/loop.png'),
  unloop: require('./my-icons/unloop.png'),
  back: require('./my-icons/back.png'),
  next: require('./my-icons/next.png'),
  close: require('./my-icons/close.png'),
  mini: require('./my-icons/mini.png'),
}
```

| Icon Key     | Type           | Description                               |
| ------------ | -------------- | ----------------------------------------- |
| `play`       | `require(...)` | Icon for play button                      |
| `pause`      | `require(...)` | Icon for pause button                     |
| `mute`       | `require(...)` | Icon when audio is on                     |
| `unmute`     | `require(...)` | Icon when audio is muted                  |
| `fullscreen` | `require(...)` | Icon for entering fullscreen              |
| `mini`       | `require(...)` | Icon for exiting fullscreen or minimizing |
| `pip`        | `require(...)` | Icon for PiP or mini-player toggle        |
| `loop`       | `require(...)` | Icon for loop enabled                     |
| `unloop`     | `require(...)` | Icon for loop disabled                    |
| `next`       | `require(...)` | Icon for next video                       |
| `back`       | `require(...)` | Icon for previous video                   |
| `close`      | `require(...)` | Icon for closing the mini-player          |


## 🎨 CustomStyles (VideoList)
```
customStyles = {
  container: ViewStyle,
  item: ViewStyle,
  selectedItem: ViewStyle,
  videoPreview: ViewStyle,
  title: TextStyle,
  selectedText: TextStyle,
  description: TextStyle,
  tagContainer: ViewStyle,
  tag: TextStyle,
}
```

| Property       | Type      | Description                                |
| -------------- | --------- | ------------------------------------------ |
| `container`    | ViewStyle | Style for each video list item wrapper     |
| `item`         | ViewStyle | Style for default (unselected) list items  |
| `selectedItem` | ViewStyle | Style for selected/active list item        |
| `videoPreview` | ViewStyle | Style for the video thumbnail preview      |
| `title`        | TextStyle | Style for the video title                  |
| `selectedText` | TextStyle | Style applied to selected video title text |
| `description`  | TextStyle | Style for the video description            |
| `tagContainer` | ViewStyle | Style for tag container (wraps tags)       |
| `tag`          | TextStyle | Style for individual tags                  |


## 📌 Default Styles Summary
- Video size: 250px height (normal), 450px (fullscreen), 150px (mini)
- Controls: Toggleable controls (play/pause, mute, rate, loop, etc.)
- Slider: Shows time and supports scrubbing

## 🧠 Tips
- mini-player is draggable. Drag anywhere on screen.
- Orientation locks automatically in fullscreen using react-native-orientation-locker.
- If you don't pass customIcons, default icons are used from the assets/ folder.
- You can disable unused buttons by hiding them via customStyles.button.

## 🧪 Troubleshooting
- Make sure react-native-video is properly linked.
- On Android, add permissions for internet access to stream videos.
- If fullscreen doesn't lock correctly, ensure you have react-native-orientation-locker properly installed.