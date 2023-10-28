{:title  "Clojask Backend Implementation"
 :layout :post
 :toc :ul
 :author "YANG Ming-Tian"}

Clojask is an open-source library for parallel computing of larger-than-memory datasets developed at HKU Business School.

Clojask relies on Onyx for parallel computing. In Datajure, we set the number of workers to 8, which does not support manual modification by users.

Unlike other backends that return modified datasets, Clojask's API will make modifications directly on the original dataset. In order to simplify the code logic, we always manually return the reference of the original data set when writing internal functions.

The operation of Clojask backend involves a lot of file reading and writing. Excessive file manipulation is tiring. In addition, the data type information may be lost during the file reading and writing process, and thus the data type needs to be respecified. Therefore, it is recommended to use the Clojask backend only when the dataset to be processed is larger than the memory.

For convenience, we store the temporary files generated during data processing in the `./.dsl/` directory. If these files are no longer needed, you can delete them manually.

Detailed documentations of Clojask can be found on its [official website](https://clojure-finance.github.io/clojask-website/).

## Dataset Construction

Datajure provides a function `dataset` to construct a Clojask dataset from an associative map. See [Examples](/pages-output/examples/) for specific usage.

However, since Clojask's data operations are highly dependent on external files, constructing data directly within the program may lead to unexpected errors. Therefore, you are highly recommended to read the dataset from a file using `ck/dataframe`.

**Example**

```clojure
;; defines df as a dataframe from dataframe.csv file
(def df (ck/dataframe "resources/Employee.csv"))
```

If customized seperators or different file formats are used, please first read and parse the file using `clojask-io.input/read-file`, and then pass it to `ck/dataframe`.

**Example**

```clojure
;; define df to be a dataframe with customized seperator
(require '[clojask-io.input :as input])
(def df (ck/dataframe (fn [] (input/read-file "resources/Employees.csv" :sep "," :output true :stat true))))
```

For more details of `ck/dataframe`, please refer to the [official document](https://clojure-finance.github.io/clojask-website/posts-output/API/#dataframe) of Clojask.

For more details of `clojask-io` please refer to its [GitHub repo](https://github.com/clojure-finance/clojask-io).

By default, all the column types are string. In order to perform subsequent operations correctly, specifying the type of data in each column is an essential step. To do so, please use the [`ck/set-type`](https://clojure-finance.github.io/clojask-website/posts-output/API/#set-type) function provided by Clojask.

**Example**

```clojure
;; set data type of the column "Salary" to be double 
(set-type x "Salary" "double")
```

The natively supported types are: `int`, `double`, `string`, `date`.

If you need a special parsing function, please use [`ck/set-parser`](https://clojure-finance.github.io/clojask-website/posts-output/API/#set-parser).

**Example**

```clojure
;; parse all the values in "Salary" with this function
(set-parser x "Salary" #(Double/parseDouble %))
```

## Row Selection

### Row Selection by Filter

The filter operation is implemented with the `ck/filter` function provided by Clojask. When multiple filters are provided, we use `doall` and `map` to repeatedly apply `ck/filter`.

### Row Selection by Index

Since row selection by index is not natively supported by Clojask and the order of the rows in the dataset is not guaranteed, the users are highly suggested to manually add a column for indices and then perform filter operations on that column.

## Column Selection

The column selection operations are implemented with the `ck/compute` function in Clojask. The result will be stored in `./.dsl/select-result.csv`.

## Optional Selection

### Group by

The grouping by operation is implemented using the `ck/group-by` function provided by Clojask, which accepts a regular dataset and returns a grouped dataset. The grouped dataset will then be handled by `calc-stats` to perform aggregate functions. The result will be computed using `ck/compute` in `./.dsl/group-by-result.csv`, and then reloaded.

In order to perform subsequent operations correctly, you are highly suggested to respecify the type of data after reloading.

### Sort by

The sorting operation is not well supported by Clojask. Therefore, we have implemented an `external-sort` function using [Externalsortinginjava](https://github.com/lemire/externalsortinginjava). Temporary input and output are stored in `./.dsl/sort-input.csv` and `./.dsl/sort-output.csv` respectively.

Since this third-party library has limited support for custom comparators, we defined `cmp-gen` to convert user-written comparators into the form required by the library. This function only supports comparing data of type `int`.

In order to perform subsequent operations correctly, you are highly suggested to respecify the type of data after reloading.

## Aggregate Function

We use the `ck/aggregate` function to calculate statistical data of relevant columns when performing grouping by operations.

We defined the `get-agg-name` function to solve the naming problem of aggregated columns.