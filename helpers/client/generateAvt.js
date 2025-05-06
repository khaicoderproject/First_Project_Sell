const avtMan = () => {
  // Generate a random seed
  const seed = Math.random().toString(36).substring(7);
  
  // Use DiceBear's default style (adventurer)
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
};

// Function to get avatar with specific style
const getAvatarByStyle = (style = 'adventurer') => {
  const seed = Math.random().toString(36).substring(7);
  
  switch(style) {
    case 'adventurer':
      return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
    case 'avataaars':
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    case 'bottts':
      return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
    case 'pixel-art':
      return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`;
    case 'personas':
      return `https://api.dicebear.com/7.x/personas/svg?seed=${seed}`;
    case 'micah':
      return `https://api.dicebear.com/7.x/micah/svg?seed=${seed}`;
    case 'miniavs':
      return `https://api.dicebear.com/7.x/miniavs/svg?seed=${seed}`;
    case 'lorelei':
      return `https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}`;
    case 'initials':
      return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;
    case 'identicon':
      return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;
    case 'human':
      return `https://api.dicebear.com/7.x/human/svg?seed=${seed}`;
    case 'gridy':
      return `https://api.dicebear.com/7.x/gridy/svg?seed=${seed}`;
    case 'fun-emoji':
      return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}`;
    case 'bottts-neutral':
      return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${seed}`;
    case 'big-ears':
      return `https://api.dicebear.com/7.x/big-ears/svg?seed=${seed}`;
    case 'big-smile':
      return `https://api.dicebear.com/7.x/big-smile/svg?seed=${seed}`;
    case 'croodles':
      return `https://api.dicebear.com/7.x/croodles/svg?seed=${seed}`;
    case 'notionists':
      return `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}`;
    case 'open-peeps':
      return `https://api.dicebear.com/7.x/open-peeps/svg?seed=${seed}`;
    case 'shapes':
      return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
    case 'thumbs':
      return `https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}`;
    default:
      return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
  }
};

// Function to get random avatar from all styles
const getRandomAvatar = () => {
  const styles = [
    'adventurer', 'avataaars', 'bottts', 'pixel-art', 'personas',
    'micah', 'miniavs', 'lorelei', 'initials', 'identicon',
    'human', 'gridy', 'fun-emoji', 'bottts-neutral', 'big-ears',
    'big-smile', 'croodles', 'notionists', 'open-peeps', 'shapes',
    'thumbs'
  ];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  return getAvatarByStyle(randomStyle);
};

module.exports = { 
  avtMan,
  getAvatarByStyle,
  getRandomAvatar
};
