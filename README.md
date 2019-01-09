# jquery_from_scratch
A demo of how a library similar to jQuery might be implemented in plain JavaScript.

# Demo

Clone the repo
Open the HTML file.
Click the "li" elements. You'll notice their background turns blue.

# Explanation

jQuery is a handy tool wrapper for quickly accessing DOM elements and setting their properties. This library aims to demo a little about how such a library might be constructed.

First, two classes are declared: `DOMobj` and `DOM_OBJECT_MANAGER`
DOMobj is a wrapper for a single DOM element. (`DOMobj.elem` is the element.)
DOMobj implements `.click`, which accepts a function to bind to the element.

DOM_OBJECT_MANAGER is an interface for many DOMobjs. It implements every method for DOMobj -- in this case, just "click" -- and several "query" methods:

```
getTag
getClass
getID
```

These correspond to the document.getElement(s)By____ methods. Each one adds a single DOMobj to a list, DOM_OBJECT_MANAGER.objects, and then returns the manager for method chaining purposes. The DOMobj methods are re-implemented as loops that simply call the DOMobj method on each DOMobj in the .objects list. This allows us to avoid lots of nested code later on by tucking away our for loops in the manager class.

Finally, a function named $DOM is created that returns a DOM_OBJECT_MANAGER and takes any number of strings as arguments. Strings can be regular strings, start with "." to indicate a class, or start with "#" to indicate an ID. (Composite strings aren't supported). It returns a manager with the requested elements added to the .objects list. (You could add this logic to the manager's constructer if you like instead.)

The end result is that you can now call `$DOM('li', 'a', 'body', '.my_class', and '#my_id').click(my_click_function)` to add a click event listener function to all of those elements at once. This would normally be about a dozen lines of regular JavaScript, and the code becomes cleaner and easier to read as a result.

# Notes

If you'd like to play with this, I recommend studying ES6 classes, then retyping out the javascript yourself after cloning the repo. Then, try to add other event listeners using ```.click``` as a template. Maybe try to add a generic event listener adder using document.addeventlistener. Another project would be to account for duplicate elements in the $DOM_OBJECT_MANAGER class. This library is just for demonstration purposes, so I leave those activites for the reader.
