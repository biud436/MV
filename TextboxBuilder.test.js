function createVirutalElement(tagName) {
    return {
        tagName: tagName,
        attributes: {},
        className: "",
        children: [],
        setAttribute(name, value) {
            this.attributes[name] = value;
        },
        appendChild(child) {
            this.children.push(child);
        },
    };
}

const body = createVirutalElement("body");

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
            const elem = createVirutalElement(root.tagName);
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

        console.log(JSON.stringify(body));
    }

    prepareElement() {
        return {
            root: {
                class: "inputDialogContainer",
                tagName: "table",
                children: [
                    {
                        tagName: "tr",
                        children: [
                            {
                                tagName: "td",
                                class: "col",
                                children: [
                                    {
                                        tagName: "input",
                                        type: "text",
                                        id: "RS.InputDialog.Params.szTextBoxId",
                                        class: "inputDialog",
                                        placeholder:
                                            "RS.InputDialog.Params.localText",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        tagName: "tr",
                        class: "row",
                        attributes: {
                            valign: "bottom",
                        },
                        children: [
                            {
                                tagName: "td",
                                class: "col",
                                attributes: {
                                    align: "right",
                                },
                                children: [
                                    {
                                        tagName: "input",
                                        type: "button",
                                        class: "defaultButton",
                                        id: "inputDialog-OkBtn",
                                        value: "RS.InputDialog.Params.okButtonName",
                                    },
                                    {
                                        tagName: "input",
                                        type: "button",
                                        class: "defaultButton",
                                        id: "inputDialog-CancelBtn",
                                        value: "RS.InputDialog.Params.cancelButtonName",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        };
    }
}

const textBoxBuilder = new TextBoxBuilder();
textBoxBuilder.render();
