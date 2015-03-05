function HtmlElementCreator() {
    this.self = this;

    this.append = function(properties)
    {
        var element = this.createNodeElement(properties);
        var selector = this.selectorStrategy(properties);
        selector.appendChild(element);

        var childrenStructure = properties.structure._children;
        if (this.hasChildren(childrenStructure)) {
            var childrenElement = this.createChildNodeElement(
                element,
                childrenStructure
            );
        }
    }

    this.selectorStrategy = function(properties)
    {
        var selector;

        if (properties.tag !== undefined) {
            selector = document[properties.tag]

        } else if (properties.tag) {
            selector = document.getElementById(properties.id);

        } else if (properties.class) {
            selector = document.getElementsByClassName(properties.class);
        }

        return selector;
    }

    /**
     * Cria o elemento base da estrutura.
     * @access private
     * @param Object properties
     * @return Object element
     */
    this.createNodeElement = function(properties)
    {
        var element = document.createElement(properties.structure.element);
        element     = this.declareHtmlAttributes(element, properties.structure);

        return element
    }

    /**
     * Cria os child elements da estrutura de acordo
     * com o elemento base.
     * @access private
     * @method recursive
     * @param Object parentNode
     * @param Object nodeStructure
     * @return void
     */
    this.createChildNodeElement = function(parentNode, nodeStructure)
    {
        var element = document.createElement(nodeStructure.element);
        element = this.declareHtmlAttributes(element, nodeStructure);
        parentNode.appendChild(element);

        if (this.hasSibling(nodeStructure)) {
            var siblingElement = this.createSiblingNodeElement(
                parentNode,
                nodeStructure._sibling
            );
        }

        if (this.hasChildren(nodeStructure)) {
            var childrenElement = this.createChildNodeElement(
                element,
                nodeStructure._children
            );
        }
    }

    this.createSiblingNodeElement = function(parentNode, nodeStructure)
    {
        var element = document.createElement(nodeStructure.element);
        element = this.declareHtmlAttributes(element, nodeStructure);

        if (this.hasText(nodeStructure)) {
            var textNode = document.createTextNode(nodeStructure.text);
            element.appendChild(textNode);
        }
        parentNode.appendChild(element);
    }

     /**
      * Retorna somente atributos html que constam
      * na estrutura
      * @access private
      * @param Object nodeStructure
      * @return Object keys
      */
    this.getHtmlNodeAttributes = function(nodeStructure)
    {
        var keys = Object.keys(nodeStructure);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === "_children" || keys[i] === "element") {
                delete keys[i];
            }
        }
        return keys;
    }

    /**
     * Declara os atributos do elemento html
     * de acordo com a estrutura definida.
     * @param Object element
     * @param Object nodeStructure
     * return Object element
     */
    this.declareHtmlAttributes = function(element, nodeStructure)
    {
        var attributes = this.getHtmlNodeAttributes(nodeStructure);
        for (var i in attributes) {
            var attribute = attributes[i];
            element.setAttribute(attribute, nodeStructure[attribute]);
        }
        return element;
    }

    this.hasChildren = function(nodeStructure)
    {
        return nodeStructure._children !== undefined;
    }

    this.hasSibling = function(nodeStructure)
    {
        return nodeStructure._sibling !== undefined;
    }

    this.hasText = function(nodeStructure)
    {
        return nodeStructure.text !== undefined;
    }
}
