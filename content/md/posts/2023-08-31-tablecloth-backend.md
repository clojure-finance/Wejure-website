{:title  "Tablecloth Backend Implementation"
 :layout :post
 :toc :ul
 :author "YANG Ming-Tian"}

Tablecloth is the default backend for Datajure. It is an addition on the top of `tech.ml.dataset`, reorganising its existing functions into simple-to-use APIs.

Detailed documentations of Tablecloth can be found on its [official website](https://scicloj.github.io/tablecloth/).

## Dataset Construction

Datajure provides a function `dataset` to construct a Tablecloth dataset from an associative map. See [Examples](/pages-output/examples/) for specific usage.

Alternatively, you can also create the dataset using the function `tc/dataset` or `tc/let-dataset` provided by Tablecloth, with which you can create a dataset from:

- single values
- sequence of maps
- map of sequences or values
- sequence of columns (taken from other dataset or created manually)
- sequence of pairs: `[string column-data]` or `[keyword column-data]`
- array of any arrays
- file types: raw/gzipped csv/tsv, json, xls(x) taken from local - file system or URL
- input stream

For examples, please refer to the [official document](https://scicloj.github.io/tablecloth/#Dataset_creation) of Tablecloth.

## Row Selection

The row selection operations are implemented with the `tc/select-rows` function in Tablecloth, which natively supports both "by-filter" selection and "by-index" selection. When multiple filters are provided, we use `reduce` to repeatedly apply `tc/select-rows`.

## Column Selection

The column selection operations are implemented with the `tc/select-columns` function in Tablecloth.

## Optional Selection

### Group by

The grouping by operation is implemented using the `tc/group-by` function provided by Tablecloth, which accepts a regular dataset and returns a grouped dataset. The grouped dataset will then be handled by the aggregate functions.

### Sort by

The sorting by operation is implemented using the `tc/order-by` function provided by Tablecloth.

## Aggregate Function

Tablecloth lacks customized support for aggregate functions. Therefore, we need to use the `tc/info` function to generate relevant statistical data of relevant columns when performing grouping by operations, and select the required columns during column selection.

We defined the `get-agg-key` function to solve the naming problem of aggregated columns.