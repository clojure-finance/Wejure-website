{:title  "Geni Backend Implementation"
 :layout :post
 :toc :ul
 :author "YANG Ming-Tian"}

Geni is a Clojure dataframe library that runs on Apache Spark. It provides an idiomatic Spark interface for Clojure without the hassle of Java or Scala interop. Therefore, this backend is actually supported by Apache Spark, while we use Geni's APIs in the implementation.

For the details of Geni APIs, please refer to [Geni Documentation](https://github.com/zero-one-group/geni). For the details of Apache Spark behaviour, please refer to [Spark Documentation](https://spark.apache.org/docs/latest/).

## Dataset Construction

Datajure provides a function `dataset` to construct a Geni dataset from an associative map. See [Examples](/pages-output/examples/) for specific usage.

In addition, Geni also provides a variety of APIs for creating/importing dataframes or datasets, such as `g/to-df`, `g/create-dataframe`, `g/table->dataset`, `g/map->dataset `, and `g/records->dataset`.

For examples, please refer to the [official document](https://github.com/zero-one-group/geni/blob/develop/docs/manual_dataset_creation.md) of Geni.

## Row Selection

The row selection operations are implemented with the `g/filter` function in Geni, which supports "by-filter" selection but not "by-index" selection.

### Row Selection by Filter

The filter operation is implemented with the `g/filter` function provided by Geni. When multiple filters are provided, we use `reduce` to repeatedly apply `g/filter`. However, due to the limitations of Geni itself, the filter functions must be expressions written with Geni operators, e.g., `g/<`, instead of Clojure operators such as `<`.

For more information, please refer to [Geni Semantics](https://github.com/zero-one-group/geni/blob/develop/docs/semantics.md).

### Row Selection by Index

Since row selection by index is not natively supported by Geni and the order of the rows in the dataset is not guaranteed, the users are highly suggested to manually add a column for indices and then perform filter operations on that column.

## Column Selection

The column selection operations are implemented with the `g/select` function in Geni.

## Optional Selection

### Group by

The grouping by operation is implemented using the `g/group-by` function provided by Geni, which accepts a regular dataset and returns a grouped dataset. The grouped dataset will then be handled by the aggregate functions.

### Sort by

The sorting by operation is implemented using the `g/sort` function provided by Geni. However, due to the limitations of Geni itself, customized comparators are not supported.

## Aggregate Function

We use the `g/agg` function to calculate statistical data of relevant columns when performing grouping by operations. To avoid runtime errors, we require that columns participating in aggregation must be of numeric type.

The aggregation result column naming follows Geni’s default. We define the `get-agg-key` function to convert the Datajure-style column description statements in the query statement into Geni style.