/**
 * 分披萨——动态规划算法
 */
const readline = require('readline');

const rl = readline.createInterface({  // 创建readline接口
    input: process.stdin,
    output: process.stdout
});

let n;  // 披萨的数量
let a;  // 每块披萨的美味值

rl.question('', (input) => {  // 提示用户输入披萨的数量
    n = parseInt(input);  // 将用户输入的数量转换为整数
    a = [];  // 初始化披萨美味值数组

    rl.setPrompt('');  // 设置提示信息
    rl.prompt();  // 显示提示信息

    rl.on('line', (line) => {  // 监听用户输入
        a.push(parseInt(line));  // 将用户输入的美味值转换为整数并存入数组
        if (a.length === n) {  // 如果数组长度等于披萨的数量
            rl.close();  // 关闭readline接口
        } else {
            rl.prompt();  // 显示提示信息
        }
    });

    rl.on('close', () => {  // 监听接口关闭事件
        const dp = Array.from(Array(n), () => Array(n).fill(-1));  // 初始化记忆化数组，全部赋值为-1

        function solve(L, R) {  // 定义计算函数
            if (a[L] > a[R]) {  // “馋嘴“选择一块披萨吃掉，对应端点移动
                L = (L + 1) % n;
            } else {
                R = (R + n - 1) % n;
            }

            if (dp[L][R] !== -1) {  // 如果该状态已经计算过，则直接返回结果
                return dp[L][R];
            }

            if (L === R) {  // 如果左右端点相同，则说明只剩下一块披萨，直接返回该披萨的美味值
                dp[L][R] = a[L];
            } else {
                dp[L][R] = Math.max(a[L] + solve((L + 1) % n, R), a[R] + solve(L, (R + n - 1) % n));  // 分别计算选择左边披萨和选择右边披萨的情况下的最大美味值
            }

            return dp[L][R];
        }

        let ans = 0;  // 初始化答案
        for (let i = 0; i < n; i++) {  // 枚举吃货第一步取哪块披萨
            ans = Math.max(ans, solve((i + 1) % n, (i + n - 1) % n) + a[i]);  // 计算当前情况下吃货最多能吃到的披萨的美味值，并更新答案
        }

        console.log(ans);  // 输出最多能吃到的披萨的美味值
    });
});