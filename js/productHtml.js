/**
 * @pattern Dependency Injection
 */
function ProductHtml(htmlElementCreator)
{
    this.htmlElementCreator = htmlElementCreator;
    this.containerId;

    /**
     * Cria o html base dos produtos.
     * @param Array: Object listProducts
     * @return void
     */
    this.createDefault = function(listProducts, imageSize)
    {
        var imageSize = imageSize !== undefined
                ? imageSize
                : 210;

        for (var product of listProducts) {
            var productsObject = {
                        structure: {
                            element: "div",
                            class: "img",
                            _children: {
                                element: "a",
                                target: "_blank",
                                href: product.href,
                                _children: {
                                    element: "img",
                                    src: product.imageSource,
                                    alt: product.alt,
                                    width: imageSize,
                                    height: imageSize
                                },
                                _sibling: {
                                    element: "div",
                                    class: "desc",
                                    text: product.description
                                }
                            }
                        }
                    };
            productsObject.id = this.getContainerId();
            this.htmlElementCreator.append(productsObject);
        }
    }

    this.setContainerId = function(containerId)
    {
        this.containerId = containerId;
    }

    this.getContainerId = function()
    {
        return this.containerId;
    }
}
