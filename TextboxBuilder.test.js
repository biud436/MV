const utils = {
    createVirutalElement(tagName) {
        if (typeof document === "undefined") {
            const jsdom = require("jsdom").JSDOM;
            const doc = new jsdom("<html><body></body></html>");
            const document = doc.window.document;

            return document.createElement(tagName);
        } else {
            if (tagName === "body") return document.body;
            return document.createElement(tagName);
        }
    },

    toCamelCase(name) {
        const snake = name || "";

        let nodes = snake.split(/[\s\-]/);
        let nodesTail = nodes.slice(1);

        const camel = nodes[0].concat(
            nodesTail.map((i) => {
                return i[0].toUpperCase() + i.slice(1);
            })
        );
        return camel;
    },

    getClassName(name) {
        const str = toCamelCase(name);
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    },
};

/**
 * @type {HTMLElement}
 */
const body = utils.createVirutalElement("body");

/**
 * @class TextBoxBuilder
 * @description
 * This class is used to create a text box.
 */
class TextBoxBuilder {
    render() {
        const elements = this.prepareElement();
        const rootElement = elements.root;
        let parentNode = null;

        const virtualRender = (root) => {
            if (!root.tagName) {
                return;
            }

            // create an element.
            const elem = utils.createVirutalElement(root.tagName);
            if (!parentNode) {
                // parentNode = document.body;
                parentNode = body;
            }
            parentNode.appendChild(elem);

            // set attributes.
            if (root.attributes) {
                for (const attr in root.attributes) {
                    elem.setAttribute(attr, root.attributes[attr]);
                }
            }

            // set class.
            if (root.class) {
                elem.className = root.class;
            }

            // set type.
            if (root.type) {
                elem.setAttribute("type", root.type);
            }

            // set id.
            if (root.id) {
                elem.setAttribute("id", root.id);
            }

            // set placeholder.
            if (root.placeholder) {
                elem.setAttribute("placeholder", root.placeholder);
            }

            // set value.
            if (root.value) {
                elem.setAttribute("value", root.value);
            }

            // set style.
            if (root.style) {
                // change snake to camel.
                const propertyName = utils.toCamelCase(style);

                for (const style in root.style) {
                    elem.style[propertyName] = root.style[style];
                }

                // cannot control media query.
            }

            // set injected style.
            if (root.injectedStyle) {
                elem.setAttribute("style", root.injectedStyle);
            }

            // set children.
            if (root.children) {
                // parent node를 이것으로 설정
                parentNode = elem;

                root.children.forEach((child) => {
                    virtualRender(child);
                });
            }
        };

        virtualRender(rootElement);
    }
}

const textBoxBuilder = new TextBoxBuilder();
textBoxBuilder.render();
