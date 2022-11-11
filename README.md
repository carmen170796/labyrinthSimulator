# Labyrinth Simulator 

## Description 
Website displays a board  where you can choose  start, target and built walls. Once you are ready  press the button "Find path", and it will displasy the shortest path possible from start to end using Dijkstra Algorithm. If it is not possible to make it to target, it will alert you. 

***This application is built with React.***


## Challenges
One of the first challenges encountered was the logic for connecting each box from the board to each other. If you are on a corner you can only move in 2 directions but if you are in the middle of the board, you can move in 4 directions. In this case, I decided to implement an array of columns  and each column would have a certain amount of boxes. In the way you can access each box with two indexes , the first one refering to the column and the second the row

Another issue was to the responsiveness . At the beginning i was using a fixed number for columns and rows, but that number didn't necessarily look good when it was displayed on a smaller screen. So now before the board gets displayed, it assigns the number of columns according to the window inner width. 

## Future improvements
Still, responsiveness could be improved. In the future I would like to implement an event listener for window resize, so the board always looks good without having to reload the page. Also the reset button can be improved to stop altogether the running of animations. Currently we have to wait for the path to displayed, before successfully resetting the game  


## Steps for installing and running the project 
1. Clone this repo
2. Run npm install
3. Run npm start
