const { conversionCharts } = require('./tagCharts');
const yelp = require('node-yelp');
const secret = require('../config/secrets')

// Output: The corresponding tag from 'our tags'
// Input: A tag from an API result and the
// name of the API, as well as the conversion charts
const convertAPITagToOurTag = (apiTag, apiName, charts = conversionCharts) => {
  if ( !(apiName in charts) || !(apiTag in charts[apiName]) ) {
    return charts.defaultTag;
  } else {
    return charts[apiName][apiTag];
  }
};

// Output: A randomly chosen API tag which corresponds
// to the provided tag
// Input: One of 'our tags' and the name of an API,
// as well as the conversion charts
const convertOurTagToAPITag = (ourTag, apiName, charts = conversionCharts) => {
  if ( !(apiName in charts) ) {
    return null;
  } else {
    const apiKeys = Object
    .keys(charts[apiName])
    .filter(key => charts[apiName][key] === ourTag);

    if (apiKeys.length === 0) {
      return null;
    }

    return apiKeys[Math.floor(Math.random() * apiKeys.length)];
  }
};

// Output: The corresponding tag from 'our tags'
// Input: A category tuple from the Yelp API
// (See https://www.yelp.com/developers/documentation/v2/search_api
// for an example of what the tuple looks like)
const convertYelpCategoryToOurTag = (categoryPair, charts = conversionCharts) => {
  return convertAPITagToOurTag(categoryPair[1], 'yelp', charts);
};

// Output: A promise which resolves to an array of the suggestions provided by Yelp
// Input: An array of 'our tags,' as well as the location
// For information, consult:
// https://www.yelp.com/developers/documentation/v2/search_api
const consultYelp = (ourTags, location, charts = conversionCharts) => {
  const yelpTags = [
    ...ourTags.map(tag => convertOurTagToAPITag(tag, 'yelp')),
    convertOurTagToAPITag(charts.defaultTag, 'yelp')
  ];

  const client = yelp.createClient({
    oauth: {
      'consumer_key': process.env.YELP_CONSUMER_KEY || secret.YELP_CONSUMER_KEY,
      'consumer_secret': process.env.YELP_CONSUMER_SECERT || secret.YELP_CONSUMER_SECERT,
      'token': process.env.YELP_TOKEN || secret.YELP_TOKEN,
      'token_secret': process.env.YELP_TOKEN_SECRET || secret.YELP_TOKEN_SECRET
    }
  });

  return client
    .search({ location, category_filter: yelpTags.join(',') })
    .then(data => data.businesses);
};

module.exports = { convertAPITagToOurTag, convertOurTagToAPITag, convertYelpCategoryToOurTag, consultYelp };
