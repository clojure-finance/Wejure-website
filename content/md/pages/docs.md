{:title "Docs"
 :layout :page
 :toc :ul
 :page-index 0
 :navbar? true}

## Background

Clojure is a functional programming language, a dialect of Lisp. It is excellent for concurrency operations with concise syntax and immutable data structures. It simplifies concurrency or multithreaded programming due to its immutable core data structures. The in-built macro system in the Lisp languages with the code-as-data philosophy also enables huge flexibility in programs.

### Macro System in Clojure

The macro system in Clojure allows the compiler to be extended by code. The reader accepts the input code and constructs an [Abstract Syntax Tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree), which will then be transformed by the macro expander into another AST for execution. The transformation using the macros could be defined by the user. Such a feature provides an excellent foundation for defining a syntax in Clojure, subject to its fundamental syntax.

The figure below shows the overview of the evaluation process of Clojure.

![Clojure Compilation Overview](../../img/clojure_evaluation.png)

### Domain-specific Language

[Domain-Specific Language (DSL)](https://en.wikipedia.org/wiki/Domain-specific_language) is a computer language, declared syntax or grammar that is specialised in a specific application. In contrast to [General-Purpose Language (GPL)](https://en.wikipedia.org/wiki/General-purpose_language), the implementation of DSL is designed with specific goals in that application domain. The use of macros in Lisp dialects enables developers to rewrite source code at compile-time, making implementation of DSL more convenient. As one of the Lisp dialects, Clojure also inherits such an advantage. In addition to macros, the heavy use of core data literals in Clojure also gives an extensive developing opportunity in implementing DSLs.

## Overview

![Overview of Methodology](../../img/methodology.png)

Datajure takes the query code written in the custom syntax as input, phrasing it into a Clojure map containing the arguments of different operations. The library functions are called according to our logical processing order, returning the data table.

## Logical Processing Order

Simply put, Datajure implemented the functionality of the `SELECT` statements in [Structured Query Language (SQL)](https://en.wikipedia.org/wiki/SQL), a declarative query language designed for managing the data in a [Relational Database Management System (RDBMS)](https://en.wikipedia.org/wiki/Relational_database), but with slightly different set of operations involved, due to the nature of our target usage scenario. Theerefore, the logical processing order of the `SELECT` statement has been adopted in Datajure.

The following table compares the supported operations and their logical processing order of Datajure and SQL `SELECT`.

|Datajure Order|SQL Order|Operations|Description|
|:-:|:-:|:-:|:-:|
||1|`FROM`|Specifies a table, view, table variable, or derived table source, with or without an alias, to use in the Transact-SQL statement|
||2|`ON`|Specifies arbitrary conditions or specify columns to join|
||3|`JOIN`|Retrieves data from two or more tables based on logical relationships between the tables|
|1|4|`WHERE`|Specifies the search condition for the rows returned by the query|
|2||`ROW`|Specifies the row index for the rows returned by the query|
|3|5|`GROUP BY`|Divides the query result into groups of rows|
||6|`WITH CUBE`/`WITH ROLLUP`|Extend functions for `GROUP BY`|
|4|7|`HAVING`|Specifies a search condition for a group or an aggregate|
|5|8|`SELECT`|Specifies the columns to be returned by the query|
||9|`DISTINCT`|Specifies to return only distinct values|
|6|10|`ORDER BY`|Sorts data returned by a query|
||11|`TOP`|Specifies the number of records to return|

## Syntax

A query statement has three sections: row selection section, column selection section and optional section. Each section is represented by a sequence of operations enclosed within `[]`.

```clojure
(dtj/query data [ROW-SELECTION-SECTION] [COLUMN-SELECTION-SECTION] [OPTIONS])
```

### Row Selection Section

The first section of the argument input is the row selection section. It corresponds to the `WHERE`, `HAVING` and `ROW` operations in the table for logical processing order. The user could either select the rows using filters or by row index. The use of a filter would override row index selection.

To select all rows, just leave the section empty instead.

#### Row Selection by Filter

```clojure
[col filter-function]
```

This shows the syntax of row selection using a filter. `col` refers to the column to be filtered, and `filter-function` refers to the filtering function. This is one of the powerful features - the filtering function can be any custom function returning a boolean result. One can define a filtering function for the selection using Clojure built-in fast function syntax: `#{ ... }`. This is valid as long as it returns a boolean.

#### Row Selection by Index

```clojure
row-index
```

This shows the syntax of row selection using row index. `row-index` refers to the index of the desired row.

#### Row Selection with Both Filter and Row Index

```clojure
[col filter-function] row-index
```

This shows the case where filtering overrides the use of row index. In this case, the filtering function would override the row index. The pipeline will ignore the row-index part.

### Column Selection Section

The second section of the argument input is the selection of columns.

```clojure
col
```

This is the syntax of column selection, where `col` refers to the column selected.

To select all columns, just put an empty list `[]` instead.

### Optional Section

The third section of the argument section is the optional section. This section specifies all the optional operations, including the `GROUP BY` and `SORT BY` operations.

#### Optional Operation

```clojure
operation-keyword operation-arguments
```

This shows the syntax of an optional operation. `operation-keyword` refers to the operation keyword for the program to identify the operation. It includes `:group-by` and `:sort-by`. `operation-arguments` refers to the corresponding operation arguments, subject to the operation.

#### Group by

```clojure
:group-by col
```

This shows the syntax of a group by operation. `col` refers to the column(s) to be grouped.

#### Sort by

```clojure
:sort-by col sort-by-function
```

This shows the syntax of a sort by operation. `col` refers to the column to be sorted. `sort-by-function` refers to the sorting function, with `<` (ascending order) as default. Similar to the filtering function, the sorting function can be any custom function returning a boolean result. It can also be Clojure operator like `<` or `>`, `clojure.core/compare` or custom `java.util.Comparator`.

### Aggregate Function

With the `group-by` operation is implemented, aggregate functions are also needed to be implemented in the syntax.

```clojure
aggregate-keyword col
```

This shows the syntax of an aggregated column. `aggregate-keyword` specifies the aggregated function. col refers to the column to be aggregated. One could directly replace the aggregated column syntax in any column argument. Table below shows the complete aggregate functions available and the corresponding aggregate keywords.

| Aggregate Function        | Keyword      |
|---------------------------|--------------|
| Minimum                   | `:min`       |
| Maximum                   | `:max`       |
| Mode                      | `:mode`      |
| Summation                 | `:sum`       |
| Standard Deviation        | `:sd`        |
| Skew                      | `:skew`      |
| NumberValid Rows          | `:n-valid`   |
| Number of Missing Rows    | `:n-missing` |
| Total Number of Rows      | `:n`         |

## Backends

Currently, Datajure supports the following data processing libraries as the backend: [`tech.ml.dataset`](https://github.com/techascent/tech.ml.dataset), [Tablecloth](https://github.com/scicloj/tablecloth), [Clojask](https://github.com/clojure-finance/clojask) and [Geni](https://github.com/zero-one-group/geni).

Although Datajure uses Tablecloth by default, the users can still specify their preferred backend. The statement to specify the backend has the following syntax:

```clojure
(dtj/set-backend BACKEND)
```

For example, we can write `(dtj/set-backend "tech.ml.dataset")` to specify `tech.ml.dataset` as the backend.

For technical details, please refer to our [posts](/archives/).

Although we strive for consistency in the behavior of each backend. However, due to the differences in the APIs they provide, there are still some operations that are not fully supported in some backends.

### `tech.ml.dataset`

All operations above are supported.

### Tablecloth

All operations above are supported.

### Clojask

All operations above are supported. However, due to the limitations of Clojask itself, the user must manually load the dataset from a `.csv` file and store the final result in a file.

Example:

```clojure
(ck/dataframe "example.csv")
```

For more information, please refer to the [API Docs](https://clojure-finance.github.io/clojask-website/posts-output/API/) of Clojask.

### Geni

All operations above are supported. However, due to the limitations of Geni itself, customized comparators are not supported in the `:sort-by` operation, and the `filter-function` field must be an expression written with Geni operators, e.g., `g/<`, instead of Clojure operators such as `<`.

Example:

```clojure
(g/=== :name (g/lit "Alice"))
(g/&& (g/> :age 20) (g/< :salary 1000))
```

For more information, please refer to the [Docs](https://github.com/zero-one-group/geni) of Geni.