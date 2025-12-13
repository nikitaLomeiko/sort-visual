import { IAlgorithmItem } from "./types/algorithm.list.type";

export const algorithmList: IAlgorithmItem[] = [
  {
    id: 1,
    codeName: "BubbleSort.js",
    codeView: `function bubbleSort(arr) {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  
  return array;
}`,
    info: "Сравнивает соседние элементы, при неверном порядке меняет их местами. Каждый проход 'поднимает' один максимальный элемент в конец. Временная сложность O(n²), устойчива, работает на месте.",
    algorithm: async (array, updateArray, updateElementState, delay) => {
      const arr = [...array];
      const n = arr.length;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          updateElementState([j, j + 1], "active");
          await delay();

          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            updateArray([...arr]);
            updateElementState([j, j + 1], "active");
            await delay();
          }

          updateElementState([j, j + 1], "default");
        }
        updateElementState([n - i - 1], "sorted");
      }
      updateElementState([0], "sorted");
    },
  },
  {
    id: 2,
    codeName: "SelectionSort.js",
    codeView: `function selectionSort(arr) {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
  }
  
  return array;
}`,
    info: "На каждом шаге находит минимальный элемент в неотсортированной части и помещает его в конец отсортированной последовательности. Сложность O(n²), неустойчива, минимум обменов.",
    algorithm: async (array, updateArray, updateElementState, delay) => {
      const arr = [...array];
      const n = arr.length;

      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        updateElementState([i], "active");

        for (let j = i + 1; j < n; j++) {
          updateElementState([minIdx, j], "active");
          await delay();

          if (arr[j] < arr[minIdx]) {
            updateElementState([minIdx], "default");
            minIdx = j;
            updateElementState([minIdx], "active");
          } else {
            updateElementState([j], "default");
          }
        }

        if (minIdx !== i) {
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
          updateArray([...arr]);
          updateElementState([i, minIdx], "active");
          await delay();
        }

        updateElementState([i], "sorted");
        if (minIdx !== i) {
          updateElementState([minIdx], "default");
        }
      }

      if (n > 0) {
        updateElementState([n - 1], "sorted");
      }
    },
  },
  {
    id: 3,
    codeName: "InsertionSort.js",
    codeView: `function insertionSort(arr) {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = key;
  }
  
  return array;
}`,
    info: "Элементы последовательно вставляются в уже отсортированную часть массива на нужную позицию. Эффективна для малых или почти упорядоченных массивов. Сложность O(n²) в худшем случае, O(n) в лучшем.",
    algorithm: async (array, updateArray, updateElementState, delay) => {
      const arr = [...array];
      const n = arr.length;

      if (n > 0) {
        updateElementState([0], "sorted");
      }

      for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        updateElementState([i], "active");
        await delay();

        while (j >= 0 && arr[j] > key) {
          updateElementState([j, j + 1], "active");
          await delay();

          arr[j + 1] = arr[j];
          updateArray([...arr]);
          updateElementState([j, j + 1], "active");
          await delay();
          updateElementState([j, j + 1], "default");

          j--;
        }

        arr[j + 1] = key;
        updateArray([...arr]);
        updateElementState([j + 1], "sorted");
        await delay();
      }
    },
  },
  {
    id: 4,
    codeName: "QuickSort.js",
    codeView: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const array = [...arr];
  
  const partition = (low, high) => {
    const pivot = array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
  };
  
  const sort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };
  
  sort(0, array.length - 1);
  return array;
}`,
    info: "Рекурсивный алгоритм `разделяй и властвуй`. Выбирается опорный элемент, массив делится на элементы меньше и больше опорного. Средняя сложность O(n log n), худшая O(n²). Неустойчива, работает на месте.",
    algorithm: async (array, updateArray, updateElementState, delay) => {
      const arr = [...array];

      const sort = async (low: number, high: number): Promise<void> => {
        if (low < high) {
          const pi = await partition(low, high);
          await sort(low, pi - 1);
          await sort(pi + 1, high);
        } else if (low === high) {
          updateElementState([low], "sorted");
          await delay();
        }
      };

      const partition = async (low: number, high: number): Promise<number> => {
        const pivot = arr[high];
        updateElementState([high], "active");

        let i = low - 1;

        for (let j = low; j < high; j++) {
          updateElementState([j, high], "active");
          await delay();

          if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            updateArray([...arr]);
            updateElementState([i, j], "active");
            await delay();
          }

          updateElementState([j, high], "default");
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        updateArray([...arr]);
        updateElementState([i + 1, high], "active");
        await delay();
        updateElementState([high], "default");
        updateElementState([i + 1], "sorted");

        return i + 1;
      };

      await sort(0, arr.length - 1);
    },
  },
  {
    id: 5,
    codeName: "MergeSort.js",
    codeView: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  const merge = (leftArr, rightArr) => {
    const result = [];
    let i = 0, j = 0;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] < rightArr[j]) {
        result.push(leftArr[i]);
        i++;
      } else {
        result.push(rightArr[j]);
        j++;
      }
    }
    
    return result.concat(leftArr.slice(i)).concat(rightArr.slice(j));
  };
  
  return merge(left, right);
}`,
    info: "Делит массив на половины до единичных элементов, затем сливает отсортированные части в упорядоченную последовательность. Гарантированная сложность O(n log n), устойчива, требует O(n) дополнительной памяти.",
    algorithm: async (array, updateArray, updateElementState, delay) => {
      const arr = [...array];

      const merge = async (
        left: number,
        mid: number,
        right: number
      ): Promise<void> => {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);

        let i = 0,
          j = 0,
          k = left;

        while (i < leftArr.length && j < rightArr.length) {
          updateElementState([left + i, mid + 1 + j], "active");
          await delay();

          if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
          } else {
            arr[k] = rightArr[j];
            j++;
          }

          updateArray([...arr]);
          updateElementState([k], "active");
          await delay();
          updateElementState([k], "default");
          k++;
        }

        while (i < leftArr.length) {
          arr[k] = leftArr[i];
          updateArray([...arr]);
          updateElementState([k], "active");
          await delay();
          updateElementState([k], "default");
          i++;
          k++;
        }

        while (j < rightArr.length) {
          arr[k] = rightArr[j];
          updateArray([...arr]);
          updateElementState([k], "active");
          await delay();
          updateElementState([k], "default");
          j++;
          k++;
        }

        updateElementState(
          Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
          "sorted"
        );
        await delay();
      };

      const sort = async (left: number, right: number): Promise<void> => {
        if (left < right) {
          const mid = Math.floor((left + right) / 2);

          updateElementState([mid], "active");
          await delay();
          updateElementState([mid], "default");

          await sort(left, mid);
          await sort(mid + 1, right);
          await merge(left, mid, right);
        } else if (left === right) {
          updateElementState([left], "sorted");
          await delay();
        }
      };

      await sort(0, arr.length - 1);
    },
  },
  {
    id: 6,
    codeName: "HeapSort.js",
    codeView: `function heapSort(arr) {
  const array = [...arr];
  const n = array.length;
  
  const heapify = (size, root) => {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;
    
    if (left < size && array[left] > array[largest]) {
      largest = left;
    }
    
    if (right < size && array[right] > array[largest]) {
      largest = right;
    }
    
    if (largest !== root) {
      [array[root], array[largest]] = [array[largest], array[root]];
      heapify(size, largest);
    }
  };
  
  // Построение максимальной кучи
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }
  
  // Извлечение элементов из кучи
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapify(i, 0);
  }
  
  return array;
}`,
    info: "Строит структуру данных `двоичная куча`, извлекает максимальный элемент (корень), перестраивает кучу. Сложность O(n log n), неустойчива, работает на месте, эффективна для больших данных.",
    algorithm: async (array, updateArray, updateElementState, delay) => {
      const arr = [...array];
      const n = arr.length;

      const heapify = async (size: number, root: number): Promise<void> => {
        let largest = root;
        const left = 2 * root + 1;
        const right = 2 * root + 2;

        if (left < size && arr[left] > arr[largest]) {
          largest = left;
        }

        if (right < size && arr[right] > arr[largest]) {
          largest = right;
        }

        if (largest !== root) {
          updateElementState([root, largest], "active");
          await delay();

          [arr[root], arr[largest]] = [arr[largest], arr[root]];
          updateArray([...arr]);
          updateElementState([root, largest], "active");
          await delay();
          updateElementState([root, largest], "default");

          await heapify(size, largest);
        }
      };

      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
      }

      for (let i = n - 1; i > 0; i--) {
        updateElementState([0, i], "active");
        await delay();

        [arr[0], arr[i]] = [arr[i], arr[0]];
        updateArray([...arr]);
        updateElementState([0, i], "active");
        await delay();

        updateElementState([i], "sorted");
        await delay();

        await heapify(i, 0);
      }

      updateElementState([0], "sorted");
    },
  },
  {
    id: 7,
    codeName: "CocktailShakerSort.js",
    codeView: `function cocktailShakerSort(arr) {
  const array = [...arr];
  const n = array.length;
  let swapped = true;
  let start = 0;
  let end = n - 1;

  while (swapped) {
    swapped = false;

    // Проход слева направо
    for (let i = start; i < end; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }

    if (!swapped) break;

    swapped = false;
    end--;

    // Проход справа налево
    for (let i = end - 1; i >= start; i--) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }

    start++;
  }

  return array;
}`,
    info: "Модификация пузырьковой с попеременными проходами слева направо и справа налево. Сокращает количество сравнений на 25-30%, сложность O(n²).",
    algorithm: async (array, updateArray, updateElementState, delay) => {
      const arr = [...array];
      const n = arr.length;
      let swapped = true;
      let start = 0;
      let end = n - 1;

      while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
          updateElementState([i, i + 1], "active");
          await delay();

          if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            updateArray([...arr]);
            updateElementState([i, i + 1], "active");
            await delay();
            swapped = true;
          }

          updateElementState([i, i + 1], "default");
        }

        if (!swapped) break;

        swapped = false;
        end--;

        updateElementState([end + 1], "sorted");

        for (let i = end - 1; i >= start; i--) {
          updateElementState([i, i + 1], "active");
          await delay();

          if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            updateArray([...arr]);
            updateElementState([i, i + 1], "active");
            await delay();
            swapped = true;
          }

          updateElementState([i, i + 1], "default");
        }

        updateElementState([start], "sorted");
        start++;
      }

      for (let i = start; i <= end; i++) {
        updateElementState([i], "sorted");
        await delay();
      }
    },
  },
];
