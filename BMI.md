# BMI Styleguide (note: not visual styleguide)

The goals of this styleguide are:

1. Set the standard for code quality across codebase
2. Promote consistency across codebases
3. Give developers a feeling of familiarity across codebases
4. Increase productivity

## Naming conventions

### BEM Syntax

Use Nicolas Gallagher's BEM-style syntax.  BEM stands for Block, Element, Modifier and looks like this `nav-primary__nav-item`.
Readable, clear, object-oriented css is *very* important.

Read the following before writing BEM classes (Especially the parts about scope):
[csswizardry - MindBEMding](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
[cssguidelin.es - BEM-like Naming](http://cssguidelin.es/#bem-like-naming)

### General -> Specific

There is no longer a need for machine-readable semantic naming conventions.  So, choose one that is easiest for developers to read.  Selectors should be named general -> specific in the same way that BEM-style syntax starts with the most general object, then specifies what component of that object, and, where relevant, what modifier for that component.  For example, BEM `nav-primary__nav-item__visited` or `person__hand__ugly` or Simple Train-case: `nav-primary-nav-item-visited` or `person-hand-ugly`.

### Figure out how to think about it

Consistent naming is crucial.  Find a real-world example that makes sense to you... If you are building a house the process is something like this:

1. What are you building?  House.
2. What part of the house are you working on?  Door.
3. What color is the door?  Red.

`house__door--red`

1. What are you building?  Car.
2. What part of the car are you working on?  Wheel.
3. What size is the wheel?  Small.

`car__wheel--small`

4. What color is the wheel?  Black.

`car__wheel--small--black`

## @extend

If you use @extend, please be aware of what your output code looks like.
Pull up your output code in a window next to your @extend code so you can see exactly what changes you're making.


## Design-Code Compromise

Follow Harry Roberts's 80:20 rule.  If putting a design into code is causing you to over-nest and write complicated code, take a step back, re-think your process, and see if maybe a small design tweak can fix the problem.  It's important to *all* developers that the code be clean, maintainable, extensible, and small.  It's okay to make design tweaks for the sake of code.  Code is as much a priority to a developer as design/art is to a designer.

## Git Syntax

### Commits

When making commits, speak in the present-tense.  For example, `git commit -m 'Fix nav-primary bug.  Change header background color to red.'.

### Pull Requests (PRs)

If your name isn't Ryan, Desmond, or Colin, submit a Pull Request for your work but don't merge it into master.

### GUI

GitHub have a gui (graphic user interface).  Please, don't use the GUI.  If you do, keep in mind that there are some latency/lag issues keeping up with very recent content and that the GUI sometimes doesn't know how to handle what changes are the most recent if multiple people are editing the same piece of code.  In the command line, conflicts like this are handled manually using a merge tool.  The GUI tries to handle these conflicts itself and, in our experience, rarely gets it right and usually results in extra work reverting and manually adding changes to a new commit.

## General Rules/Thoughts

- It's your job as a developer to maintain code.  That's part of what you're getting paid to do.
- DRY out your CSS and markup.  DRY = Don't Repeat Yourself.
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
- CSS Framework != UI Toolkit.  A CSS Framework is a very simple set of rules, guidelines, and a foundation for building out CSS.  A UI Toolkit is a pre-styled collection of UI elements (i.e. Bootstrap).

## Editor configs, etc.

1. Use comments!!!  Comments slow down your *immediate* work but, speed up all *future* work (including the work of any developer who has to figure out how to read your code)
2. Remove Trailing Whitespace
3. Indent/Tab = TWO (2) spaces, *not four (4)*.
4. Ensure newline at end of file
5. Translate tabs to spaces
