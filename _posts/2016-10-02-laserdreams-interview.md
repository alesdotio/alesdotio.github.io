---
layout: post
title: "From web to game developer, an interview for Cocos2d-x"
date: 2016-10-02
picture: "media/laserdreams-interview/laserdreams.jpg"
---


*This is an interview for my mobile game Laser Dreams. I originally did it for the Cocos2d-x blog, an open-source mobile game engine. You can find the original blog post [here](http://localhost).*

**TL;DR: I made a mobile game. It's free. You can get here:**

<a href="https://itunes.apple.com/us/app/laser-dreams/id1097313394" target="_blank" class="inline-image-link" style="width: 200px; margin-right: 10px;"><img class="image" src="{{ site.url }}media/laserdreams-interview/badge-apple.png" alt="Apple App Store" />
<a href="https://play.google.com/store/apps/details?id=com.redfragment.laserdreams" target="_blank" class="inline-image-link" style="width: 200px;"><img class="image" src="{{ site.url }}media/laserdreams-interview/badge-google.png" alt="Google Play Store" />


### Tell me a bit about yourself and team.

Hi! My name is Ales Kocjancic and together with Bostjan Markezic we are RedFragment, an indie game studio that just released our first mobile game: Laser Dreams. I suppose you could describe us as just two regular guys that always had a great passion for games and that love to build software that works. We are both from Slovenia, but I live in Denmark where I run a small (unrelated) startup. This means we worked together remotely, but since we know each other so well this was never a problem. We also both have regular day-jobs as software developers, which meant we came into the field with a lot of technical knowledge, but have limited time to work on the project.



### What is your game?

Our game is called Laser Dreams. It's a free puzzle game that requires you to place down blocks and make the laser beam of the right color hit the right target. There's many different types of items in the game, some simply bend the light, others split it in multiple parts; you can change and combine colors, teleport from one end to the other, or use switches to open gates. The levels were all created manually using a level editor we built and which is included in the game itself. The levels all have multiple solutions and are designed to be varied and fresh, but at the same time ramp up in difficulty as you progress. Laser Dreams is the first game we ever published and it's available for iOS or Android phones and tablets.

<img class="image" src="{{ site.url }}media/laserdreams-interview/screenshots.jpg" alt="Laser Dreams screenshots" />



### Tell us where you came up with the idea for this game. What were your inspirations?

I always wanted to create a game and made a few attempts. The closest I got to something playable was a multiplayer top down shooting game. After working on it for 2 weeks it was obvious that the idea was way too ambitious and I would never be able to finish it. We then sat down, and talked about what the simplest game we could make is, that would still be fun. My top down shooting game had a piece of code that would make your projectile bounce off the walls, so we decided that we should base the game around this mechanic (you can still see an early prototype in action here [http://jsfiddle.net/smf1b0k8/](http://jsfiddle.net/smf1b0k8/)). Since we did not have a talented artist to help us out, we could not afford to have complicated sprites, it had to be abstract. And that's how we got to a mobile puzzle game.

There's a very old DOS game called Laser Light that we used to play as kids, and there's a couple of similar games on the App store already, so I guess the idea was a combination of those, a remix. Mainly we wanted to create a simple, small game, that we could finish and ship without taking too long. After all, this was just a hobby project and we could only work on it during our spare time or in the weekends. As it's common with most software projects, it turned out to be much more work than expected. Once we had the basic gameplay mechanics done, we started playing around with more items, which can do all kinds of crazy things. This added more and more complexity, more and more features.

As for the art, inspiration came from my obsession at the time with synthwave and the whole 80s retro-future aesthetic. Plenty of vivid, neon colors and glow, over the top effects and most importantly electronic music. I guess I was listening to too much [Kavinsky](https://www.youtube.com/watch?v=MV_3Dpw-BRY) and [Perturbator](https://www.youtube.com/watch?v=oTN6cGmH2yM) :D



### What is special about your game?

At the beginning we were building levels by writing JSON, manually. This got tedious very fast, as it was hard to see what the level will look like in code, so we built a level editor. It turned out that building levels was quite fun so we polished the editor, and made it a feature of the game. We even got a couple of people to help us build the main levels, and regular players can send their levels to us for review. Since we wanted to automate this process, we also build a backend server that saves all the levels players make so we can check them and push them to the app without releasing a new version. This backend then slowly progressed to being our analytics as well. We are able to track daily player counts, retention metrics, which levels people play, how long they take to solve each level and also exactly how they solved it. Very often we find out that a player finished a level, in a way that is better than the one we designed. We can see all of that on our backend, review it and ship it to the app. It's absolutely overkill to do this yourself, and I would not recommend it to anyone, but it was fun and we like to play around with stuff like that. In a sense, the backend is almost a bigger project than the game itself :D.

<img class="image" src="{{ site.url }}media/laserdreams-interview/backend.jpg" alt="analytics backend" />



### How did you start, what version of cocos2d-x did you use and why did you decide to use it instead of Unity, Unreal Engine or SDL?

As I mentioned, we are both web developers so using JavaScript was the obvious and easiest choice. I played around with Phaser, an HTML5 game framework and made a few prototypes, so at the beginning we stuck with that. It worked well for a while, we had a great build pipeline using gulp and browserify to manage dependencies and it was quick and easy to test the game in a browser. Unfortunately though, the performance was poor. Because it's based on HTML5 it uses canvas to render the graphics, which is badly supported on some mobile devices. We tried to make it work with both Apache Cordova and CocoonJS with it's canvas+ engine, but they always fell short and they were just another patch on top of the real issue.

As we started to look for alternatives it was quickly obvious, that native OpenGL is the way to go. Unity is a popular engine, but we felt that it was too big and bloated for our simple game. Similarly, we only ever seen Unreal used by big budget companies that make 3D games and their non-free licensing was an issue. Finally, we came upon Cocos2d-x, this cross-platform framework that worked perfectly on native and on top of that was open source. We were hooked. We started with version 3.8.1 and thanks to the frequent and smooth updates shipped with 3.11.1.



### What features did the engine offer you that made development easy? What do you wish the engine did better?

I would say the main selling point was performance. The fact that it uses OpenGL makes it automatically win over any other HTML5 framework. Another big factor was the active community and the fact that it's open source. We contribute and work on open-source projects ourselves, and we like to be able to look under the hood whenever there's something wrong. The included tools for building the UI are also great.

On the negative side, a lot of people seem to have problems with font rendering and so did we. It's important to spend some time to select the right fonts and to make sure they render correctly on all platforms. We noticed the most problems on the web version, but since we built the game for mobile we did not invest much time fixing that. We hope to see updates addressing these issues and maybe add support for ES6 classes.



### What tools did you use besides the engine?

We used gulp and browserify to manage our JS dependencies and build the final js file. The IDEs we used are Visual Studio and PyCharm (an unusual choice for JS, but it's because I already had a license). Xcode and Android studio were only used for building the native apps. Photoshop and Sketch for the graphics and Audacity for sound and music.



### Did you create the art and music yourself and what tools did you use?

Yes, I created the art myself. I'm no artist, so we went for an abstract style that is not to hard to create. Besides Photoshop, I mainly used Sketch. Sketch is a Mac-only web design app, but it actually worked really well for game UI.

We bought the sounds and music for a few dollars on audiojungle.net and used the free Audacity to tweak it. The music turned out to be great and fit the style perfectly.

<img class="image" src="{{ site.url }}media/laserdreams-interview/sketch.jpg" alt="Sketch" />



### What 3rd party libraries did you need to use?

We have a Facebook integration that allows you to save your progress, and we use three ad networks which we cycle between randomly: Chartboost, Applovin and Vungle. The communication with our analytics backend is simply a JSON API.



### Do you use SDKBOX? If so, what plugins are you currently using?

Unfortunately we did not know much about it at the time so we built everything ourselves.



### How do you plan to market the game?

This is a huge topic, and people always struggle with this. I can tell you that we tried many things and are still trying. Don't expect your game to be successful on it's own and if you don't have a budget for ads it's gonna be very hard to compete with all the other games that are available on the store. Review sites are mostly useless and are just there to try and sell you marketing services. Getting listed or even featured on the store should be the main goal, but there is no exact recipe for this. You need a lot of downloads and great genuine reviews. We have a very limited budget, and were able to get the cost per install down to about $0.05-$0.20 through Adwords. Multiply that by 10k, the number of users we would like to se per day, and it's already way out of our budget. We will try to implement some new features to promote more social engagement soon, se we'll see how that goes.



### Will you continue to make games in the future?

Absolutely! It's great fun and even if the game doesn't do well at least we can say we tried. It's more about the journey, not the destination ;).

For the next game we already have a few ideas. This time, we want to make an action game and use C++ instead. The reason for going with C++ is mostly curiosity, but we have a hunch that performance will also be much better. It would be awesome to use Cocos Creator for this, but we are still waiting for the C++ support.



### Lastly, any advice for those also making games on how to get to a release point?

If you are new to game development, I would suggest you start with a small project. No, really small. Think of what's the smallest mechanic that could be considered a game. Build a rough prototype, spend only a little time on it, and see if it's fun to play. If it's not, if the gameplay doesn't work, throw it away. Since you spent so little time on it you wont feel bad about it, and you can move on, having a better feel for what can and can't work. Very often I see games that were just plain bad ideas from the start and it feels like the developers stuck with it and tried to make it work at all costs. Don't get me wrong, sometimes that works, but if you want to ship your first game, do something simple, something quick. Go ahead, make a flappy bird clone, just please don't publish it. :D



#### Links

iOS: [https://itunes.apple.com/us/app/laser-dreams/id1097313394](https://itunes.apple.com/us/app/laser-dreams/id1097313394)
Android: [https://play.google.com/store/apps/details?id=com.redfragment.laserdreams](https://play.google.com/store/apps/details?id=com.redfragment.laserdreams)
Website: [http://laserdreams.redfragment.com/](http://laserdreams.redfragment.com/)
Facebook: [https://www.facebook.com/laserdreams](https://www.facebook.com/laserdreams)
Cocos2d: [http://www.cocos2d-x.org/games/3780](http://www.cocos2d-x.org/games/3780)
