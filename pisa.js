/**
 * 分披萨——动态规划算法
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

let dp = [];
const arr = [];
let n = 0;

void async function () {
    // Write your code here
    let count = 0;
    while(line = await readline()){
        const num = Number(line.trim());
        if(count === 0) {
            n = num;
            dp = Array.from(Array(n), ()=>Array(n).fill(-1));
        }
        if(count > 0 && count <= n){
            arr.push(num);
        }
        if(count === n) {
            let totalPrice = 0;
            for(let i=0; i<n; i++) {
                totalPrice = Math.max(totalPrice, arr[i] + solve((i+1)%n, (i+n-1)%n));
            }
            console.log(totalPrice)
        }

        count++;
    }
}()

function solve(L, R){
    if(arr[L] > arr[R]) {
        L = (L+1) % n;
    } else {
        R = (R+n-1) % n;
    }

    if(dp[L][R] !== -1) {
        return dp[L][R];
    }

    if(L===R) {
        dp[L][R] = arr[L];
    } else {
        dp[L][R] = Math.max(arr[L]+solve((L+1)%n, R), arr[R]+solve(L, (R+n-1)%n));
    }

    return dp[L][R];
}