# ITCSS

Inverted Triangle CSS

1. A sane, scalable, managed architecture
2. A school-of-thought, not a library
3. A meta framework; a framework for frameworks
4. Incredibly simple

## Things that CSS gets wrong

### CSS' fault

1. Cascade and inheritance
2. Very loose
3. Highly dependent on source order
4. Not very expressive
5. Lots of gotchas
6. Specificity

### Our fault

1. Lack of documentation
2. Lack of structure, quality assurance
3. Mixture of abilities
4. Lack of knowledge (about CSS or the project itself)
5. Different styles, preferences, ways of working
6. Not looking to see/being aware of what exists already
7. Adding new styles to the end of stylesheets (creates complexity)

## How to write right

1. Write CSS in specificity order (not mirroring the web page)
  - Settings (pre-processor only, things like variables)
  - Tools (pre-processor only, default mixins, globally availably things)
  - Generic (grount zero styles, normalize, reset)
  - Base (unclassed html elements, h1, blockquote)
  - Objects (cosmetic-free design patterns, don't look like anything but sort structural things out)
  - Components (Designed components, chunks of UI, carousels, flyout menu)
  - Trumps (helper classes, overrides, utilities)
2. Rulesets should only ever add to and inherit from previous ones
3. Order stylesheets from far-reaching to very localised
4. Add layers as needed, but only in the right place
5. Keep complexity to HTML as much as possible.  HTML with lots of classes
6. Follow the inception rule: Never go more than three levels deep in your SCSS.

### File Naming:

_base.links.scss
_base.page.scss
_base.quotes.scss
_base.type.scss
_components.ads.scss
_components.bands.scss
_components.boxes.scss
_components.page-head.scss
_components.page-foot.scss
_objects.wrappers.scss
_settings.colors.scss
_settings.global.scss
_tools.aliases.scss
_tools.mixins.scss
_trumps.show-hide.scss
_trumps.widths-responsive.scss

### Typography:

1. Piggyback HTML elements
2. Body copy is the default
3. Headings and smallprint deviate
4. Most UI elements fall into one of the above

### Mixins:

1. Use them when you wouldn't want the class in HTML
2. Use the for small numbers of property-value pairs

## Notes

CSS is one giant dependency tree.  We need a way to manage this dependency at a very low level.
Undoing CSS: Writing more CSS in order to undo other CSS - very inefficient and bloated.
Specificity Wars: It doesn't matter how well crafted your code is, specificity can undo everything.
Open-close software design principle - Things should be open to extension but, closed to modification
Keep complexity in HTML as much as possible.  Markup is MUCH easier to refactor than CSS.  So, use *more* classes in HTML and keep the CSS simpler.
80:20 Rule: If we can achieve 80% of the design with 20% of the code, we should.
It's okay to tell a designer, "No" but, don't say it every step of the way.  Give him complete freedom to create the best solution, and then partner with him to work out the best production solution.  *Compromise is important to keeping a code base clean and extensible.*  Don't write bad code just to keep the design team happy.
Have scss open in one pane and output css in another so you can see the result of what you're writing in scss.
What is Gzip???
Floats are the table-based layout of our time.  They were designed for wrapping text around an image *not* basic layout.
A css framework should provide the basis for other projects (it should be relatively small).  It is different than a ui framework.

## BMI

### Naming Syntax

BEM, OOCSS, Suit...

I still think that BEM-style syntax is the best way to proceed if we're starting a project from scratch.  If we're concerned about changing the naming structure of things and forcing the portal devs to go back and refactor a whole bunch of stuff, then we need to stick with our current syntax (general -> specific, dash-separated).  So, is the only purpose of V2 to update UI/design and create a more consistent look?  If that's the case, is our goal to go through everything we've created and re-style it so that it matches our new design (even if we're giving existing components duplicate styles)?  OR is our purpose for V2 greater?  Is it to refresh the ui/design *and* the code?  If the portal devs are going to just keep what's been done, stash the files we've given them, and let it be OR if they are going to rewrite the pages in our new structure/classes/syntax anyway, then we have the freedom to name classes however we want.  This is our opportunity to create a naming structure that fits out team AND the portal team.  We're eliminating/updating a lot of class names already so, why not update everything at the same time?

### Design-Code Compromise

We should follow Harry Roberts's 80:20 rule.  If putting a design into code is causing you to over-nest and write complicated code, take a step back, re-think your process, and see if maybe a small design tweak can fix the problem.  It's important to *all* developers that the code be clean, maintainable, extensible, and small.  It's okay to make design tweaks for the sake of code, which should be given equal priority to design.

### Rules

1. Don't style element selectors - use classes!  (i.e. `.nav-primary li {}` should be `.nav-primary nav-primary__list-item {}`)  This avoids overriding base styles!  Don't get in a specificity war!  This is also inefficient.
2. Don't float.  Instead, use something like `display: inline-block` and `text-align: right`
3. General -> Specific.  Always.  The partials in `screen.scss` are ordered on purpose, not at random.
4. Don't use `!important`.  If you do, leave your name and a very clear comment about *why* you used it.
5. Don't ration classes - use them liberally.  Did you know that you can use `&` in SCSS to create additional classes that are modified by the root class?  i.e. `.my-head { &__ear--left {} &__ear--right {} }` compiles to `.my-head{} .my-head__ear--left{} .my-head__ear--right{}`
6. Care less about your own work and care more appropriately about how it affects everyone else
7. Do not design systems around edge cases.  It is expensive and can hold progress back.  Solve edge cases with edge solutions.
8. Expect and accomodate change
9. The simplest option is usually the best
10. Reduce the amount of moving parts
11. Don't write classes in HTML that don't exist in CSS (Why would you do that?)
