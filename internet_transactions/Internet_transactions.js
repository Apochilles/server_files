const conf = require('conf');
const moment = require('moment');
const fs = require('fs');
const { deepStrictEqual } = require('assert');
const config = new conf();

const dotenv = require('dotenv').config()

if (dotenv.error) {
console.log("ERROR: .env File Missing.");
process.exit();
}

if (process.env.logName == undefined) {
console.log("ERROR: Log Name Must Be Specified.");
process.exit();
}

var logName = process.env.logName;

logCount = process.env.logCount;
if (logCount == undefined || logCount == "*")
   logCount = 100000;

logDelay = parseInt(process.env.logDelay);
if (isNaN(logDelay))
   logDelay = 2000;

sequence = parseInt(process.env.sequence);
if (isNaN(sequence) || sequence == "0")
{
    seq = 0;
    config.set('seq',0);
}
else
{
    seq = config.get('seq') ;
    if (sequence > seq)
{
       config.set('seq',sequence) ;
  seq = sequence;
}
else
       seq++;
}

try { TransactionDate = process.env.TransactionDate.toString().split("," ); }
catch { random1 = []; }
try { TransactionType = process.env.TransactionType.toString().split("," ); }
catch { random2 = []; }
try { ipAddress = process.env.ipAddress.toString().split("," ); }
catch { random2 = []; }
try { AccountType = process.env.AccountType.toString().split("," ); }
catch { random2 = []; }
try { Description = process.env.Description.toString().split("," ); }
catch { random2 = []; }
try { Amountpve = process.env.Amountpve.toString().split("," ); }
catch { random2 = []; }
try { Amountmve = process.env.Amountmve.toString().split("," ); }
catch { random2 = []; }


 
console.log('logName = '  + logName );
console.log('logCount = ' + logCount);
console.log('logDelay = ' + logDelay);
console.log('last seq = ' + seq);
console.log('TransactionDate = '  + TransactionDate); 
console.log('TransactionType = '  + TransactionType); 
console.log('ipAddress = '  + ipAddress); 
console.log('AccountType = '  + AccountType); 
console.log('Description = '  + Description); 
console.log('Amountpve = '  + Amountpve); 
console.log('Amountmve = '  + Amountmve); 



console.log('logging ...' + "\n");

(function loop(i) {          
   setTimeout(function () {

      idx = Math.floor(Math.random() * TransactionDate.length);
      rnd1 = TransactionDate[idx];
      idx = Math.floor(Math.random() * TransactionType.length);
      rnd2 = TransactionType[idx];
      idx = Math.floor(Math.random() * ipAddress.length);
      rnd3 = ipAddress[idx];
      idx = Math.floor(Math.random() * AccountType.length);
      rnd4 = AccountType[idx];
      idx = Math.floor(Math.random() * Description.length);
      rnd5= Description[idx];
      idx = Math.floor(Math.random() * Amountpve.length);
      rnd6 = Amountpve[idx];
      idx = Math.floor(Math.random() * Amountmve.length);
      rnd7 = Amountmve[idx];

      log(logCount - i + 1, seq, rnd1, rnd2, rnd3, rnd4, rnd5, rnd6, rnd7);
 if (seq != 0)
    seq++ ;  

      if (--i) loop(i);
   }, 1300) // delay

})(logCount);

function log(count, seq, rnd1, rnd2, rnd3) {


   var date = moment().format("[Date:] DD/MM/YYYY    [Time:] hh:mm:ss");
   
   var NoteCount = Math.floor(Math.random() * 10) + 1; // 1 to 10 Notes

   tmp = date + "\n" +
         rnd1 + "," + NoteCount + "," + rnd2 + "," + rnd3 + "," + rnd4 + "," + rnd5 + "," + rnd6 + "," + rnd7 + " " +
"\n";

   console.log("Line " + count + ": " + tmp.substr(0,tmp.length - 1));
   
   fs.appendFileSync(logName, tmp);

   if (seq != 0)
      config.set('seq',seq) ;
} 