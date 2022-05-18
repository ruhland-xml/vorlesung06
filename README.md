# vorlesung06 Recursives Lesen einer JSON Struktur

Ziel ist das Extrahieren aller Strings aus einer JSON Struktur

Als Test wird der JSON aus der Datei test.json genommen

```json
{
    "name": "Klaus Ruhland",
    "description": "Mr. Ruhland is // a #person of the 'hochschule Zittau/Görlitz' and his email address is kruhland@hszg.de",
    "age": 59,
    "male": true,
    "favcolors": ["red", "green", "blue"],
    "address": {
        "city": "Görlitz",
        "street": "Brückenstraße 1",
        "citycode": "02826",
        "country": "Germany"
    },
    "telephonenumbers": [
        { "tel": "01777848970", "display": "Mobile Klaus Ruhland"},
        { "tel": "35813744302", "display": "Büro Hszg Klaus Ruhland"}
    ]
}
```

Die Hauptfunktion des JavaScript Programms extrahiert alle strings, ersetzt die Sonderzeichen durch blanks und führt einen split aus.

Wichtig dabei ist, dass die Funktion rekursiv ist

```javascript
function extractStringsFromJson(obj, keywords) {
    for(var key in obj) {
        if(obj[key] instanceof Object) {
            extractStringsFromJson(obj[key],keywords);
        } else {
            let value = obj[key];
            if ( typeof value ===  "string" ){
                newString = value.replace(/[`~!@#$%^&*()_|+\-=?;:,.'"<>\{\}\[\]\\\/]/gi, ' ')
                let stringArray = newString.split(/(\s+)/).filter( e => e.trim().length > 0);
                for ( let i=0; i< stringArray.length; i++ ){
                    let singleString = stringArray[i].toLowerCase();
                    if ( singleString.length>0 && keywords.includes(singleString) === false )
                        keywords.push(singleString);
                }
            }
        };
    }
};
```

Das Resultat steht dann in den keywords
```
klaus
ruhland
mr
is
a
person
of
the
hochschule
zittau
görlitz
and
his
email
address
kruhland
hszg
de
red
green
blue
brückenstraße
1
02826
germany
01777848970
mobile
35813744302
büro
```
