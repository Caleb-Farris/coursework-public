# @author: Caleb Farris (w/ base code from Daisy Wong)

import turtle              # turtle graphics library for drawing
from random import randint # Math library randint function 

degreeOfTurn = 18   # degree for the turtle to turn after drawing a shape. This determines how dense the final line art is
numOfShapes = 360/degreeOfTurn
speedOfDrawing = 40  # increase to drawing faster
numOfSides = randint(1, 20)      # number of sides in the polygon
sideLength = randint(10, 100)    # change to use a random number between 10 and 100

#-----------------------------------------------------------------------------
#                                draw_square
#                                
#     Method to draw a special case of polygon - a square     
#     @params - a_turtle:  a turtle object for the drawing
#     @return - void       
#----------------------------------------------------------------------------- 
def draw_square(a_turtle):
  for i in range(0, 4):
    a_turtle.forward(100)         # draw a line 100 units long
    a_turtle.right(360/4)         # => turn right 90 degrees for a square which has 4 sides 
        
#-----------------------------------------------------------------------------
#                               draw_polygon
#                                
#     Method to draw a polygon of variable side numbers and length  
#     @params - a_turtle:  a turtle object for the drawing
#             - sides:     number of sides in the polygon
#             - length:    length of each side of the polygon
#     @return - void          
#-----------------------------------------------------------------------------     
def draw_polygon(a_turtle, sides, length):
  for i in range(0, sides):
    a_turtle.forward(length)
    a_turtle.right(360.0/sides)

#-----------------------------------------------------------------------------
#                                draw_art
#                                
#     Method to display the drawing of the line art to the screen  
#     @return - void            
#----------------------------------------------------------------------------- 
def draw_art():   
  window = turtle.Screen()
  window.bgcolor("black")
    
  brad = turtle.Turtle()
  brad.shape("turtle")
  brad.color("yellow")         # set pen color
  brad.speed(speedOfDrawing)
  
  # Add a loop to draw polygons for "numOfShapes" times, and turn the turtle right 
  # by "degreeOfTurn" between each time to create a pretty line art
  for i in range(0, numOfShapes):
    draw_polygon(brad, numOfSides, sideLength)
    brad.right(degreeOfTurn)

  window.exitonclick()


# execute the line art drawing function
draw_art() 
