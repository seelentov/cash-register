const cashTable = [{ name: 'ONE HUNDRED', val: 100},{ name: 'TWENTY', val: 20},{ name: 'TEN', val: 10},{ name: 'FIVE', val: 5},{ name: 'ONE', val: 1},{ name: 'QUARTER', val: 0.25},{ name: 'DIME', val: 0.1},{ name: 'NICKEL', val: 0.05},{ name: 'PENNY', val: 0.01}
];

const checkCashRegister = (price, cash, cid) =>{
  const result = {status: '', change: []};
 let change = cash - price;
 const cashRegister = cid.reduce((ttl, crnt) =>{
 ttl.total += crnt[1];
 ttl[crnt[0]] = crnt[1];
 return ttl;
 }, {total: 0})

 if(cashRegister.total === change) {
 result.status = 'CLOSED';
 result.change = cid;
 return result;
 }

 if(cashRegister.total < change) {
 result.status = 'INSUFFICIENT_FUNDS';
 return result;
 }

 const change_arr = cashTable.reduce((ttl, crnt) => {
  let count = 0;
 while(cashRegister[crnt.name] > 0 && change >= crnt.val) {
 change -= crnt.val;
 cashRegister[crnt.name] -= crnt.val;
 count += crnt.val;
 change = Math.round(change * 100) / 100;
 }

 if(count > 0) {
 ttl.push([ crnt.name, count ]);
 }
 return ttl;
 }, []);

 if(change_arr.length < 1 || change > 0) {
 result.status = 'INSUFFICIENT_FUNDS';
 return result;
 }

 result.status = 'OPEN';
 result.change = change_arr;
 return result;
}

console.log(checkCashRegister(19.5, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))