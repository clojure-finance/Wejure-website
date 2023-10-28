{:title  "Sort-by Function Implementation"
 :layout :post
 :author "Parry CHOI Chong Hing"}

With the basic foundation and design implemented, we try to add more query options. One of the common options is the sort-by function.

To implement the sort-by option, the query foundation is updated. For the syntax design, the third section has been changed to option section, including group-by, sort-by and future options. However, for the query to differentiate different options, keywords for different options are included. The sort-by syntax is as follows:
```clojure
:sort-by col comparable-operator
```

The *comparable-operator* may be one of:
- Clojure operator like < or >
- tech.numerics/>, tech.numerics/<
- clojure.core/compare
- custome java.util.Comparator
(It will be set to < if nothing is passed.)

The new syntax requires the user to use a corresponding keyword of the function. Here shows the new design:

```clojure
dt-get DT '[[col1 filtering_function1] [agg_keyword col2 filtering_function2] & col1 agg_keyword col2 & :group-by col1 col2 :sort-by col1]

This query has a group-by with col1 and col2 and sorts the return table sorted by ascending order. 

dt-get DT '[[col1 filtering_function1] [agg_keyword col2 filtering_function2] & col1 agg_keyword col2 & :group-by col1 col2 :sort-by col1 >]
```

This query, on the other hand, sorts the return table sorted by descending order. 