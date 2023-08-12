import { useEffect, useRef } from 'react';

const useYouTubePlayer = (youtubeId) => {
    const playerRef = useRef(null);
    
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player(playerRef.current, {
                height: '720',
                width: '1080',
                videoId: `${youtubeId}`,
                playerVars: {
                    'rel': 0
                },
            });
        };
    }, [youtubeId]);

    return playerRef;
};

export default useYouTubePlayer;