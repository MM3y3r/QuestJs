export const defaultHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>JS Bin</title>
</head>
<body>
  <h1 class="test" id="demo">Willkommen. Wir sind Testdaten!</h1>
  <button onClick="red()">Be Red!</button>
  <button onClick="blue()">Be Blue!</button>
</body>
</html>`;

export const defaultCss = '.test{color:blue}';

export const defaultJs = `function red(){
    document.getElementById("demo").style.color = "red";
}
function blue(){
      document.getElementById("demo").style.color = "blue";
  }`;

export const defaultMarkup = `Sometimes you want numbered lists:

1. One
2. Two
3. Three

Sometimes you want bullet points:

* Start a line with a star
* Profit!

Alternatively,

- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
  - And this`;
