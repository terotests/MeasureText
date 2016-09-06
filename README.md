# MeasureText

The project aims to find out the optimal way of measuring the bounding box for a text inserted into DOM.

Currently the algorithms are:

- MeasureText(fontFamily, fontSize, availableWidth, text)
- MeasureTextCanvas(fontFamily, fontSize, availableWidth, text)
- MeasureTextCached(fontFamily, fontSize, availableWidth, text)

*MeasureTextCached* seems to be fastest, it will always try to aggressively cache the result, if not it will fall back to MeasureTextCanvas.

*MeasureTextCanvas* is using Canvas if text appears to be obviously short. It will create a new Canvas context for each font family + size. If text seems to be too long, it will fall back to MeasureText.

*MeasureText* is using cached DOM elements to measure the text size. It will create a new DOM element for each font family + size and place the text in there.

One of the parameters, which makes this a bit more difficul is that if the availableWidth > rendered text width, then only the rendered text width will be returned. However, if the text wraps to multiple lines then width == availableWidth and the interesting result is the height of the bounding box.

## Test results

[http://codepen.io/teroktolonen/full/PGwBzd/](Try in Codepen)

### Chrome Version 52
```
dom sameTextOneLine 1357ms
dom sameTextMultiLine 8ms
dom sameTextMultiLineVariableLength 1069ms
dom sameTextMultiLineVariableLengthVariableWidth 1532ms
canvas sameTextOneLine 12ms
canvas sameTextMultiLine 10ms
canvas sameTextMultiLineVariableLength 966ms
canvas sameTextMultiLineVariableLengthVariableWidth 1566ms
cached sameTextOneLine 4ms
cached sameTextMultiLine 16ms
cached sameTextMultiLineVariableLength 158ms
cached sameTextMultiLineVariableLengthVariableWidth 125ms
```
