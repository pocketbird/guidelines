# HTML Guidelines

## Structure

```
<html>
  <head>
  </head>
  <body>
    <header>
      <span class="logo">
        <img src="my-logo.jpg" alt="logo">
      </span>
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-list-item"><a href=""></a></li>
          <li class="nav-list-item"><a href=""></a></li>
          <li class="nav-list-item"><a href=""></a></li>
        </ul>
      </nav>
    </header>
    <div class="content">

    </div>
  </body>
</html>
```

## Why not just style `nav`, `ul`, and `li` directly?

Browsers apply styles backwards.  When looking at the CSS, the browser starts with the most specific item in your selector and works backward to find its parents.

For example, when the browser sees `.nav ul li {}`, it says, "Ok, I need to find every `li` that is a child of a `ul` that is a child of class `.nav`."  You would think that the browser would find every element with class `.nav`, of which there is probably one, maybe two, and then search those for any that have `ul` as a direct descendant, and then find `li` inside those but, *that is not the case*.  Instead, the browser finds every `li` element on the page, regardless of its parent, and then filters through the parents of all those `li`s to find `ul` and then looks through all of those for parent elements with class `.nav`.

Browsers are fast but, these tiny fragments of seconds add up when your css is not only over-specific but targets native html elements.

Very slightly better but still bad would be `.my-nav .nav-list .nav-list-item {}` because again, the browser reads right-to-left and looks at every `.nav-list-item` and finds parent `.nav-list` and then `.nav`.  Better because you've cut out some of the `li`s that the browser will initially look at but, still not the best solution because the browser has to find parents - not to mention you're getting awfully specific.

Further, it's bad practice to use override styles (except in the case of browser reset styles like Normalize.css).  If the browser has already styled `ul` and `li` and then you write `nav-list` and `nav-list-item` classes that override those styles, the browser is effectively styling those twice - Once when it initially styles `li {}` and once when it applies the styles for `.nav-list-item`.

A better solution would be:
```
.nav {}

.nav-list {}

.nav-list-item {}
```

Or in Sass, you can group it together:
```
// Input
.nav {
  &-list {
    &-item {

    }
  }
}

// Output
.nav {}
.nav-list {}
.nav-list-item {}
```
This way, the browser is looking only for one class in the html for each element to style.
