# SeeEssEss

Code styleguide and standards of practice.

## Contents

- [Introduction](#introduction)
- [Syntax and Formatting](#syntax-and-formatting)
- [Commenting](#commenting)
- [Naming Conventions](#naming-conventions)
- [CSS Selectors](#css-selectors)
- [Specificity](#specificity)
- [OOCSS](#oocss)
- [Other](#other)
- [Credits](#credits)

## Introduction

In working on large, long-running projects, with dozens of developers of differing specialities and abilities, it is important that we all work in a unified way in order to:

- Keep stylesheets maintainable;
- Keep code transparent, sane, and readable;
- Keep stylesheets scalable.

With that in mind, a code styleguide should:

- Set the standard for code quality across codebase;
- Promote consistency across codebases;
- Give developers a feeling of familiarity across codebases;
- Increase productivity.

## Syntax and Formatting

Code should look and feel familiar to all team members.  Code that _looks_ clean _feels_ clean.  At a very high-level, we want

- Two (2) space indents, no tabs;
- 80 character wide columns;
- Multi-line CSS;
- Newline at end of file;
- No trailing whitespace;
- Meaningful use of whitespace.

### Anatomy of a Ruleset

```
[selector] {
  [property]: [value];
  [<--declaration--->]
}
```

Property: value declarations should be:

- In alphabetical order
- @extends at the top
- @includes at the bottom
- nested pseudo-selectors after @includes
- nested selectors after pseudo-selectors

```
.luigi {
  @extend %mario;
  border: $base-border;
  color: $green;
  text-transform: uppercase;
  @include background-opacity;

  &:first-child {
    color: $primary;
  }

  &.active {
    border-bottom: $active-border;
  }

  .shell--red {
    @extend %shell
  }
}
```

### Multi-line CSS

CSS should be written across multiple lines, except in very specific circumstances. Exceptions to this rule should be fairly apparent, such as similar rulesets that only carry one declaration each, for example:

```
.icon {
  display: inline-block;
  width:  em(16);
  height: em(16);
  background-image: url(/img/sprite.svg);
}

.icon--home     { background-position:   0       0    ; }
.icon--person   { background-position: em(-16)   0    ; }
.icon--files    { background-position:   0     em(-16); }
.icon--settings { background-position: em(-16) em(-16); }
```

### Alignment

Attempt to align common and related identical strings in declarations, for example:

```
.foo {
  -webkit-border-radius: 3px;
     -moz-border-radius: 3px;
          border-radius: 3px;
}

.bar {
  position: absolute;
  top:    0;
  right:  0;
  bottom: 0;
  left:   0;
  margin-right: em(-10);
  margin-left:  em(-10);
  padding-right: em(10);
  padding-left:  em(10);
}
```

## Commenting

The cognitive overhead of working with CSS is huge. With so much to be aware of, and so many project-specific nuances to remember, the worst situation most developers find themselves in is being the-person-who-didn’t-write-this-code. Remembering your own classes, rules, objects, and helpers is manageable to an extent, but anyone inheriting them barely stands a chance.

### CSS

As a rule, you should comment anything that isn’t immediately obvious from the code alone. That is to say, there is no need to tell someone that `color: red;` will make something red, but if you’re using `overflow: hidden;` to clear floats, as opposed to clipping an element’s overflow, this is probably something worth documenting.

- Begin comments with two (2) slashes `// `and a space;
- Start a new line after 80 characters;
- Selector comments go above selectors;
- Declaration comments should be brief and go beside declarations.

```
.btn--is-icon {
  border: $base-border;
  color: $default; // A brief comment
}

// A button that has an icon inside, to the left.  This comment extends to a
// new line because it exceeds 80 characters in length.
.btn--with-icon {
  border: $base-border;
  color: $default; // A brief comment
  text-transform: uppercase;
}
```

### Sass

When commenting Sass, use [SassDoc](http://sassdoc.com/) comments.

SassDoc is "a documentation system to build pretty and powerful docs in the blink of an eye."  SassDoc tracks Sass, not CSS.

- SassDoc comments begin with three (3) slashes `///`;
- Begin and end comment blocks with empty comment lines
- Must touch the top of the Sass they comment;
- [Annotations](http://sassdoc.com/annotations/) begin with `@`;
- Multi-word groups get hyphen-delimited names;
- At a minimum, every SassDoc comment should have:
  - Description
  - Group
  - Author
- The following should always be commented:
  - Placeholders
  - Mixins
  - Functions
- Variables should be commented as necesary.

Here's an example:

```
///
/// Transparent background with solid content.
///
/// @group base-ui
///
/// @author Colin Carter
///
@mixin background-opacity($color, $opacity) {
  background-color: $color;
  background-color: rgba($color, $opacity);
}
```

## Naming Conventions

A good naming convention will tell you and your team:

- What type of thing a class does;
- Where a class can be used;
- What (else) a class might be related to.

The naming convention for OWR is very simple: hyphen (-) delimited strings, with BEM-like naming for more complex pieces of code.

### Hyphen Delimited

All strings in classes are delimited with a hyphen (-), like so:

```
.page-head {}

.sub-content {}
```

### BEM-like Naming

For larger, more interrelated pieces of UI that require a number of classes, we use a BEM-like naming convention.

BEM, meaning Block, Element, Modifier, is a front-end methodology coined by developers working at Yandex.  Whilst BEM is a complete methodology, here we are only concerned with its naming convention.  Further, the naming convention here only is BEM-like; the principles are exactly the same, but the actual syntax differs slightly.

BEM splits components’ classes into three groups:

- Block: The sole root of the component.
- Element: A component part of the Block.
- Modifier: A variant or extension of the Block.

To take an analogy (note, not an example):

```
.person {}
.person__head {}
.person--tall {}
```

Elements are delimited with two (2) underscores (__), and Modifiers are delimited by two (2) hyphens (--).

Here we can see that `.person {}` is the Block; it is the sole root of a discrete entity.  `.person__head {}` is an Element; it is a smaller part of the `.person {}` Block.  Finally, `.person--tall {}` is a Modifier; it is a specific variant of the `.person {}` Block.

#### Starting Context

Your Block context starts at the most logical, self-contained, discrete location.  To continue with our person-based analogy, we’d not have a class like `.room__person {}`, as the room is another, much higher context.  We’d probably have separate Blocks, like so:

```
.room {}

.room__door {}

.room--kitchen {}

.person {}

.person__head {}
```

If we did want to denote a `.person {}` inside a `.room {}`, it is more correct to use a selector like `.room .person {}` which bridges two Blocks than it is to increase the scope of existing Blocks and Elements.

A more realistic example of properly scoped blocks might look something like this, where each chunk of code represents its own Block:

```
.page {}

.content {}

.sub-content {}

.footer {}

.footer__copyright {}
```

Incorrect notation for this would be:

```
.page {}

.page__content {}

.page__sub-content {}

.page__footer {}

.page__copyright {}
```

It is important to know when BEM scope starts and stops.  As a rule, BEM applies to self-contained, discrete parts of the UI.

#### More Layers

If we were to add another Element — called, let’s say, `.person__eye {}` — to this `.person {}` component, we would not need to step through every layer of the DOM.  That is to say, the correct notation would be `.person__eye {}`, and not `.person__head__eye {}`.  Your classes do not reflect the full paper-trail of the DOM.

#### Modifying Elements

You can have variants of Elements, and these can be denoted in a number of ways depending on how and why they are being modified.  Carrying on with our person example, a blue eye might look like this:

```
.person__eye--blue {}
```

Here we can see we’re directly modifying the eye Element.

Things can get more complex, however.  Please excuse the crude analogy, and let’s imagine we have a face Element that is handsome.  The person themselves isn’t that handsome, so we modify the face Element directly — a handsome face on a regular person:

```
.person__face--handsome {}
```

But what if that person is handsome, and we want to style their face because of that fact?  A regular face on a handsome person:

```
.person--handsome .person__face {}
```

Here is one of a few occasions where we’d use a descendant selector to modify an Element based on a Modifier on the Block.

We would likely write this like so:

```
.person {}

.person__face {

    .person--handsome & {}

}

.person--handsome {}
```

Note that we do not nest a new instance of `.person__face {}` inside of `.person--handsome {}`; instead, we make use of Sass’ parent selectors to prepend `.person--handsome` onto the existing `.person__face {}` selector.  This means that all of our `.person__face {}`-related rules exist in once place, and aren’t spread throughout the file.  This is general good practice when dealing with nested code: keep all of your context (e.g. all `.person__face {}` code) encapsulated in one location.

### JavaScript Hooks

As a rule, it is unwise to bind your CSS and your JS onto the same class in your HTML.  This is because doing so means you can’t have (or remove) one without (removing) the other.  It is much cleaner, much more transparent, and much more maintainable to bind your JS onto specific classes.

I have known occasions before when trying to refactor some CSS has unwittingly removed JS functionality because the two were tied to each other — it was impossible to have one without the other.

Typically, these are classes that are prepended with js-, for example:

```
<input type="submit" class="btn  js-btn" value="Follow" />
```

This means that we can have an element elsewhere which can carry with style of `.btn {}`, but without the behaviour of `.js-btn`.

## CSS Selectors

Perhaps somewhat surprisingly, one of the most fundamental, critical aspects of writing maintainable and scalable CSS is selectors.  Their specificity, their portability, and their reusability all have a direct impact on the mileage we will get out of our CSS, and the headaches it might bring us.

### Selector Intent

It is important when writing CSS that we scope our selectors correctly, and that we’re selecting the right things for the right reasons.  Selector Intent is the process of deciding and defining what you want to style and how you will go about selecting it.  For example, if you are wanting to style your website’s main navigation menu, a selector like this would be incredibly unwise:

```
header ul {}
```

This selector’s intent is to style any `ul` inside any `header` element, whereas our intent was to style the site’s main navigation.  This is poor Selector Intent: you can have any number of header elements on a page, and they in turn can house any number of uls, so a selector like this runs the risk of applying very specific styling to a very wide number of elements.  This will result in having to write more CSS to undo the greedy nature of such a selector.

A better approach would be a selector like:

```
.site-nav {}
```

An unambiguous, explicit selector with good Selector Intent.  We are explicitly selecting the right thing for exactly the right reason.

Writing rules that are far too greedy — and that apply very specific treatments via very far reaching selectors — causes unexpected side effects and leads to very tangled stylesheets, with selectors overstepping their intentions and impacting and interfering with otherwise unrelated rulesets.

CSS cannot be encapsulated, it is inherently leaky, but we can mitigate some of these effects by not writing such globally-operating selectors: **your selectors should be as explicit and well reasoned as your reason for wanting to select something.**

### Location Independence

Given the ever-changing nature of most UI projects, and the move to more component-based architectures, it is in our interests not to style things based on where they are, but on what they are.  That is to say, our components’ styling should not be reliant upon where we place them—they should remain entirely location independent.

Let’s take an example of a call-to-action button that we have chosen to style via the following selector:

```
.promo a {}
```

Not only does this have poor Selector Intent — it will greedily style any and every link inside of a `.promo` to look like a button — it is also pretty wasteful as a result of being so locationally dependent: we can’t reuse that button with its correct styling outside of `.promo` because it is explicitly tied to that location.  A far better selector would have been:

```
.btn {}
```

This single class can be reused anywhere outside of `.promo` and will always carry its correct styling.  As a result of a better selector, this piece of UI is more portable, more recyclable, doesn’t have any dependencies, and has much better Selector Intent.  **A component shouldn’t have to live in a certain place to look a certain way.**

### Portability

Reducing, or, ideally, removing, location dependence means that we can move components around our markup more freely, but how about improving our ability to move classes around components?  On a much lower level, there are changes we can make to our selectors that make the selectors themselves—as opposed to the components they create—more portable.  Take the following example:

```
input.btn {}
```

This is a qualified selector; the leading input ties this ruleset to only being able to work on input elements.  By omitting this qualification, we allow ourselves to reuse the `.btn` class on any element we choose, like an `a`, for example, or a `button`.

Qualified selectors do not lend themselves well to being reused, and every selector we write should be authored with reuse in mind.

Of course, there are times when you may want to legitimately qualify a selector — you might need to apply some very specific styling to a particular element when it carries a certain class, for example:

```
// Embolden and colour any element with a class of `.error`.
.error {
  color: red;
  font-weight: bold;
}

// If the element is a `div`, also give it some box-like styling.
div.error {
  padding: em(10);
  border: $base-border;
}
```

This is one example where a qualified selector might be justifiable, but I would still recommend an approach more like:

```
// Text-level errors.
.error-text {
  color: red;
  font-weight: bold;
}

// Elements that contain errors.
.error-box {
    padding: 10px;
    border: 1px solid;
}
```

This means that we can apply `.error-box` to any element, and not just a div — it is more reusable than a qualified selector.

## Specificity

No matter how well considered your naming, regardless of how perfect your source order and cascade are managed, and how well you’ve scoped your rulesets, just one overly-specific selector can undo everything.  It is a gigantic curveball, and undermines CSS’ very nature of the cascade, inheritance, and source order.

### Nesting

- If a selector will work without it being nested then do not nest it;
- Before you nest a selector, consider [location dependency](#location-dependency);
- If you nest a selector, check your output code.

### !important

`!important` does have a place in CSS projects, but only if used sparingly and proactively.

Proactive use of `!important` is when it is used before you’ve encountered any specificity problems; when it is used as a guarantee rather than as a fix.  For example:

```
.one-half {
    width: 50% !important;
}

.hidden {
    display: none !important;
}
```

These two helper, or utility, classes are very specific in their intentions: you would only use them if you wanted something to be rendered at 50% width or not rendered at all.  If you didn’t want this behaviour, you would not use these classes, therefore whenever you do use them you will definitely want them to win.

Here we proactively apply `!important` to ensure that these styles always win. This is correct use of `!important` to guarantee that these trumps always work, and don’t accidentally get overridden by something else more specific.

## OOCSS

OOCSS deals with the separation of UIs into structure and skin: breaking UI components into their underlying structural forms, and layering their cosmetic forms on separately.  This means that we can recycle common and recurring design patterns very cheaply without having to necessarily recycle their specific implementation details at the same time.  OOCSS promotes reuse of code, which makes us quicker, as well as keeping the size of our codebase down.

Structural aspects can be thought of like skeletons; common, recurring frames that provide design-free constructs known as objects and abstractions.  Objects and abstractions are simple design patterns that are devoid of any cosmetics; we abstract out the shared structural traits from a series of components into a generic object.

Skin is a layer that we (optionally) add to our structure in order to give objects and abstractions a specific look-and-feel.  Let’s look at an example:

```
// A simple, design-free button object. Extend this object with a `.btn--*` skin
// class.
.btn {
  display: inline-block;
  padding: 1em 2em;
  vertical-align: middle;
}

// Positive buttons’ skin. Extends `.btn`.
.btn--positive {
  background-color: green;
  color: white;
}

// Negative buttons’ skin. Extends `.btn`.
.btn--negative {
  background-color: red;
  color: white;
}
```

Above, we can see how the `.btn {}` class simply provides structural styling to an element, and doesn’t concern itself with any cosmetics. We supplement the `.btn {}` object with a second class, such as `.btn--negative {}` in order to give that DOM node specific cosmetics:

```
<button class="btn  btn--negative">Delete</button>
```

Favour the multiple-class approach over using something like `@extend`: using multiple classes in your markup — as opposed to wrapping the classes up into one using a preprocessor - 

- Gives you a better paper-trail in your markup, and allows you to see quickly and explicitly which classes are acting on a piece of HTML;
- Allows for greater composition in that classes are not tightly bound to other styles in your CSS.

Whenever you are building a UI component, try and see if you can break it into two parts: one for structural styles (paddings, layout, etc.) and another for skin (colors, typefaces, etc.).

## Other

### z-index

`z-index` values should range from 0 to 9.  The fixed sidebar-nav is `z-index: 9` and the body is `z-index: 1`.

## Credits

- [Harry Roberts](http://csswizardry.com): I stole most or all of this from [CSS Guidelines](http://cssguidelin.es).
- [Nicole Sullivan](http://www.stubbornella.org/content/): Pioneer of OOCSS and inventor of the `media` object.  

