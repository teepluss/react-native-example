'use strict';

var Reflux = require('reflux');

var actions = require('./actions');
var store = require('react-native-simple-store');

var statusStore = Reflux.createStore({
  listenables: actions,
  onAdded: function(data) {
    store.get('watchlist').then((result) => {
      result.push(data);
      store.save('watchlist', result);

      return result;
    }).then((result) => {
      this.trigger(result);
    });
  },
  onUpdated: function(data) {
    store.get('watchlist').then((result) => {
      result.push(data);
      store.save('watchlist', result);

      return result;
    }).then((result) => {
      this.trigger(result);
    });
  },
  onClear: function() {
    store.delete('watchlist');
    this.trigger([]);
  },
  onFetch: function() {
    store.get('watchlist').then((result) => {
      if (! Array.isArray(result) || result.length === 0) {
        result = [
          {status: 'fetch'}
        ]
      }
      store.save('watchlist', result);
      return result;
    }).then((result) => {
      this.trigger(result);
    })
  }
});

module.exports = statusStore;
