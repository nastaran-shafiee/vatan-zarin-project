# Convention
Components directory structure, naming, default style and css modules convention

## Components

### React component files and directory
All components should be placed on `compontns` directory. A component should be
defined in a `index.js` file into a directory named after the component name with
PascalCase naming. The name of a component should only answer what it is/does and
shouldn't answer how it is. For example, we can have a component named Card or
ErrorCard, but we can't have a component named RedCard or BigCard.

For child components we follow the exact same structure but the component's
directory should
be placed into the parent component's directory.

Example:

```
components
--Layout
----Header
----index.js
----header.module.scss
------ChildComponents
--------index.js
--------childComponent.module.scss
--ShoppingCart
----...
```
### Styles

The styles of a component should be named after the component's directory with
camelCase naming. As React defines every style module file should be followed
by `.module.css` or `.module.scss` for SCSS files.

The main style of a component should be imported with the name `styles` into main
component. For example if the component name is `Header` then, the import statement
of the component should be like this:

`import styles from "./header.module.scss"`

## CSS Classes

CSS class names are similar to BEM. But because we need to import styles as object
into js files, We need to apply some modifications in BEM. BEM stands for Block,
Element and modification.

### Block
Because a block is an independent part og the app that
could be used everywhere, We can only consider react components as block. The
css class name for a block should be the name of the component in PascalCase. So
the class name will be as same as component's directory name. All other block naming
follow BEM's structure.

### Element
An element is a composite part of a block that can't be used separately from it. For
example the header of a component. Also, the name of the component should only answer
what it is/does and shouldn't answer how it is. the class name of a block should
be camelCase. If we are using scss in a component as module, then there is no need
to put the all parts of the hierarchical names for blocks and
elements. Otherwise, in case of writing global css we should put the complete
hierarchical class names before the elements name. In this case element's name should
be separated from block name or the parent element name with two underscore.

### Modifier
A modifier is an entity that defines the appearance, state, or behavior of a
block or element. for example the status, size or color of an element or block. The
class name if a modifier should be the name of block or element plus 3 underscores
and the name of the modifier in snake_case. If we are using scss in a component as
a module, then there is no need to put the all parts of the hierarchical names
for blocks and elements. Otherwise, in case of writing global css we should put
the complete hierarchical class names before the modifier.


### Full structure example

