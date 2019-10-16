"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobalCache = getGlobalCache;
exports.resetAllCaches = resetAllCaches;
var caches = {};

function createGlobalCache() {
  var cachedData = new Map();
  var updateListeners = [];

  function notifyUpdate() {
    updateListeners.forEach(function (listener) {
      try {
        listener();
      } catch (error) {
        console.error(error);
      }
    });
  }

  function removeListener(listener) {
    var listenerIndex = updateListeners.indexOf(listener);

    if (listenerIndex >= 0) {
      updateListeners.splice(listenerIndex, 1);
    }
  }

  return {
    getValue: function getValue(key) {
      return cachedData.get(key);
    },
    setValue: function setValue(key, value) {
      cachedData.set(key, value);
      notifyUpdate();
    },
    clearAll: function clearAll() {
      cachedData.clear();
      notifyUpdate();
    },
    subscribeToUpdates: function subscribeToUpdates(updateListener) {
      updateListeners.push(updateListener);
      return function () {
        return removeListener(updateListener);
      };
    },
    getListenerCount: function getListenerCount() {
      return updateListeners.length;
    }
  };
}

function getGlobalCache(id) {
  if (!caches[id]) {
    caches[id] = createGlobalCache();
  }

  return caches[id];
}

function resetAllCaches() {
  Object.keys(caches).forEach(function (key) {
    delete caches[key];
  });
}