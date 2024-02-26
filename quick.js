/**
 * 快速排序算法
 */
var sortColors = function(nums) {
    function swap(nums, i, j){
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    function qickSort(nums, left, right) {
        if(left>= right) {
            return;
        }
        const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
        swap(nums, randomIndex, left);

        const pivot = nums[left];
        let lt = left;
        let gt = right + 1;

        let i = left + 1;
        while(i < gt) {
            if(nums[i] < pivot) {
                lt++;
                swap(nums, i, lt);
                i++;
            } else if(nums[i] === pivot){
                i++;
            }else{
                gt--;
                swap(nums, i, gt);
            }
        }
        swap(nums, left, lt);

        qickSort(nums, left, lt-1);
        qickSort(nums, gt, right);
    }

    qickSort(nums, 0, nums.length-1);
    return nums;
};

console.log(sortColors([2,0,2,1,1,0]))