# Squint

**A Library for automatically scrolling to an element in the DOM**

## Description

This library provides the function `scrollIntoView` which scrolls any element
into view. It is pure javascript and so you can use this easily within any
framework.

## Installation

```
npm install --save squintjs
```

or

```
yarn add squintjs
```

## Usage

#### scrollIntoView

To access you can put this in your javascript:

```
import scrollIntoView from 'squintjs';
```

##### Arguments

- element: (_Element_) The element you want to bring into view
- container: (_Element_) The element that contains the element and contains the
  scrollbar
- options: (_Object_) Options
  - Available options:
    - duration: (integer) time in ms for animation to happen. Defaults to _500_.
    - offset: (_string || integer_) number of pixels to pad the container so that
    text does not go to the edge of the container. You can also send in a
    string ending in `%` (example `'10%'`) which will add a percentage of the
    height of the container.

Example:

```
const element = document.getElementById('elementToFind');
const container = document.getElementById('elementScrollingContainer');

scrollIntoView(element, container, { duration: 1000, offset: '10%' });
```
