/*
This script inject decoratively and automatically run on specified pages
 */
import * as lib from "./lib";
import {betsNetParser} from "./lib/parsers/bets.net";
import {ggbetParser} from "./lib/parsers/ggbet";
import {gorillaParser} from "./lib/parsers/gorilla";
import {eseaParser} from "./lib/parsers/esea";
import {pariParser} from "./lib/parsers/parimatch";
import {bet365Parser} from "./lib/parsers/bet365";


// number, indicates name type of host
const hostInfo = lib.checkHost(document.location.hostname);


(() => {
  console.log('START');
  if (hostInfo === 1) betsNetParser();
  else if (hostInfo === 2) ggbetParser();
  else if (hostInfo === 3) gorillaParser();
  else if (hostInfo === 4) eseaParser();
  else if (hostInfo === 5) pariParser();
  else if (hostInfo === 6) bet365Parser()
})();







