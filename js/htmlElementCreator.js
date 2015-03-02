function HtmlElementCreator() {
    this.self = this;

    this.append = function(properties)
    {
        console.log(properties);

        var element = this.createNodeElement(properties);
        var selector = this.selectorStrategy(properties);
        selector.appendChild(element);

        var childrenStructure = properties.structure._child;
        if (this.hasChildren(childrenStructure)) {
            this.createChildNodeElement(
                element,
                childrenStructure
            );
        }

        // var element         = document.createElement(properties.structure.element);
        // element             = this.declareHtmlAttributes(element, properties.structure);
        // var body = document.getElementsByTagName("body");
        // document[properties.tag].appendChild(element);

        // var anchorElement   = document.createElement(properties.structure._children.element);
        // anchorElement       = this.declareHtmlAttributes(anchorElement, properties.structure._children);
        // element.appendChild(anchorElement);

        // var imageElement    = document.createElement(properties.structure._children._children.element);
        // imageElement        = this.declareHtmlAttributes(imageElement, properties.structure._children._children);
        // anchorElement.appendChild(imageElement);
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
        console.log(nodeStructure);
        // var element = document.createElement(nodeStructure.element);
        // element     = this.getHtmlNodeAttributes(nodeStructure);
        // parentNode.appendChild(element);
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
}
