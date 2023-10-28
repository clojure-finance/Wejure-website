{:title  "Syntax Design"
 :layout :post
 :author "Parry CHOI Chong Hing"}

With the foundation of the query being developed, I could start working on the syntax design itself. The syntax design is flexible with the help of macros. We could develop a syntax for our DSL as long as it is recognised by the Clojure language (i.e. following some fundamental rules and syntax imposed by Clojure). 

Clojure has a heavy use of expressions in the language. Every expression is separated and seen as a separate object to Clojure. It could not phrase or recognise syntax like ```DT[, col1,col2]``` - Clojure cannot extract the keywords like ```col1``` and ```col2``` here. In other words, spacing is very important in Clojure, every expression is separated by a space. It is a fundamental syntax of Clojure. This is the biggest limitation imposed by Clojure. 

The design of the query syntax has three main parts:

1. Separation between the selections: How can Clojure recognise the sections of the query (i.e rows, columns, group by and other functions)?

2. Aggregate Functions: How can we nest the aggregated columns in the syntax?

3. Filtering Functions: How can we nest the filtering function in the syntax?

These three parts would largely determine the final syntax of the DSL. A few versions have been developed during the process. Here shows some of the main breakthroughs in the process:

1. <u>Separation between the selections</u>

    With the help of macros, indeed, it would not be a big problem. We could simply add a symbol in between to note the separation (like the comma in other languages). However, it is important to note that, for the symbol and the syntax being recognised by Clojure, the symbol should be regarded as a separate expression. For example, here is the first version of the separation syntax:

    ```
    dt-get DT '[row_filtering , column_selection , group_by_operation]
    ```

    It is easy to notice that the comma is used as the symbol. It has a space in front and after the comma, making it a valid distinct expression in the syntax. However, it is later found that the comma is not recognized by Clojure - it would simply ignore its existence. Instead, the ```&``` symbol is used instead. The final version is the following:

    ```
    dt-get DT '[row_filtering & column_selection & group_by_operation].
    ```

2. <u>Aggregate Functions</u>

    Aggregate Functions is tricky. At first glance, it seems to be a function (and perhaps it ***is*** a function in other languages). However, in our case, with the foundation we have, it is just a special column selection. It is, in fact, the same as selecting other columns in the pipeline created. So, it is simplified to be a recognition problem in our case. In other words, to our DSL, all it needs to know is the aggregating operation and column being applied, no function is involved. Therefore, a simple design of the following is applied:

    Aggregate Column: ```[aggregate_keyword column_applied]```

    Normal Column: ```column_name```

    However, I think the use of nested bracket make it complicated (as least looked complicated) and user-unfriendly. So I decided to do a simple aggregate keyword scan to find the aggregate column which ultimately eliminates the use of brackets. Nice!

3. <u>Filtering Functions</u>

    Filtering is *powerful* in Clojure. Normal filtering in a typical query would be simple; for example, ```col1 < 2000 or col2 != 20```. It is due to the limitation of the filtering provided by other languages. In Clojure, however, the filtering function has no restrictions, as long as it returns a boolean result. That is something we have not seen in other data processing libraries (at least most of them). Such powerful ability of Clojure has given me a huge incentive not to limit users' ability in using such filtering function. So, the design of the filtering functions is, perhaps complicated, the following:

    ```[column filtering_function]```

    The filtering_function is simply the built-in function in Clojure. It would be Clojure-like and, in fact, easy to use, even though it may seem a bit complicated at first.

<u>The Final Design</u><br/>
    Here shows the final design for the DSL syntax:

```clojure
dt-get DT '[[col1 filtering_function1] [agg_keyword col2 filtering_function2] & col1 agg_keyword col2 & col3 col4]
```