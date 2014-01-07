---
layout: post
title: "Lessons learned by using HTML5 Canvas"
date: 2013-11-04
---

Recently I had the opportunity to work on a project that makes heavy use of Canvas for drawing and manipulating huge amounts of objects. Being my first time using the technology, and not knowing much about it, I had to overcome issues that in retrospect seem pretty obvious. Here is a list of things I learned or wish I knew before starting.

#### 1. Use a high level framework
Canvas has a really low-level API, and unless you really have to do something crazy, use a framework. [There's plenty to choose from](https://www.google.com/#q=canvas+framework) and the choice really depends on your use case. I opted into using the awesome [Fabric.js](http://fabricjs.com/), because of it's manipulation abilities.

#### 2. Divide and conquer
If possible, divide your app in smaller independent parts. Multiple transparent canvases on top of each other is the way to go, when you need to improve performance.

#### 3. Know the limits
Experiment with your framework and use case, **in advance**. There are limitations for both canvas size and number of objects. In my experience, having more than 10,000 objects on canvas was not a viable option, since we also needed to be able to manipulate and animate them. Knowing that, we decided on a different user workflow to work around the limitation.

#### 4. When possible do it with HTML
Drawing your whole interface on canvas is not such a good idea. You are better off writing your static UI elements in good ol' HTML/CSS. Interaction between the two is easy.

#### 5. Animation performance
Redrawing canvas in a loop or on 'mousemove'? Use [window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame).

#### 6. Do bulk operations, redraw rarely
This ones are pretty obvious: bulk-adding objects is faster; postpone redrawing the canvas for as long as possible.

#### 7. Cache all the things!
Another obvious one, but check how your framework's caching process works. Despite being an awesome all-around framework Fabric.js unfortunately [does not have any caching support yet](https://github.com/kangax/fabric.js/issues/318).

#### 8. Know your audience
This one could apply to web development in general. Keep in mind that canvas performance might be terrible on old and mobile browsers. If you need to support those, good luck!


<p>&nbsp;</p>


In conclusion, yes, canvas has some shortcomings and caveats, but at the end of the day, what web technology doesn't? When you know how to, it's a fantastic tool that can be used to build [some incredible stuff](http://www.chromeexperiments.com/).
