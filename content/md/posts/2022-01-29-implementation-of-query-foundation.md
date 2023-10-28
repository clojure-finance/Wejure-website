{:title "Implementation of Query Foundation"
 :layout :post
 :author "Parry CHOI Chong Hing"}

The implementation of the DSL query foundation went well. The biggest problem I have encountered was the group by operation. This is mainly due to the difference in the output results of the generic query and the tech.ml.dataset. The group by function in tech.ml.dataset outputs a map with the column values (or indices) to the corresponding datatable; while our query would be outputting a single datatable, similar to SQL query. The library also does not support multiple column group-by operation.

To solve the difference in output, a table join between the first item in group-by datatable and the descriptive table is made. This combines all the aggregated columns and the original columns, forming a table with all columns.

To solve the multiple column group-by problem, an aggregation of the group by columns is made. A single group-by operation is made to the aggregated column. This column, although remains in the table, will be filtered out in the later step in the operation.