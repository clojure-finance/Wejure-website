{:title  "Using Reagent for my Web App"
 :layout :post
 :author "Oscar Jay LEW"}

In the last blog, I mentioned that I was deciding between figwheel and shadow-cljs.

After doing some research, I have chosen to use figwheel as my initial development tool for the web app, as it is written on the Clojure website that “figwheel-main has fewer moving parts than shadow-cljs and is therefore very simple to learn and work with”.

([https://ask.clojure.org/index.php/10403/pros-and-cons-figwheel-vs-shadowcljs](https://ask.clojure.org/index.php/10403/pros-and-cons-figwheel-vs-shadowcljs))

Having decided the development tool, I moved on to finding whether there exists a React-like ClojureScript package.

In short, React is a JavaScript (JS) library that allows its users to create HTML components using simple JS code.

Citing cimplilearn, here are some of the advantages of using React:

- Easy creation of dynamic applications: React makes it easier to create dynamic web applications because it requires less coding and offers more functionality, as opposed to JavaScript, where coding often gets complex very quickly. 

- Improved performance: React uses Virtual DOM, thereby creating web applications faster. Virtual DOM compares the components’ previous states and updates only the items in the Real DOM that were changed, instead of updating all of the components again, as conventional web applications do.  

- Reusable components: Components are the building blocks of any React application, and a single app usually consists of multiple components. These components have their logic and controls, and they can be reused throughout the application, which in turn dramatically reduces the application’s development time. 

- Small learning curve: React is easy to learn, as it mostly combines basic HTML and JavaScript concepts with some beneficial additions.

([https://www.simplilearn.com/tutorials/reactjs-tutorial/what-is-reactjs](https://www.simplilearn.com/tutorials/reactjs-tutorial/what-is-reactjs))

It turns out that ClojureScipt has a library, Reagent that acts as an interface to React. And thus, my goals for the next two weeks are to pick up Reagent and to find a ClojureScript library that can help me interact with the Etherium blockchain.

([https://github.com/reagent-project/reagent](https://github.com/reagent-project/reagent))
