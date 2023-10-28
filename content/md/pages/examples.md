{:title "Examples"
 :layout :page
 :toc :ul
 :page-index 1
 :navbar? true}

The following are several examples showing how to use Datajure to conveniently complete various data processing operations.

--- 

## Backend Specification

The following code sets `tablecloth` as the backend using the function `set-backend`:

```clojure
(dtj/set-backend "tablecloth")
```

## Datasets Construction

The following code construct a dataset object `data` of the specified backend from an associative map `data-map` using the function `dataset`:

```clojure
(def data {:age [31 25 18 18 25]
           :name ["a" "b" "c" "c" "d"]
           :salary [200 500 200 370 3500]})
(dtj/dataset data)
```

## Datasets Printing

The following code prints the content of the dataset `data` using the function `print-dataset`:

```clojure
(dtj/print (dtj/dataset data))
```

## Operations

Choose a backend:

<ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-tmd-tab" data-bs-toggle="pill" data-bs-target="#pills-tmd" type="button" role="tab" aria-controls="pills-tmd" aria-selected="false">tech.ml.dataset</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="pills-tablecloth-tab" data-bs-toggle="pill" data-bs-target="#pills-tablecloth" type="button" role="tab" aria-controls="pills-tablecloth" aria-selected="true">Tablecloth</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-clojask-tab" data-bs-toggle="pill" data-bs-target="#pills-clojask" type="button" role="tab" aria-controls="pills-clojask" aria-selected="false">Clojask</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-geni-tab" data-bs-toggle="pill" data-bs-target="#pills-geni" type="button" role="tab" aria-controls="pills-geni" aria-selected="false">Geni</button>
    </li>
</ul>
<div class="tab-content" id="pills-tabContent">
<div class="tab-pane fade" id="pills-tmd" role="tabpanel" aria-labelledby="pills-tmd-tab">

**Example 1**

- Select rows with `salary` > 300, `age` < 20

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:salary #(< 300 %)] [:age #(> 20 %)]] [])
    (dtj/print))
```

Sample output:

<pre>
_unnamed [1 3]:

| :age | :name | :salary |
|-----:|-------|--------:|
|   18 |     c |     370 |
</pre>

**Example 2**

- Group rows by `age` with sum of `salary` > 1000
- Show `age` and sum of `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:sum :salary #(< 1000 %)]] [:age :sum :salary] [:group-by :age])
    (dtj/print))
```

Sample output:

<pre>
left-outer-join [1 2]:

| :age | :salary-sum |
|-----:|------------:|
|   25 |      4000.0 |
</pre>

**Example 3**

- Group rows by `age`
- Show `age`, sum of `salary` and standard deviation of `salary`
- Sort by standard deviation of `salary` in descending order

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [] [:age :sum :salary :sd :salary] [:group-by :age :sort-by :sd :salary >])
    (dtj/print))
```

Sample output:

<pre>
left-outer-join [3 3]:

| :age | :salary-sum |    :salary-sd |
|-----:|------------:|--------------:|
|   25 |      4000.0 | 2121.32034356 |
|   18 |       570.0 |  120.20815280 |
|   31 |       200.0 |               |
</pre>

**Example 4**

- Group rows by `age` and `name`
- Show `age`, `name` and sum of `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [] [:age :name :sum :salary] [:group-by :age :name])
    (dtj/print))
```

Sample output:

<pre>
left-outer-join [4 3]:

| :age | :name | :salary-sum |
|-----:|-------|------------:|
|   31 |     a |       200.0 |
|   25 |     b |       500.0 |
|   18 |     c |       570.0 |
|   25 |     d |      3500.0 |
</pre>

**Example 5**

- Select rows with `salary` > 0, `age` < 24

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:salary #(< 0 %)] [:age #(< 24 %)]] [])
    (dtj/print))
```

Sample output:

<pre>
_unnamed [3 3]:

| :age | :name | :salary |
|-----:|-------|--------:|
|   31 |     a |     200 |
|   25 |     b |     500 |
|   25 |     d |    3500 |
</pre>

**Example 6**

- Select rows with sum of `salary` > 0 (after grouping), `age` > 0
- Group rows by `name` and `age`, show `name`, `age`, `salary` (of the first record in the group), sum of `salary` and standard deviation of `salary`
- Sort by `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:sum :salary #(< 0 %)] [:age #(< 0 %)]] [:name :age :salary :sum :salary :sd :salary] [:group-by :name :age :sort-by :salary])
    (dtj/print))
