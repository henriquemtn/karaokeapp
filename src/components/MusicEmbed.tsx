import YouTube from 'react-youtube';

const MusicEmbed = ({ videoId }: any) => {
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <YouTube videoId={videoId} opts={opts} />
  );
};

export default MusicEmbed;
