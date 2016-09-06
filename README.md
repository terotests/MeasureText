# MeasureText

The project aims to find out the optimal way of measuring the bounding box for a text inserted into DOM.

Currently the algorithms are:

- MeasureText(fontFamily, fontSize, availableWidth, text)
- MeasureTextCanvas(fontFamily, fontSize, availableWidth, text)
- MeasureTextCached(fontFamily, fontSize, availableWidth, text)

*MeasureTextCached* seems to be fastest, it will always try to aggressively cache the result, if not it will fall back to MeasureTextCanvas.

*MeasureTextCanvas* is using Canvas if text appears to be obviously short. It will create a new Canvas context for each font family + size. If text seems to be too long, it will fall back to MeasureText.

*MeasureText* is using cached DOM elements to measure the text size. It will create a new DOM element for each font family + size and place the text in there.

One of the parameters, which makes this a bit more difficul is that if the availableWidth > rendered text width, then only the rendered text width will be returned. However, if the text wraps to multiple lines

## Test results

```
sameTextOneLinedom: 42.703ms
sameTextMultiLinedom: 7.983ms
sameTextMultiLineVariableLengthdom: 1007.613ms

sameTextOneLinecanvas: 12.834ms
sameTextMultiLinecanvas: 10.966ms
sameTextMultiLineVariableLengthcanvas: 1102.227ms

sameTextOneLinecached: 6.800ms
sameTextMultiLinecached: 22.373ms
sameTextMultiLineVariableLengthcached: 105.535ms
```
