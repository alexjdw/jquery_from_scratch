//DojoQuery v0.01
class DOMobj {
    constructor(domelement) {
        this.elem = domelement;
    }

    addEvent(event, func) {
        this.elem.addEventListener(event, func)
    }
    click(func) {
        this.elem.onclick = func;
    }
    setStyle(style) {
        this.elem.style = style;
    }
}


class DOM_QUERY_MANAGER {
    constructor() {
        this.objects = [];
    }
    getID(id) {
        var d = new DOMobj(document.getElementByID(id));
        if (d) {
            this.objects.push(d);
        }
        return this;
    }
    getClass(cls) {
        let c = document.getElementsByClassName(cls);
        for (var idx = 0; idx < t.length; idx++) {
            this.objects.push(new DOMobj(c[idx]));
        }
        return this;
    }
    getTag(tag) {
        let t = document.getElementsByTagName(tag);
        console.log(t);
        for (var idx = 0; idx < t.length; idx++) {
            this.objects.push(new DOMobj(t[idx]));
        }
        return this;
    }
    addEvent(func) {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].addEvent(func);
        }
        return this;
    }
    click(func) {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].click(func);
        }
        return this;
    }
    setStyle(func) {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].setStyle(func);
        }
        return this;
    }
}

var $DOM = function() {
    // In: Any number of strings as tagname, #id, .class
    // Please do not mix, ex. tagname#id or #id.class, this ain't real jquery
    // Out: $DOM_QUERY_MANAGER object
    var d = new DOM_QUERY_MANAGER();
    var duplicatechecker = {}; //Hashed object to check for duplicate strings
    if (!arguments[0]) {
        return d.getTag('html');
    }
    for (arg in arguments) {
        let a = arguments[arg];
        if (typeof a === String) {
            console.log(typeof a);
            throw "TypeError: Expected a string at argument " + arg;
        }
        if (duplicatechecker[a] === undefined) {
            duplicatechecker[a] = 0;
            if (a === '') {
                // Default case: select the HTML tag.
                d.getTag('html');
            }
            else if (a.startsWith('.')) {
                a = a.slice(1, a.length-1);
                d.getClass(a)
            }
            else if (a.startsWith('#')) {
                a = a.slice(1, a.length-1);
                d.getItem(a);
            }
            else {
                d.getTag(a);
            }
        }
    }
    return d;
}

li = $DOM('li');
li.click(function(event) {
    this.style="background-color: blue;"
});