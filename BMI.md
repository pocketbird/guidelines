# BMI CSS

Code standards and best practices for BMI UIUX team.

## Naming conventions

### Syntax

##### Currently,

BMI is using a simple, dash-separated, general -> specific naming syntax.  For example, a navigation item might be `nav-primary-nav-item`.  The benefit here is that it's very easy to learn.  It's a no-frills approach.  The negative is that while train-casing (lowercase, dash-separated) is very readable, when you start combining multiple objects or modifiers (like a nav-item for nav-primary) it gets difficult to read.

##### Recommendation:

Use a BEM-style syntax.  BEM stands for Block, Element, Modifier and, using the nav example from above, would look like this `nav-primary__nav-item` where 'nav-primary' is an object and 'nav-item' is a component of that object.  Readable, clear, object-oriented css is *very* important.

##### Possible naming styles:

1. object__component--modifier (double underscores denote components, double dashes denote modifiers)
2. object--component--modifier (double dashes denote separation)
3. object__component__modifier (double underscores denote separation)

### General -> Specific

There is no longer a need for machine-readable semantic naming conventions.  So, choose one that is easiest for developers to read.  Selectors should be named general -> specific in the same way that BEM-style syntax starts with the most general object, then specifies what component of that object, and, where relevant, what modifier for that component.  For example, BEM `nav-primary__nav-item__visited` or `person__hand__ugly` or Simple Train-case: `nav-primary-nav-item-visited` or `person-hand-ugly`.

### Figure out how to think about it

Consistent naming is crucial.  Find a real-world example that makes sense to you... i.e. Lego.  If you are building something out of legos the process is something like this:

1. What are you building?  House.
2. Grab a piece.  Block.
3. What color is the block?  Red.

`house__block--red`
or
`house-block-red`

1. What are you building?  Car.
2. Grab a piece.  Wheel.
3. What size is the wheel?  Small.

`car__wheel--small`
or
`car-wheel-small`

4. What color is the wheel?  Black.

`car__wheel--small--black`
or
`car-wheel-small-black`

## Design-Code Compromise

Follow Harry Roberts's 80:20 rule.  If putting a design into code is causing you to over-nest and write complicated code, take a step back, re-think your process, and see if maybe a small design tweak can fix the problem.  It's important to *all* developers that the code be clean, maintainable, extensible, and small.  It's okay to make design tweaks for the sake of code.  Code is as much a priority to a developer as design/art is to a designer.

## Editor configs, etc.

1. Use comments!!!  Comments slow down your *immediate* work but, speed up all *future* work (including the work of any developer who has to figure out how to read your code)
2. Remove Trailing Whitespace
3. Indent/Tab = TWO (2) spaces, *not four (4)*.
4. Ensure newline at end of file
5. Translate tabs to spaces

## Git Syntax

### Commits

When making commits, speak in the present-tense.  For example, `git commit -m 'Fix nav-primary bug.  Change header background color to red.'.

### Pull Requests (PRs)

If your name isn't Ryan, Desmond, or Colin, submit a Pull Request for your work but don't merge it into master.

### GUI

GitHub have a gui (graphic user interface).

## General Rules/Thoughts

- Don't style element selectors - use classes!  (i.e. `.nav-primary li {}` should be `.nav-primary nav-primary__list-item {}`)  This avoids overriding base styles!  Don't get in a specificity war!  This is also inefficient.
- Don't ration classes - use them liberally.  Did you know that you can use `&` in SCSS to create additional classes that are modified by the root class?  i.e. `.my-head { &__ear--left {} &__ear--right {} }` compiles to `.my-head{} .my-head__ear--left{} .my-head__ear--right{}`
- Don't write classes in HTML that don't exist in CSS (Why would you do that?)
- Don't float.  Instead, use something like `display: inline-block` and `text-align: right`
- Don't use `!important`.  If you do, leave your name and a very clear comment about *why* you used it.
- Care less about your own work and care more appropriately about how it affects everyone else
- Do not design systems around edge cases.  It is expensive and can hold progress back.  Solve edge cases with edge solutions.
- Expect and accomodate change
- The simplest option is usually the best
- Reduce the amount of moving parts
