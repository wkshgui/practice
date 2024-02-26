/**
 * 贪心歌手——贪心算法
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    let count = 0;
    let T = 0;
    let N = 0;
    let used = 0;
    const res = [];
    while(line = await readline()){
        const arr = line.split(' ');
        if(count === 0) {
            T = Number(arr[0]);
            N = Number(arr[1]);
        }
        if(count === 1) {
            for(let i=0; i<arr.length; i++) {
                used += Number(arr[i]);
            }
        }
        if(count > 1 && count <= N+1){
            let num = T - used;
            let i = 0;
            let w = arr[0];
            let c = arr[1];
            let price = 0 
            while(i<=num && price>=0){
                price = w - c*i;
                res.push(price)
                i++
            }
        }
        if(count === N+1) {
            let num = T - used;
            res.sort((a, b) => b-a);
            let totalPrice = 0;
            for(let i=0; i<num; i++) {
                totalPrice += res[i]
            }
            console.log(totalPrice)
        }

        count++;
    }
}()