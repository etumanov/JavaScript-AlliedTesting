var url = "official_exchange_rates.xml";

var xhr = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
xhr.onreadystatechange = parseJSON();
xhr.open("GET", url, true);
xhr.send(null);

function parseJSON() {

    if (xhr.readyState == 4) {
        var json = XML2json(xhr.responseXML.documentElement);
        var obj1 = JSON.stringify(json);
        var obj = JSON.parse(obj1);
		var table="<tr><th>Code</th><th>Abbr</th><th>Rate</th><th>Currency</th><th>Rates</th></tr>";
        for (i = 0; i <obj.Valute.length; i++) {
            table += "<tr><td>" +
                obj.Valute[i].NumCode +
                "</td><td>"+
                obj.Valute[i].CharCode +
                "</td><td>"+
                obj.Valute[i].Nominal +
                "</td><td>"+
                obj.Valute[i].Name +
                "</td><td>"+
                obj.Valute[i].Value +
                "</td></tr>";
        }
        document.getElementById("tableJSON").innerHTML ="<span>"+obj.name+"</span></br><span>Data:" + obj.Date + "</span>";
        document.getElementById("parsingJSON").innerHTML =table;
        xhr = null;

    }

}

function XML2json(node) {

	var	data = {};

	function Add(name, value) {
		if (data[name]) {
			if (data[name].constructor != Array) {
				data[name] = [data[name]];
			}
			data[name][data[name].length] = value;
		}
		else {
			data[name] = value;
		}
	}
	
	var c, cn;
	for (c = 0; cn = node.attributes[c]; c++) {
		Add(cn.name, cn.value);
	}
	
	for (c = 0; cn = node.childNodes[c]; c++) {
		if (cn.nodeType == 1) {
			if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
				Add(cn.nodeName, cn.firstChild.nodeValue);
			}
			else {
				Add(cn.nodeName, XML2json(cn));
			}
		}
	}

	return data;

}