```

Sample output:

<pre>
left-outer-join [4 5]:

| :name | :age | :salary | :salary-sum |  :salary-sd |
|-------|-----:|--------:|------------:|------------:|
|     a |   31 |     200 |       200.0 |             |
|     c |   18 |     200 |       570.0 | 120.2081528 |
|     b |   25 |     500 |       500.0 |             |
|     d |   25 |    3500 |      3500.0 |             |
</pre>

</div>
<div class="tab-pane fade show active" id="pills-tablecloth" role="tabpanel" aria-labelledby="pills-tablecloth-tab">

**Example 1**

- Select rows with `salary` > 300, `age` < 20

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:salary #(< 300 %)] [:age #(> 20 %)]] [])
    (dtj/print))
```

Sample output:

<pre>
_unnamed [1 3]:

| :age | :name | :salary |
|-----:|-------|--------:|
|   18 |     c |     370 |
</pre>

**Example 2**

- Group rows by `age` with sum of `salary` > 1000
- Show `age` and sum of `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:sum :salary #(< 1000 %)]] [:age :sum :salary] [:group-by :age])
    (dtj/print))
```

Sample output:

<pre>
left-outer-join [1 2]:

| :age | :salary-sum |
|-----:|------------:|
|   25 |      4000.0 |
</pre>

**Example 3**

- Group rows by `age`
- Show `age`, sum of `salary` and standard deviation of `salary`
- Sort by standard deviation of `salary` in descending order

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [] [:age :sum :salary :sd :salary] [:group-by :age :sort-by :sd :salary >])
    (dtj/print))
```

Sample output:

<pre>
left-outer-join [3 3]:

| :age | :salary-sum |    :salary-sd |
|-----:|------------:|--------------:|
|   25 |      4000.0 | 2121.32034356 |
|   18 |       570.0 |  120.20815280 |
|   31 |       200.0 |               |
</pre>

**Example 4**

- Group rows by `age` and `name`
- Show `age`, `name` and sum of `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [] [:age :name :sum :salary] [:group-by :age :name])
    (dtj/print))
```

Sample output:

<pre>
left-outer-join [4 3]:

| :age | :name | :salary-sum |
|-----:|-------|------------:|
|   31 |     a |       200.0 |
|   25 |     b |       500.0 |
|   18 |     c |       570.0 |
|   25 |     d |      3500.0 |
</pre>

**Example 5**

- Select rows with `salary` > 0, `age` < 24

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:salary #(< 0 %)] [:age #(< 24 %)]] [])
    (dtj/print))
```

Sample output:

<pre>
_unnamed [3 3]:

| :age | :name | :salary |
|-----:|-------|--------:|
|   31 |     a |     200 |
|   25 |     b |     500 |
|   25 |     d |    3500 |
</pre>

**Example 6**

- Select rows with sum of `salary` > 0 (after grouping), `age` > 0
- Group rows by `name` and `age`, show `name`, `age`, `salary` (of the first record in the group), sum of `salary` and standard deviation of `salary`
- Sort by `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:sum :salary #(< 0 %)] [:age #(< 0 %)]] [:name :age :salary :sum :salary :sd :salary] [:group-by :name :age :sort-by :salary])
    (dtj/print))
```

Sample output:

<pre>
left-outer-join [4 5]:

| :name | :age | :salary | :salary-sum |  :salary-sd |
|-------|-----:|--------:|------------:|------------:|
|     a |   31 |     200 |       200.0 |             |
|     c |   18 |     200 |       570.0 | 120.2081528 |
|     b |   25 |     500 |       500.0 |             |
|     d |   25 |    3500 |      3500.0 |             |
</pre>

</div>
<div class="tab-pane fade" id="pills-clojask" role="tabpanel" aria-labelledby="pills-clojask-tab">
    
For the Clojask backend, users are not encouraged to call `dtj/query` directly. Instead, users are suggested to call the lower-level data operations provided by `datajure.operation-ck`. As for the specific reasons, please refer to the [implementation report](../../posts-output/2023-09-02-clojask-backend/).

**Example 1**

- Create the dataset from a map

```clojure
(-> data
    (dtj/dataset)
    (dtj/print))
```

Sample output:

<pre>
|            age |             name |         salary |
|----------------+------------------+----------------|
| java.lang.Long | java.lang.String | java.lang.Long |
|             31 |                a |            200 |
|             25 |                b |            500 |
|             18 |                c |            200 |
|             18 |                c |            370 |
|             25 |                d |           3500 |
</pre>

**Example 2**

- Create the dataset from a file

```clojure
(-> "input.txt"
    (ck/dataframe)
    (ck/set-parser "salary" #(Long/parseLong %))
    (ck/set-parser "age" #(Long/parseLong %))
    (dtj/print))
```

`input.txt`:

```
age, name, salary
31, a, 200
25, b, 500
18, c, 200
18, c, 370
25, d, 3500
```

Sample output:

