/**
 * @pattern Dependency Injection
 */
function ProductHtml(htmlElementCreator)
{
    this.htmlElementCreator = htmlElementCreator;

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
            this.htmlElementCreator.append({
                id: "productsMasculino",
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
            });
        }
    }
}
