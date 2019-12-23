





/**
 * Список открытых матчей
 * @type {Array}
 */

/*
 * Хранилище списка открытх матчей
 */
let ggbetOpenedMatchesCSGO = [];
let gorillaOpenedMatchesCSGO = [];

/*
 * Прослушивание сообщений от content script
 */
chrome.runtime.onMessage.addListener((message, sender) => {

  if (message.service === 'parimatch') {
    if (message.mode === 'open') {
      chrome.windows.create({
        url: message.src,
        width: 600,
        height:1000
      }, window => {
        setTimeout(() => {
          chrome.windows.remove(window.id);
          console.log('closed')
        }, 14400000)
      })

    }
  }

  if (message.service === 'ggbet') {
    if (message.mode === 'open') {
      chrome.windows.create({
        url: message.src,
        width: 600,
        height:1000
      }, window => {
        setTimeout(() => {
          chrome.windows.remove(window.id);
          console.log('closed')
        }, 14400000)
      })
    } else if (message.mode === 'main') {
      chrome.tabs.create({
        url: message.data.csgoLink
      })
    }
  }

  if (message.service === 'gorilla_parser') {
    if (message.mode === 'match') {
      console.log(message)

      (() => {
        // todo export gorilla
      })()
    } else if (message.mode === 'list') {
      /*
      * Создать вкалдку с требуемым url и записать в массив openedMatches информацию об открытом матче
      */
      if (newMatch(gorillaOpenedMatchesCSGO, message.data.src)) {
        chrome.windows.create({
          url: message.data.src
        }, window => {
          console.log('Window open, ID: ', window.id);
          setTimeout(() => {
            chrome.windows.remove(window.id);
            console.log('closed')
          }, 14400000)
        });
        gorillaOpenedMatchesCSGO.push(message.data.src);
        console.log(gorillaOpenedMatchesCSGO);

      }
    }
  }


  if (message.service === 'ggbet_parser') {
    if (message.mode === 'match') {
      console.log({
        markets: message.markets,
        tabId: sender.tab.id,
        match: message.match
      });

      (() => {
        // todo export ggbet
      })();

      if (message.match.status === 'ENDED') {
        chrome.tabs.remove(sender.tab.id)
      }
    }
    else if (message.mode === 'main') {
      chrome.tabs.create({
        url: message.data.csgoLink
      })
      // chrome.tabs.create({
      //   url: message.data.ggbet.dota2Link
      // })
    } else if (message.mode === 'list') {

      /*
       * Создать вкалдку с требуемым url и записать в массив openedMatches информацию об открытом матче
       */
      if (newMatch(ggbetOpenedMatchesCSGO, message.data.id)) {
        chrome.tabs.create({
          url: message.data.src
        });

        ggbetOpenedMatchesCSGO.push(message.data.id);

        console.log(ggbetOpenedMatchesCSGO);
      }
    }
  }

});

/**
 * Проверка на новый матч
 * @param service
 * @param src
 * @returns {boolean}
 */
function newMatch(service, src) {
  return !service.includes(src);
}