<pre>
|            age |             name |         salary |
|----------------+------------------+----------------|
| java.lang.Long | java.lang.String | java.lang.Long |
|             31 |                a |            200 |
|             25 |                b |            500 |
|             18 |                c |            200 |
|             18 |                c |            370 |
|             25 |                d |           3500 |
</pre>

**Example 3**

- Sort the dataset

```clojure
(let [input "input.txt"
      output "output.txt"]
   (op-ck/external-sort input output #(- (Integer/parseInt (.get %1 "salary")) (Integer/parseInt (.get %2 "salary")))))
```

`input.txt`:

```
age,name,salary
31,a,200
25,b,500
18,c,200
18,c,370
25,d,3500
```

`output.txt`:

```
31,a,200
18,c,370
25,b,500
25,d,3500
```

**Example 4**

- Select rows with `salary` > 300, `age` < 20

```clojure
(-> data
    (dtj/dataset)
    (op-ck/where {:where [[:salary #(< 300 %)] [:age #(> 20 %)]]})
    (dtj/print))
```

Sample output:

<pre>
|            age |             name |         salary |
|----------------+------------------+----------------|
| java.lang.Long | java.lang.String | java.lang.Long |
|             18 |                c |            370 |
</pre>

</div>
<div class="tab-pane fade" id="pills-geni" role="tabpanel" aria-labelledby="pills-geni-tab">
    
**Example 1**

- Select rows with `salary` > 300, `age` < 20

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:salary (g/< (g/lit 300) :salary)] [:age (g/> (g/lit 20) :age)]] [])
    (dtj/print))
```

Sample output:

<pre>
+---+----+------+
|age|name|salary|
+---+----+------+
|18 |c   |370   |
+---+----+------+
</pre>

**Example 2**

- Group rows by `age` with sum of `salary` > 1000
- Show `age` and sum of `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:sum :salary (g/< (g/lit 1000) (keyword "sum(salary)"))]] [:age :sum :salary] [:group-by :age])
    (dtj/print))
```

Sample output:

<pre>
+---+-----------+
|age|sum(salary)|
+---+-----------+
|25 |4000       |
+---+-----------+
</pre>

**Example 3**

- Group rows by `age`
- Show `age`, sum of `salary` and standard deviation of `salary`
- Sort by standard deviation of `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [] [:age :sum :salary :sd :salary] [:group-by :age :sort-by :sd :salary])
    (dtj/print))
```

Sample output:

<pre>
+---+-----------+-------------------+
|age|sum(salary)|stddev_samp(salary)|
+---+-----------+-------------------+
|31 |200        |null               |
|18 |570        |120.20815280171308 |
|25 |4000       |2121.3203435596424 |
+---+-----------+-------------------+
</pre>

**Example 4**

- Group rows by `age` and `name`
- Show `age`, `name` and sum of `salary`
- Sort by sum of `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [] [:age :name :sum :salary] [:group-by :age :name :sort-by :sum :salary])
    (dtj/print))
```

Sample output:

<pre>
+---+----+-----------+
|age|name|sum(salary)|
+---+----+-----------+
|31 |a   |200        |
|25 |b   |500        |
|18 |c   |570        |
|25 |d   |3500       |
+---+----+-----------+
</pre>

**Example 5**

- Select rows with `salary` > 0, `age` < 24
- Sort by `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:salary (g/< (g/lit 0) :salary)] [:age (g/< (g/lit 24) :age)]] [] [:sort-by :salary])
    (dtj/print))
```

Sample output:

<pre>
+---+----+------+
|age|name|salary|
+---+----+------+
|31 |a   |200   |
|25 |b   |500   |
|25 |d   |3500  |
+---+----+------+
</pre>

**Example 6**

- Select rows with sum of `salary` > 0 (after grouping), `age` > 0
- Group rows by `name` and `age`, show `name`, `age`, `salary` (of the first record in the group), sum of `salary` and standard deviation of `salary`
- Sort by sum of `salary`

```clojure
(-> data
    (dtj/dataset)
    (dtj/query [[:sum :salary (g/< (g/lit 0) (keyword "sum(salary)"))] [:age (g/< (g/lit 0) :age)]] [:name :age :salary :sum :salary :sd :salary] [:group-by :name :age :sort-by :sum :salary])
    (dtj/print))
```

Sample output:

<pre>
+----+---+-------------+-----------+-------------------+
|name|age|first(salary)|sum(salary)|stddev_samp(salary)|
+----+---+-------------+-----------+-------------------+
|a   |31 |200          |200        |null               |
|b   |25 |500          |500        |null               |
|c   |18 |200          |570        |120.20815280171308 |
|d   |25 |3500         |3500       |null               |
+----+---+-------------+-----------+-------------------+
</pre>

</div>
</div>