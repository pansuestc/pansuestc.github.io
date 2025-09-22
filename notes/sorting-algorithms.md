# Sorting Algorithms Analysis

## Overview

Sorting is a fundamental operation in computer science. Here's an analysis of common sorting algorithms.

## Comparison-Based Sorts

### Bubble Sort
- **Time Complexity**: $O(n^2)$ average and worst case, $O(n)$ best case
- **Space Complexity**: $O(1)$
- **Stable**: Yes

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
```

### Merge Sort
- **Time Complexity**: $O(n \log n)$ in all cases
- **Space Complexity**: $O(n)$
- **Stable**: Yes

The merge operation combines two sorted arrays:

$$T(n) = 2T(n/2) + O(n)$$

By the Master Theorem: $T(n) = O(n \log n)$

### Quick Sort
- **Time Complexity**: $O(n \log n)$ average, $O(n^2)$ worst case
- **Space Complexity**: $O(\log n)$ average
- **Stable**: No

Expected number of comparisons: $C(n) = 2(n+1)H_n - 4n$ where $H_n$ is the $n$-th harmonic number.

### Heap Sort
- **Time Complexity**: $O(n \log n)$ in all cases
- **Space Complexity**: $O(1)$
- **Stable**: No

## Non-Comparison Sorts

### Counting Sort
- **Time Complexity**: $O(n + k)$ where $k$ is the range of input
- **Space Complexity**: $O(k)$
- **Stable**: Yes

Effective when $k = O(n)$.

### Radix Sort
- **Time Complexity**: $O(d(n + k))$ where $d$ is the number of digits
- **Space Complexity**: $O(n + k)$
- **Stable**: Yes

For integers with $d$ digits in base $k$, processes digits from least to most significant.

## Algorithm Comparison Table

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable |
|-----------|-----------|--------------|------------|-------|--------|
| Bubble Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Selection Sort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No |
| Insertion Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Merge Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes |
| Quick Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No |
| Heap Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | No |

## Lower Bound for Comparison-Based Sorting

Any comparison-based sorting algorithm requires at least $\lceil \log_2(n!) \rceil$ comparisons in the worst case.

Using Stirling's approximation: $\log_2(n!) \approx n \log_2(n) - n \log_2(e) + O(\log n)$

Therefore, the lower bound is $\Omega(n \log n)$.

## Practical Considerations

1. **For small arrays**: Insertion sort is often faster due to low overhead
2. **For nearly sorted data**: Insertion sort or bubble sort can be $O(n)$
3. **Memory constraints**: Heap sort uses $O(1)$ space
4. **Stability requirements**: Use merge sort or bubble sort
5. **Integer data with small range**: Consider counting sort or radix sort