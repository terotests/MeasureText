# MeasureText

The project aims to find out the optimal way of measuring the bounding box for a text inserted into DOM.

Currently the algorithms are:

- MeasureText(<font>, <size>, <availableWidth>, <txt>)
- MeasureTextCanvas(<font>, <size>, <availableWidth>, <txt>)
- MeasureTextCached(<font>, <size>, <availableWidth>, <txt>)

*MeasureTextCached* seems to be fastest, it will always try to aggressively cache the result, if not it will fall back to MeasureTextCanvas.

*MeasureTextCanvas* is using Canvas if text appears to be obviously short. It will create a new Canvas context for each font family + size. If text seems to be too long, it will fall back to MeasureText.

*MeasureText* is using cached DOM elements to measure the text size. It will create a new DOM element for each font family + size and place the text in there.

One of the parameters, which makes this a bit more difficul is that if the availableWidth > rendered text width, then only the rendered text width will be returned. However, if the text wraps to multiple lines

## Test results

```
sameTextOneLinedom: 76.241ms
sameTextMultiLinedom: 16.480ms
sameTextMultiLineVariableLengthdom: 1931.628ms

sameTextOneLinecanvas: 18.026ms
sameTextMultiLinecanvas: 13.831ms
sameTextMultiLineVariableLengthcanvas: 2187.365ms

sameTextOneLinecached: 25.811ms
sameTextMultiLinecached: 18.675ms
sameTextMultiLineVariableLengthcached: 116.034ms
```
