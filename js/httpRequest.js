function HttpRequest()
{
    this.load = function(url, callback)
    {
        var xhr;

        if (typeof XMLHttpRequest === 'function') {
            xhr = new XMLHttpRequest();

        } else {
            var versions = ["MSXML2.XmlHttp.5.0",
                            "MSXML2.XmlHttp.4.0",
                            "MSXML2.XmlHttp.3.0",
                            "MSXML2.XmlHttp.2.0",
                            "Microsoft.XmlHttp"];

             for(var i = 0; i < versions.length; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e) {
                    console.log(e.getMessage());
                }
             }
        }

        xhr.onreadystatechange = function ensureReadiness()
        {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status !== 200) {
                return;
            }
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        }

        xhr.open('GET', url, true);
        xhr.send('');
    }
}
