/*
Main library for bets parsers extension
 */

/**
 * Function return value:
 * 1 if host is 'bets.net'
 * 2 if host is 'gorilla'
 * @type {string}
 */
export function checkHost(hostName) {
  if (hostName.includes('betsdota2', 0) || hostName.includes('betscsgo')) return 1;
  else if (hostName.includes('gg', 0)) return 2;
  else if (hostName.includes('gor', 0)) return 3;
  else if (hostName.includes('esea', 0)) return 4;
  else if (hostName.includes('pari', 0)) return 5;
  else if (hostName.includes('bet365')) return 6
}


HTMLDocument.prototype.ready = ms => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
};

HTMLDocument.prototype.wait = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
};
