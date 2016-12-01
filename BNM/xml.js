function loadXMLDoc() {
    var xmlpath = "official_exchange_rates.xml";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", xmlpath, false);
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send("");
    xmlDoc = xmlhttp.responseXML;
    readXML();
}
function readXML() {
    var i;
    var table="<tr><th>Code</th><th>Abbr</th><th>Rate</th><th>Currency</th><th>Rates</th></tr>";
    var x = xmlDoc.getElementsByTagName("Valute");
    var valcurs = xmlDoc.getElementsByTagName("ValCurs")[0];
     for (i = 0; i <x.length; i++) {
        table += "<tr><td>" +
            x[i].getElementsByTagName("NumCode")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("CharCode")[0].childNodes[0].nodeValue +
            "</td><td>"+
             x[i].getElementsByTagName("Nominal")[0].childNodes[0].nodeValue +
             "</td><td>"+
             x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue +
            "</td><td>"+
             x[i].getElementsByTagName("Value")[0].childNodes[0].nodeValue +
             "</td></tr>";
    }
    document.getElementById("tableXML").innerHTML ="<span>"+valcurs.getAttribute("name")+"</span></br><span>Data:" + valcurs.getAttribute("Date") + "</span>";
    document.getElementById("parsingXML").innerHTML = table;
}


