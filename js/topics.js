/*
 * Built-in topics used to suggest a category for a new word.
 * `aliases` are category names that count as this topic (singular, lowercase).
 * `keywords` are English words or phrases (singular) found in a word's meaning or definition.
 * `pos` lists parts of speech that point to the topic on their own.
 */
(function (root, factory) {
  const topics = factory();
  if (typeof module === 'object' && module.exports) module.exports = topics;
  else root.VocabTopics = topics;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return [
    {
      name: 'Greetings', aliases: ['greeting', 'phrase', 'expression', 'greetings & phrases', 'politeness'],
      pos: ['interjection'],
      keywords: ['hello', 'hi', 'hey', 'goodbye', 'bye', 'farewell', 'greeting', 'thank', 'thanks', 'please', 'sorry',
        'excuse me', 'welcome', 'good morning', 'good evening', 'good night', 'good day', 'cheers', 'congratulation',
        'how are you', 'see you', 'pardon', 'apologise', 'apologize'],
    },
    {
      name: 'Food & drink', aliases: ['food', 'drink', 'food & drink', 'food and drink', 'eating', 'cooking', 'kitchen', 'meal', 'restaurant'],
      keywords: ['food', 'drink', 'eat', 'meal', 'breakfast', 'lunch', 'dinner', 'supper', 'snack', 'bread', 'butter', 'milk',
        'cheese', 'egg', 'meat', 'fish', 'chicken', 'pork', 'beef', 'sausage', 'ham', 'fruit', 'apple', 'banana', 'orange',
        'berry', 'strawberry', 'blueberry', 'lingonberry', 'vegetable', 'potato', 'carrot', 'tomato', 'onion', 'cucumber',
        'salad', 'soup', 'porridge', 'rice', 'pasta', 'cake', 'cookie', 'biscuit', 'bun', 'pastry', 'chocolate', 'sweet',
        'candy', 'sugar', 'salt', 'pepper', 'coffee', 'tea', 'juice', 'water', 'beer', 'wine', 'alcohol', 'cook', 'bake',
        'fry', 'boil', 'taste', 'delicious', 'hungry', 'thirsty', 'flour', 'oil', 'cream', 'yoghurt', 'yogurt', 'pizza',
        'sandwich', 'dessert', 'ice cream', 'mushroom', 'jam', 'cereal', 'menu', 'restaurant', 'cafe', 'café', 'beverage'],
    },
    {
      name: 'Family', aliases: ['family', 'people', 'family & people', 'relative', 'relationship', 'person'],
      keywords: ['mother', 'mum', 'mom', 'father', 'dad', 'parent', 'sister', 'brother', 'sibling', 'son', 'daughter',
        'child', 'baby', 'grandmother', 'grandfather', 'grandparent', 'grandchild', 'aunt', 'uncle', 'cousin', 'niece',
        'nephew', 'wife', 'husband', 'spouse', 'partner', 'family', 'relative', 'friend', 'boyfriend', 'girlfriend',
        'marry', 'married', 'wedding', 'man', 'woman', 'boy', 'girl', 'person', 'people', 'neighbour', 'neighbor'],
    },
    {
      name: 'Home', aliases: ['home', 'house', 'household', 'furniture', 'home & house'],
      keywords: ['house', 'home', 'apartment', 'flat', 'room', 'kitchen', 'bedroom', 'bathroom', 'living room', 'toilet',
        'shower', 'door', 'window', 'wall', 'floor', 'ceiling', 'roof', 'stair', 'balcony', 'garden', 'yard', 'garage',
        'sauna', 'furniture', 'table', 'chair', 'sofa', 'couch', 'bed', 'lamp', 'shelf', 'cupboard', 'wardrobe', 'closet',
        'mirror', 'carpet', 'rug', 'curtain', 'stove', 'oven', 'fridge', 'refrigerator', 'sink', 'key', 'pillow',
        'blanket', 'towel', 'dish', 'plate', 'cup', 'glass', 'spoon', 'fork', 'knife', 'clean', 'wash', 'vacuum'],
    },
    {
      name: 'Numbers', aliases: ['number', 'numeral', 'counting', 'math', 'maths'],
      pos: ['numeral'],
      keywords: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
        'thirteen', 'twenty', 'thirty', 'forty', 'fifty', 'hundred', 'thousand', 'million', 'number', 'first', 'second',
        'third', 'half', 'quarter', 'count', 'numeral', 'cardinal number', 'ordinal number'],
    },
    {
      name: 'Colours', aliases: ['colour', 'color', 'colours & shapes'],
      keywords: ['colour', 'color', 'red', 'blue', 'green', 'yellow', 'black', 'white', 'grey', 'gray', 'brown', 'pink',
        'purple', 'violet', 'orange colour', 'orange color', 'beige', 'turquoise', 'gold', 'silver', 'dark', 'light blue'],
    },
    {
      name: 'Shapes', aliases: ['shape', 'form', 'geometry', 'colours & shapes', 'shapes & colours'],
      keywords: ['shape', 'form', 'circle', 'square', 'triangle', 'rectangle', 'oval', 'star', 'heart', 'line', 'dot',
        'point', 'corner', 'angle', 'cube', 'sphere', 'ball', 'cone', 'cylinder', 'pyramid', 'diamond', 'spiral',
        'round', 'straight', 'curved', 'flat', 'pointed', 'geometry'],
    },
    {
      name: 'Nature', aliases: ['nature', 'outdoors', 'environment', 'landscape', 'plant'],
      keywords: ['nature', 'forest', 'wood', 'tree', 'flower', 'plant', 'grass', 'leaf', 'lake', 'sea', 'ocean', 'river',
        'stream', 'island', 'shore', 'beach', 'mountain', 'hill', 'fell', 'valley', 'field', 'meadow', 'swamp', 'bog',
        'rock', 'stone', 'sand', 'earth', 'ground', 'sky', 'sun', 'moon', 'star', 'birch', 'pine', 'spruce', 'mushroom',
        'berry', 'landscape', 'environment', 'wilderness', 'national park', 'northern lights', 'aurora'],
    },
    {
      name: 'Weather', aliases: ['weather', 'climate', 'season'],
      keywords: ['weather', 'rain', 'snow', 'sleet', 'hail', 'wind', 'storm', 'thunder', 'lightning', 'cloud', 'cloudy',
        'sunny', 'fog', 'mist', 'frost', 'ice', 'cold', 'hot', 'warm', 'cool', 'freeze', 'temperature', 'degree', 'climate',
        'forecast', 'umbrella', 'rainbow', 'drizzle', 'blizzard', 'humid', 'spring', 'summer', 'autumn', 'fall', 'winter'],
    },
    {
      name: 'Animals', aliases: ['animal', 'pet', 'wildlife', 'bird', 'insect'],
      keywords: ['animal', 'pet', 'dog', 'cat', 'puppy', 'kitten', 'horse', 'cow', 'pig', 'sheep', 'goat', 'chicken', 'hen',
        'rooster', 'duck', 'goose', 'bird', 'fish', 'salmon', 'perch', 'pike', 'bear', 'wolf', 'fox', 'lynx', 'elk',
        'moose', 'reindeer', 'deer', 'hare', 'rabbit', 'squirrel', 'mouse', 'rat', 'hedgehog', 'owl', 'swan', 'crow',
        'seagull', 'gull', 'insect', 'mosquito', 'fly', 'bee', 'wasp', 'ant', 'butterfly', 'spider', 'snake', 'frog',
        'seal', 'whale', 'lion', 'tiger', 'elephant', 'monkey', 'mammal', 'wildlife'],
    },
    {
      name: 'Body & health', aliases: ['body', 'health', 'body & health', 'medicine', 'doctor', 'hospital'],
      keywords: ['body', 'head', 'hair', 'face', 'eye', 'ear', 'nose', 'mouth', 'tooth', 'teeth', 'tongue', 'lip', 'neck',
        'shoulder', 'arm', 'hand', 'finger', 'leg', 'knee', 'foot', 'feet', 'toe', 'back', 'stomach', 'belly', 'heart',
        'blood', 'bone', 'skin', 'health', 'healthy', 'ill', 'sick', 'illness', 'disease', 'pain', 'ache', 'headache',
        'fever', 'cold', 'flu', 'cough', 'doctor', 'nurse', 'hospital', 'medicine', 'pharmacy', 'injury', 'hurt',
        'wound', 'tired', 'sleep', 'dentist', 'appointment'],
    },
    {
      name: 'Clothes', aliases: ['clothes', 'clothing', 'fashion', 'garment'],
      keywords: ['clothes', 'clothing', 'garment', 'shirt', 't-shirt', 'trousers', 'pants', 'jeans', 'skirt', 'dress',
        'jacket', 'coat', 'sweater', 'jumper', 'hoodie', 'sock', 'shoe', 'boot', 'sandal', 'hat', 'cap', 'beanie', 'scarf',
        'glove', 'mitten', 'belt', 'tie', 'suit', 'underwear', 'pyjamas', 'pajamas', 'swimsuit', 'wear', 'dress up',
        'button', 'zipper', 'pocket', 'sleeve', 'collar', 'bag', 'handbag', 'ring', 'necklace', 'glasses'],
    },
    {
      name: 'Time & calendar', aliases: ['time', 'calendar', 'date', 'day', 'week', 'month', 'time & calendar', 'days & months'],
      keywords: ['time', 'clock', 'hour', 'minute', 'second', 'moment', 'day', 'week', 'weekend', 'month', 'year', 'decade',
        'century', 'today', 'tomorrow', 'yesterday', 'morning', 'afternoon', 'evening', 'night', 'noon', 'midnight',
        'now', 'later', 'soon', 'early', 'late', 'always', 'never', 'often', 'sometimes', 'monday', 'tuesday', 'wednesday',
        'thursday', 'friday', 'saturday', 'sunday', 'january', 'february', 'march', 'april', 'may', 'june', 'july',
        'august', 'september', 'october', 'november', 'december', 'calendar', 'date', 'birthday', 'holiday', 'christmas',
        'midsummer', 'easter', 'season'],
    },
    {
      name: 'Travel & transport', aliases: ['travel', 'transport', 'transportation', 'traffic', 'travel & transport', 'trip', 'holiday'],
      keywords: ['travel', 'trip', 'journey', 'holiday', 'vacation', 'tourist', 'transport', 'traffic', 'car', 'bus', 'tram',
        'train', 'metro', 'subway', 'taxi', 'bicycle', 'bike', 'boat', 'ship', 'ferry', 'plane', 'airplane', 'aeroplane',
        'airport', 'station', 'stop', 'platform', 'ticket', 'passport', 'luggage', 'suitcase', 'road', 'street', 'highway',
        'bridge', 'map', 'drive', 'ride', 'fly', 'arrive', 'depart', 'departure', 'arrival', 'hotel', 'reservation',
        'border', 'abroad', 'direction', 'left', 'right', 'straight', 'north', 'south', 'east', 'west'],
    },
    {
      name: 'Places & city', aliases: ['place', 'city', 'town', 'places & city', 'building', 'location', 'country'],
      keywords: ['city', 'town', 'village', 'capital', 'country', 'place', 'building', 'library', 'school', 'museum',
        'church', 'shop', 'store', 'supermarket', 'market', 'bank', 'post office', 'police station', 'hospital', 'park',
        'square', 'cinema', 'theatre', 'theater', 'office', 'factory', 'restaurant', 'cafe', 'café', 'bar', 'hotel',
        'centre', 'center', 'suburb', 'neighbourhood', 'neighborhood', 'address', 'finland', 'helsinki', 'sweden', 'europe'],
    },
    {
      name: 'Work & school', aliases: ['work', 'job', 'school', 'study', 'studies', 'education', 'office', 'profession', 'work & school', 'career'],
      keywords: ['work', 'job', 'employ', 'employee', 'employer', 'boss', 'colleague', 'office', 'meeting', 'salary',
        'wage', 'profession', 'occupation', 'career', 'company', 'business', 'customer', 'teacher', 'student', 'pupil',
        'school', 'university', 'college', 'class', 'lesson', 'course', 'exam', 'test', 'homework', 'study', 'learn',
        'teach', 'book', 'notebook', 'pen', 'pencil', 'paper', 'computer', 'subject', 'language', 'grammar', 'word',
        'sentence', 'question', 'answer', 'doctor', 'nurse', 'engineer', 'lawyer', 'police', 'driver', 'cook', 'chef',
        'waiter', 'cleaner', 'farmer', 'artist', 'musician', 'writer'],
    },
    {
      name: 'Feelings', aliases: ['feeling', 'emotion', 'mood', 'feelings & emotions', 'personality'],
      keywords: ['feel', 'feeling', 'emotion', 'happy', 'glad', 'joy', 'sad', 'sorrow', 'angry', 'anger', 'afraid', 'fear',
        'scared', 'worried', 'worry', 'nervous', 'calm', 'tired', 'bored', 'boring', 'interested', 'surprised', 'love',
        'hate', 'like', 'dislike', 'lonely', 'proud', 'ashamed', 'embarrassed', 'jealous', 'excited', 'hope', 'mood',
        'shy', 'kind', 'friendly', 'brave', 'lazy'],
    },
    {
      name: 'Hobbies & sport', aliases: ['hobby', 'hobbies', 'sport', 'sports', 'free time', 'leisure', 'hobbies & sport', 'music'],
      keywords: ['hobby', 'free time', 'leisure', 'sport', 'game', 'play', 'football', 'soccer', 'ice hockey', 'hockey',
        'basketball', 'tennis', 'golf', 'ski', 'skiing', 'skate', 'swim', 'run', 'jog', 'walk', 'hike', 'cycle', 'gym',
        'exercise', 'team', 'match', 'win', 'lose', 'music', 'song', 'sing', 'dance', 'guitar', 'piano', 'instrument',
        'concert', 'film', 'movie', 'read', 'reading', 'paint', 'draw', 'photograph', 'fishing', 'knit', 'travel'],
    },
    {
      name: 'Shopping & money', aliases: ['shopping', 'money', 'shopping & money', 'finance', 'store'],
      keywords: ['shop', 'shopping', 'store', 'buy', 'sell', 'pay', 'price', 'cost', 'expensive', 'cheap', 'money', 'cash',
        'coin', 'euro', 'cent', 'card', 'credit card', 'receipt', 'discount', 'sale', 'offer', 'customer', 'cashier',
        'bag', 'basket', 'change', 'bill', 'invoice', 'bank', 'account', 'loan', 'tax', 'budget', 'wallet'],
    },
    {
      name: 'Technology', aliases: ['technology', 'tech', 'computer', 'internet', 'digital', 'it'],
      keywords: ['technology', 'computer', 'laptop', 'phone', 'mobile phone', 'smartphone', 'telephone', 'internet',
        'website', 'email', 'e-mail', 'message', 'app', 'application', 'software', 'program', 'program', 'keyboard',
        'screen', 'mouse', 'password', 'download', 'upload', 'network', 'wifi', 'charger', 'battery', 'camera',
        'television', 'tv', 'radio', 'video', 'photo', 'printer', 'data', 'file', 'social media'],
    },
    { name: 'Verbs', aliases: ['verb', 'action', 'verbs & actions'], pos: ['verb'], keywords: [] },
    { name: 'Adjectives', aliases: ['adjective', 'describing words', 'description'], pos: ['adjective'], keywords: [] },
    { name: 'Adverbs', aliases: ['adverb'], pos: ['adverb'], keywords: [] },
  ];
});
