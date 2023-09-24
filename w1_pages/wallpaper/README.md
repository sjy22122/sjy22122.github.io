
# Part 7: Final Version
 

Part 7: Final Version

The final version is a black and white wallpaper, when background turn in to black, the audience can see the tentacles pattern. When background turn into white, it will only shows clean small curve shape. The eye in the middle are moving in a preset path. Each of the tentacles has random height of the wave which can be changed by time. The size of the pattern is random as well. I tried to add rotation to it but I think the output will look a little messy.

I think black and white are good for visual effect, it looks like switch between two different-style world. I like it how present two different feelings to the audience. 

I was trying to make the tentcales move more vividly by adding the length of the tentacles so it looks like it is elongating or making the highest point transform to the lowest and the lowest to the highest so that the tentacles can have an animated wave shape. However both of these ideas did not work quite well. Especially the wave on the tentacles are tricky. I used random at first. I want the highest point move from 5 to 1 and the lowest point move from 1 to 5. Then I used noise function. It works better than the random since each point has a different value for transform.

Sometimes I don't want to use cur_frac all the way. I separated max_frame in different sections depends on the need (this may not be the correct way to do it though). If I have more time I really want to get the vivid movement of tentacles working. Now the movement works but it is not very obvious.


Part 6: High Resolution and Viewport
 
Part 5: Random Variation

//update 
audience can see different pattern depends on the background colour.

//
add the animation of colour

//
I used noise function so that each of my pattern has different scale animation.



Part 4: Advanced Animation

add motion blur to my animation 



Part 3: Animation Loop

//update
get the single eye animation working

// animation
I want to make the eyes move from point 1 to point 4. But after I put four anchors in code, instead only show one ellipse, it shows 4 different ellipses.  



Part 2: Drawing at Multiple Scales

//4 random
adding random rotation, colour and scale to my pattern.

//3 grid
At first my pattern was draw on the original canvas. The cell it in was about 550 x 500. When I put it in the grid code from class, the scale of patterns are wrong. I tried scale fuction, even with "push" and "pop" it didn't work well. Then I tried to use "map"(show as "drawOctopus" function in my code). I didn't finish to replace all my data by "map", because I found that could be very tricky. I decide to tried scale and translate. In "test" function, I only pick up the "main body" part of my pattern. Then I replace all the x and y in 0, call this function in draw() and translate(x1,y1) & scale(0.5). It works this time.

//2 update
updated a final sketch of my pattern. I am still thinking should I add the small ellipses on the curve. But I will try to put my pattern in grid first.

//1
I am trying to draw the octopus by using ellipse, arc and curve fuctions. I think I can either draw few different types of octopus and arrange them as a pattern, or I can just draw one octopus and put it in a function then scale it into different size. Now I am going to draw the tentacles.



Part 1: Iterative Pattern Sketch

Inspired by: Spamghetto Todo 2009 & The geometrical work of Manolo Gamboa Naon

Idea 1: organic, nature, bamboo
	this idea is about nature and organic things. I think I can use bamboo leaf as an element of my pattern. there are many wallpapers of bamboo already, but I think that will be beautiful if the bamboo is draw in hand-drawing style. Animation can be fireflies, leaves, or birds.

Idea 2: ocean, curve, jellyfish, octopus
	my second idea is about the deep sea. I searched images of jellyfish and octopus. I think octopus has perfect shape, with beautiful and dynamic curves. Also the dreamy colour of jellyfish looks good. Personally I think these two elements have different feeling to the audience and they can be developed as two completely different styles.

Idea 3: Japanese umbrella
	I found the Japanese (traditional) umbrella have tons of patterns on it. Most of them are about flowers. Maybe it is because Japanese use umbrella in thire dancing performance, many patterns of the umbrella are based on whirlpool shape. When people rotating the umbrella, it looks like an actual whirlpool spinning.

Sketch:
	I used octopus, eyes and jellyfish in my sketch. I replaced the whirlpool shape of Japanses umbrella with the tentacle of octopus. Like the neurons network, the single pattern in my sketch can be connected with the tentacle of jellyfish.
